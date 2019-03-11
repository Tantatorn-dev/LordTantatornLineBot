const line = require('@line/bot-sdk');
const express = require('express');

var port = process.env.PORT || 8080;

const config = {
   channelAccessToken: '1C5B0Ob9WXDL2wLIbHkTP3/O/nPxWw6qH8Dr+eu8eMKtLK5e/fVUlZbjIsBov8OiqhMrLBCJQ1jF/gu5Gzl35QLzt/fw8ynKLPnjUA0tVfK+xFq3KCt5pp+d8ZbQ7Ag22NgKrWCDDqMjjo2SEWLg2gdB04t89/1O/w1cDnyilFU=', 
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
