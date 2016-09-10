import * as vscode from 'vscode';

let jp = require('jsonpath');

export class JsonPathHelper {

    getMatchPositions(text: string, textJson: any, expression: string) {
        let paths;
        try {
            paths = jp.paths(textJson, expression);
        } catch (error) {
            throw 'Invalid expression';
        }

        if(!paths || paths.length === 0) {
            return [];
        }

        let positions = this.parsePaths(paths, text);
        return positions;
    }

    parsePaths(paths: any, textFormatted: string) {
        let brackets: Bracket[] = this.getBrackets(textFormatted);
        let pairs = this.getBracketsParis(brackets);
        let bucketTree = this.createBracketTree(pairs, 0);

        let positions: Position[] = [];
        for (let i = 0; i < paths.length; i++) {
            let path = paths[i];
            let expression = this.createExpressionFromPath(path);
            let result = jp.query(bucketTree, expression);
            positions.push(this.parseLastPathItem(result[0], path[path.length - 1], textFormatted));
        }

        return positions;
    }

    parseLastPathItem(resultExcludeLastPathItem: any, lastPathItem: any, textFormatted: string) {
        if (typeof lastPathItem === 'number') {
            if (resultExcludeLastPathItem &&
                resultExcludeLastPathItem.children &&
                resultExcludeLastPathItem.children.length > 0) {
                // ok
                let child = resultExcludeLastPathItem.children[lastPathItem];
                return { startPos: child.node.leftPos, endPos: child.node.rightPos + 1 };
            } else {
                // ok
                let leftPos = resultExcludeLastPathItem.node.leftPos + 1;
                let rightPos = resultExcludeLastPathItem.node.rightPos;
                let itemsInArray = textFormatted.slice(leftPos, rightPos).split(',');

                let startPos = leftPos;
                for (let i = 0; i < lastPathItem; i++) {
                    startPos += itemsInArray[i].length + 1;
                }
                let item = itemsInArray[lastPathItem];
                let itemLen = item.length;
                let itemAfterTrim = item.trim();
                let pos = item.indexOf(itemAfterTrim);
                startPos += pos;
                let endPos = startPos + itemAfterTrim.length;

                return { startPos: startPos, endPos: endPos };
            }
        }

        if (typeof lastPathItem === 'string') {
            if (resultExcludeLastPathItem &&
                resultExcludeLastPathItem.children &&
                resultExcludeLastPathItem.children.length > 0) {
                // has children and match
                // ok
                let children = resultExcludeLastPathItem.children;
                for (let i = 0; i < resultExcludeLastPathItem.children.length; i++) {
                    let child = resultExcludeLastPathItem.children[i];
                    if (child.node.key === lastPathItem) {
                        return { startPos: child.node.leftPos, endPos: child.node.rightPos + 1 };
                    }
                }

                let leftPos = resultExcludeLastPathItem.node.leftPos;
                let rightPos = resultExcludeLastPathItem.node.rightPos;
                let objStr = textFormatted.slice(leftPos, rightPos + 1);

                let indexs = [];
                let i = -1;
                while ((i = objStr.indexOf('"' + lastPathItem + '": ', i + 1)) >= 0) {
                    indexs.push(i);
                }

                indexs = indexs.filter(index => {
                    let leftCnt = 0;
                    let rightCnt = 0;
                    for (let k1 = index; k1 >= 0; k1--) {
                        let char = objStr.charAt(k1);
                        if (char === '{') leftCnt++;
                        if (char === '}') leftCnt--;
                    }
                    for (let k2 = index; k2 < objStr.length; k2++) {
                        let char = objStr.charAt(k2);
                        if (char === '{') rightCnt++;
                        if (char === '}') rightCnt--;
                    }
                    if (leftCnt === 1 && rightCnt === -1) {
                        return true;
                    }
                    return false;
                });

                if (indexs.length !== 1) {
                    throw 'error';
                }

                let value = JSON.parse(objStr)[lastPathItem];
                let startPos = indexs[0] + leftPos + (1 + lastPathItem.length + 1 + 2)
                let endPos;
                if (typeof value === 'number') {
                    let valueStr = '' + value;
                    endPos = startPos + valueStr.length;
                } else if (typeof value === 'string') {
                    endPos = startPos + value.length + 2;
                } else {
                    throw 'no match type';
                }
                return { startPos: startPos, endPos: endPos };

            } else {
                // ok
                let leftPos = resultExcludeLastPathItem.node.leftPos;
                let rightPos = resultExcludeLastPathItem.node.rightPos + 1;
                let subObjStr = textFormatted.slice(leftPos, rightPos);
                let subObjJSON = JSON.parse(subObjStr);
                let value = subObjJSON[lastPathItem];
                let startPos = leftPos + textFormatted.slice(leftPos + 1, rightPos).indexOf('"' + lastPathItem + '": ') + 1 + lastPathItem.length + 3 + 1;
                let endPos;

                if (typeof value === 'number') {
                    let valueStr = '' + value;
                    endPos = startPos + valueStr.length + 1;
                } else if (typeof value === 'string') {
                    endPos = startPos + value.length + 2;
                } else {
                    throw 'no match type';
                }
                return { startPos: startPos, endPos: endPos };

            }
        }
    }

    createExpressionFromPath(path: any): string {
        let expression: string = '$';
        for (let i = 1; i < path.length - 1; i++) {
            if (typeof path[i] === 'string') {
                expression = expression.concat(`.children[?(@.node.key=='${path[i]}')]`);
            } else if (typeof path[i] === 'number') {
                expression = expression.concat(`.children[${path[i]}]`);
            }
        }
        return expression;
    }

    getBrackets(obj: string): Bracket[] {
        if (!obj) {
            throw "obj undefine!";
        }

        let brackets: Bracket[] = [];
        for (let i = 0; i < obj.length; i++) {
            if (obj.charAt(i) === '{') {
                brackets.push(this.getBracket(obj, '{', i));
                continue;
            } else if (obj.charAt(i) === '}') {
                brackets.push(this.getBracket(obj, '}', i));
                continue;
            } else if (obj.charAt(i) === '[') {
                brackets.push(this.getBracket(obj, '[', i));
                continue;
            } else if (obj.charAt(i) === ']') {
                brackets.push(this.getBracket(obj, ']', i));
                continue;
            }
        }
        return brackets;
    }

    private getBracket(obj: string, char: string, index: number): Bracket {
        if (index === 0) {
            return { direction: Direction.LEFT, type: BracketType.CURLY, position: 0 };
        }

        let tmpIndex = index;

        if (char === '{') {
            if (obj.charAt(tmpIndex - 3) === '"') {
                let key = this.getKey(obj, tmpIndex - 3);
                return { key: key, direction: Direction.LEFT, type: BracketType.CURLY, position: index };
            }
            return { direction: Direction.LEFT, type: BracketType.CURLY, position: index };
        }

        if (char === '}') {
            return { direction: Direction.RIGHT, type: BracketType.CURLY, position: index };
        }

        if (char === '[') {
            if (obj.charAt(tmpIndex - 3) === '"') {
                let key = this.getKey(obj, tmpIndex - 3);
                return { key: key, direction: Direction.LEFT, type: BracketType.SQUARE, position: index };
            } else {
                throw "Not match!";
            }
        }

        if (char === ']') {
            return { direction: Direction.RIGHT, type: BracketType.SQUARE, position: index };
        }
    }

    getKey(obj: string, endPos: number): string {
        let key: string = '';
        let char;
        while ((char = obj.charAt(--endPos)) !== '"') {
            if (char !== '\\') {
                key = key.concat(char);
            }
        }
        return key.split("").reverse().join("");
    }

    getBracketsParis(brackets: Bracket[]): BracketPair[] {
        if (!brackets) {
            throw "empty brackets";
        }

        let curlyBracketsStack: Bracket[] = [];
        let squareBracketsStack: Bracket[] = [];
        let bracketPairs: BracketPair[] = [];
        for (let i = 0; i < brackets.length; i++) {
            let bracket = brackets[i];
            if (bracket.direction === Direction.LEFT) {
                // left bracket => push to stack
                if (bracket.type === BracketType.CURLY) {
                    curlyBracketsStack.push(bracket);
                } else {
                    squareBracketsStack.push(bracket);
                }
            } else {
                if (bracket.type === BracketType.CURLY) {
                    let leftCurlyBracket = curlyBracketsStack.pop();
                    let rightCurlyBracket = bracket;
                    bracketPairs.push({
                        key: leftCurlyBracket.key,
                        type: BracketType.CURLY,
                        leftPos: leftCurlyBracket.position,
                        rightPos: rightCurlyBracket.position
                    });
                } else {
                    let leftSquareBracket = squareBracketsStack.pop();
                    let rightSquareBracket = bracket;
                    bracketPairs.push({
                        key: leftSquareBracket.key,
                        type: BracketType.SQUARE,
                        leftPos: leftSquareBracket.position,
                        rightPos: rightSquareBracket.position
                    })
                }
            }
        }

        return bracketPairs.sort((pair1, pair2) => {
            return pair1.leftPos - pair2.leftPos
        });
    }

    createBracketTree(bracketPairs: BracketPair[], startIndex: number): BracketTree {
        bracketPairs[startIndex].isSelected = true;

        let leftPos = bracketPairs[startIndex].leftPos;
        let rightPos = bracketPairs[startIndex].rightPos;
        let bracketTree: BracketTree = { node: bracketPairs[startIndex], children: [] };
        for (let i = startIndex + 1; i < bracketPairs.length; i++) {
            if (bracketPairs[i].leftPos > leftPos && bracketPairs[i].rightPos < rightPos) {
                if (!bracketPairs[i].isSelected) {
                    bracketTree.children.push(this.createBracketTree(bracketPairs, i));
                }
            }
        }
        return bracketTree;
    }

}

export interface Position {
    startPos: number;
    endPos: number;
}

enum JsonValueType {
    OBJECT,
    ARRAY,
    STRING,
    NUMBER
}

export interface Bracket {
    key?: string;
    type: BracketType;
    direction: Direction;
    position: number;
}

interface BracketPair {
    key?: string;
    type: BracketType;
    leftPos: number;
    rightPos: number;
    isSelected?: boolean
}

interface BracketTree {
    node: BracketPair;
    children?: BracketTree[];
}

enum Direction {
    LEFT,
    RIGHT
}

enum BracketType {
    CURLY,
    SQUARE
}
