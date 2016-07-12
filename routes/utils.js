var util = {
  bodyToModel: function(fieldMap){
      return function(requestBody, modelFromDb){
        for(key in fieldMap){
          if(key in requestBody){
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
/*

function newMapper(fromDb, fromRequest, map){
	//req.body & document from db
	//map has the fields we care about
	for(key in map){
		//if the value is in the request, but not the db; add it
		if(key in fromRequest){
			//if the value is in both; set to the request value
			fromDb[key] = fromRequest[key];
		} else {
			//if the value is not in the request, but is in the db; remove it
			fromDb[key] = undefined;
		}
		//console.log(fromDb[key])
	}
	return fromDb;
}
*/
