function Note(userMessage, userId, result) {
  //正規表現についてd https://www.javadrive.jp/javascript/regexp/index12.html
  var firstChar = userMessage.substr(0,1);

  if(userMessage.match(/^(?=.*メモ)(?=.*リセット)/)){
    //データ保存についてhttps://qiita.com/unsoluble_sugar/items/ec5c935c4bfc2e06b246
    PropertiesService.getScriptProperties().setProperty(userId,"");
    result = "メモをリセットしました。";
  }else if(firstChar=='。' || userMessage.match(/^(?=.*メモ)(?=.*(見|開))/)){
    var note = PropertiesService.getScriptProperties().getProperty(userId);
    if(note == ""){//??
      result = "メモはありません。";
    }
    else{
      result = note;
    }
  }else if (firstChar=='、' || userMessage.match(/メモ/)) {//最初にコマンド/を打ったらメモ
    userMessage = userMessage.replace("をメモして","");
    userMessage = userMessage.replace("をメモ","");
    userMessage = userMessage.replace("メモして","");
    userMessage = userMessage.replace("メモ","");
    userMessage = userMessage.replace("、","");
    var note = PropertiesService.getScriptProperties().getProperty(userId);
    if(note == ""){
     PropertiesService.getScriptProperties().setProperty(userId,userMessage);
    }else{
     PropertiesService.getScriptProperties().setProperty(userId,note+'\n'+userMessage);
    }
    result=userMessage+"を保存しました。\n朝昼晩にお知らせしてほしい場合は、[お知らせして]と言ってください。";
    
    //お知らせしての場合      9時、12時、15時にお知らせします。変更したい場合は、[時間を変更して"〜時〜時〜時"]と入力して、三つの時間を教えてください。"
    ///9/12/15/今日のうちにやりたいことをリマインド。時間変更もできる
  }else if(userMessage.match(/お知らせ/)){
    PropertiesService.getScriptProperties().setProperty("t:"+userId,3);//how many time left
    setList(userId);
    result="9時、12時、15時に3回お知らせします。";
  }
  return result;
}
