let jp = require('jsonpath');

export class JsonPathHelper {

    getMatchPositions(obj: any, expression: string): Position[] {
        let objJSON = JSON.parse(obj);
        let queryResults = jp.query(objJSON, expression);

        let positions: Position[] = [];
        for (let i = 0; i < queryResults.length; i++) {
            let queryResult = queryResults[i];
            let queryResultStr = JSON.stringify(queryResult);
            let startPos = obj.indexOf(queryResultStr);

            if (startPos == -1) {
                throw "match error!";
            }

            let endPos = startPos + queryResultStr.length;
            positions.push({ startPos: startPos, endPos: endPos });
        }
        return positions;
    }

}

export interface Position {
    startPos: number;
    endPos: number;
}