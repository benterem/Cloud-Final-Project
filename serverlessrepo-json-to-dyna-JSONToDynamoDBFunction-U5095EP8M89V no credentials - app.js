let response;
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'savedTweets';

 

exports.lambdaHandler = async (tweetDetails, context) => {
    let promises = [];
    // attempt at creating entry in DB
    try {
        const params = {
            TableName: TABLE_NAME,
            Item: tweetDetails,
        };
        
        promises.push(dynamoDb.put(params).promise()); //add insert tweet into DB action to promises collection 

        await Promise.all(promises); 
        // return success message to client
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'Tweet saved.',
            })
        }
    } catch (err) {
        console.log(err);
        throw err;
    }

    return response
};
