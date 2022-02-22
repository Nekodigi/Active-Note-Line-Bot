//Remind関数を決まった時間に実行してください。デフォルトは9時12時15時です。

function Remind() {
  const TOKEN = 'QyITciYCOvnaOCzYapqEZqV3Pg1+iUp3xnLfAkw/vUzBn5O3ALCWjqMe5NCBGa5aEae/uBSA0o8uWRPnDINrvBS7xAhenDyJ6KEJXCW9waFvEiuI6BLFpGaDcXFBXrv0Tk4FtujyLrr1bH6brxtjVwdB04t89/1O/w1cDnyilFU=';
  //https://qiita.com/n_oshiumi/items/a1a02e03093825f41e01
  var to = "Udddd628d5987a54017a5fac118028a6d";//LineのユーザーID
  //var list = PropertiesService.getScriptProperties().setProperty("list",list);
  var list = getList();
  list.forEach(function(userId){
    // https://developers.line.biz/ja/reference/messaging-api/#send-push-message
    var url = 'https://api.line.me/v2/bot/message/push';//multicast??

    var note = PropertiesService.getScriptProperties().getProperty(userId);
    var result = "メモした内容をお知らせします！\n";//~時になったので、
    result += note;

    var times = PropertiesService.getScriptProperties().getProperty("t:"+userId);
    times-=1;
    if(times ==  0){
      result += "\nこれでお知らせは終わりです。\n延長したい時はまた[お知らせして]と言ってください。";
      setList(userId, true);
    }else{
      PropertiesService.getScriptProperties().setProperty("t:"+userId, times);


      result += "\nあと"+times+"回お知らせします。\n充実した一日になりますように😀";//回答の種類増やす!
    }
    if(times >= 0){
      return UrlFetchApp.fetch(url, {
        'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + TOKEN,
        },
        'method': 'post',
        'payload': JSON.stringify({
        "to" : userId,
        'messages': [{
        'type': 'text',
        'text': result,
        }],
        }),
      });
    }
    
  });

  
}
