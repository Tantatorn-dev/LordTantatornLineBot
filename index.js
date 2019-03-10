const line = require('@line/bot-sdk');
const express = require('express');

var port = process.env.PORT || 8080;

const config = {
    channelAccessToken: 'Rv1c5HnmDyOXCwZvxAI6G3EPr9uLehyDcExv6MF6o6mAAjkgbVimcZmQ0f7lQD1yqhMrLBCJQ1jF/gu5Gzl35QLzt/fw8ynKLPnjUA0tVfIBSXMYgul9BhD0EIRc3mmPmTWN1zvlcqgN7U9qL5Wl/wdB04t89/1O/w1cDnyilFU=',
    channelSecret: '944bc05f706db53ac55535b1e7dffb9f'
};

const app =express();

app.post('/webhook',line.middleware(config),(req,res) => {
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
