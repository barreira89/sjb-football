var util = {
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
    }
}
module.exports = util;
