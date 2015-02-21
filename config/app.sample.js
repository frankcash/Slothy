/**
* @summary sets up config variable including oauth vars for fitbit API https://wiki.fitbit.com/display/API/OAuth+Authentication+in+the+Fitbit+API
* @param DB URI for mongo
* @param CONSUMER_KEY the consumer key for the fitbit API
* @param CONSUMER_SECRET the consumer secret for the fitbit API
*/
var config = {}
config.db = "";
config.CONSUMER_KEY = "";
config.CONSUMER_SECRET = "";
module.exports = config;
