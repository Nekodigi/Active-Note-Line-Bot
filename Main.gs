//リマインダー　しますか？　朝昼晩にお知らせ。

//リマインダーの設定
//https://wakky.tech/gas-trigger-line-bot-push/



//更新の仕方 https://ymt43.com/gas-new-editor-deploy/

const TOKEN = 'QyITciYCOvnaOCzYapqEZqV3Pg1+iUp3xnLfAkw/vUzBn5O3ALCWjqMe5NCBGa5aEae/uBSA0o8uWRPnDINrvBS7xAhenDyJ6KEJXCW9waFvEiuI6BLFpGaDcXFBXrv0Tk4FtujyLrr1bH6brxtjVwdB04t89/1O/w1cDnyilFU=';



function doPost(e) {
// WebHookで受信した応答用Token
var event  = JSON.parse(e.postData.contents).events[0];//ref https://webmarketerokb.com/2021/02/23/line-botxgas%E3%81%A7%E3%82%B9%E3%83%97%E3%83%AC%E3%83%83%E3%83%89%E3%82%B7%E3%83%BC%E3%83%88%E3%81%AB%E5%8F%8B%E9%81%94%E4%B8%80%E8%A6%A7%E3%82%92%E4%BD%9C%E3%82%8D%E3%81%86/
var replyToken = event.replyToken;
// ユーザーのメッセージを取得
var userMessage = event.message.text;
var userId = event.source.userId;

//https://teratail.com/questions/304140
// ユーザー情報取得用のAPI URL
var userUrl = `https://api.line.me/v2/bot/profile/${userId}`;
const res = UrlFetchApp.fetch(userUrl, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + TOKEN,
    },
    method: "GET",
  });
  const displayName = JSON.parse(res.getContentText()).displayName;

var result = "コマンドが見つかりません。\n困った時は[ヘルプ]と入力してください。";///*displayName+"が、"+*/userMessage+"て言ってるみたいだからヨシ！";
//userMessage,userIdをもとに必要な時だけメモをして、result(返事を返す)
result = Health(userMessage, userId, result);//疲れが含まれているだけで反応する。
result = Note(userMessage, userId, result);//上書きされてしまう。
result = Help(userMessage, userId, result);//確実に反応する

// 応答メッセージ用のAPI URL
var url = 'https://api.line.me/v2/bot/message/reply';

UrlFetchApp.fetch(url, {
'headers': {
'Content-Type': 'application/json; charset=UTF-8',
'Authorization': 'Bearer ' + TOKEN,
},
'method': 'post',
'payload': JSON.stringify({
'replyToken': replyToken,
'messages': [{
'type': 'text',
'text': result,
}],
}),
});
return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}