const line = require('@line/bot-sdk');
const express = require('express');

var port = process.env.PORT || 8080;

const config = {
    channelAccessToken: 'NHqpBWUS4cbo4soab0QkZ7h3PkMDAflgbvqQJ5Z0e38E6b3ceN2HfkmcgUWA19NdqhMrLBCJQ1jF/gu5Gzl35QLzt/fw8ynKLPnjUA0tVfLu1V8G3xgT+qkEJpemZZXqIuC0Jc/V//gF6BZ0JDcCLAdB04t89/1O/w1cDnyilFU=',
    channelSecret: '944bc05f706db53ac55535b1e7dffb9f'
};

const app =express();

app.post('/webhook',line.middleware(config),(req,res) => {
    alert('someone send a message');
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

const client = new line.Client(config);

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'hello world'
    });
}
  
app.listen(port,()=>{
    console.log("listening");
});
