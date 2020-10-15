
const https = require('https');
// wrap the get request in a handler 
exports.handler = async (event) => {
    
    const response = {
        statusCode: 200,
        body: ''
    };
    
    //  intitialize a promise for the get request
    const finalResponse = await new Promise( (resolve, reject) => {
        // includes a bearer token generated for our twitter API user
        const req = https.get(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${event.screenName}`, { headers: { 'Authorization': 'Bearer ????' }  }, (resp) => {
          let data = '';
        
          // construct response 
          resp.on('data', (chunk) => {
            data += chunk;
          });
        
          // construct and return response for client 
          resp.on('end', () => {
            response.body = data;
            resolve(response);
          });
        //error handeling 
        }).on("error", (err) => {
          response.statusCode = 500;
          resolve(response);
        });
    })
  
   return finalResponse;
   
};
