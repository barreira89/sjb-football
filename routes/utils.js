var fields = {
  games: ['home', 'visitor', 'winner', 'homescore', 'visitscore', 'weekNumber', 'season', 'date', 'time'],
  leagues: []
}
var util = {
    mapper: function(modelName) {
      var fieldList = fields[modelName] || [];
      var fieldMap = fieldMapFromList(fieldList);
      return bodyToModel(fieldMap);
    },
    bodyToModel: function(fieldMap) {
        return function(requestBody, modelFromDb) {
            if(!modelFromDb) return requestBody;
            for (key in fieldMap) {
                if (key in requestBody) {
                    modelFromDb[key] = requestBody[key];
                } else {
                    modelFromDb[key] = undefined;
                }
            }
            return modelFromDb;
        }
    },
    bodyToModelList: (fieldList) => {
      var fieldMap = fieldMapFromList(fieldList);
      return bodyToModel(fieldMap);
    }
}


function fieldMapFromList (list) {
  return list.reduce((prev, current) =>{
    if(!prev[current]) prev[current] = 1
    return prev;
  },{})
}

function bodyToModel(fieldMap) {
    return function (requestBody, modelFromDb) {
        if (!modelFromDb) return requestBody;
        for (key in fieldMap) {
            if (key in requestBody) {
                modelFromDb[key] = requestBody[key];
            } else {
                modelFromDb[key] = undefined;
            }
        }
        return modelFromDb;
    }
}

module.exports = util;
