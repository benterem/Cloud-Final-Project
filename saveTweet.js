let response;
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'savedTweets';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
    let promises = [];

    try {
        const params = {
            TableName: TABLE_NAME,
            Item: event,
        };

        promises.push(dynamoDb.put(params).promise());

        await Promise.all(promises);
        
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
