function Health(userMessage, userId, result) {
  //正規表現についてd https://www.javadrive.jp/javascript/regexp/index12.html
  //コマンド候補　眠い　疲れた
  //コマンドが被ったときに上書きされる。


  if ( userMessage.match(/^(?=.*目)(?=.*疲れ)/)) {//
    //一息で話せる長さで
    contents = ["少し散歩してみるのはいかがですか？",
    "15分睡眠はどうでしょう。",
    "席を離れて外の景色を見てみましょう！",
    "ヨガをしてみませんか？",
    "目を閉じてリラックスしましょう☺"];
    result = contents[Math.floor(Math.random()*contents.length)];
  }else if(userMessage.match(/凝った|こった|つかれた|疲/)){//
    contents = ["少し散歩してみるのはいかがですか？",
    "席を離れて散歩してみましょう！",
    "ヨガをしてみませんか？"];
    result = contents[Math.floor(Math.random()*contents.length)];
  }else if(userMessage.match(/退屈|だるい/)){//
    contents = ["少し散歩してみるのはいかがですか？",
    "席を離れて散歩してみましょう！",
    "ヨガをしてみませんか？",
    "新しいことや、流行っているものを試してみませんか？",
    "お友達と話してみるのはどうですか？"];
    result = contents[Math.floor(Math.random()*contents.length)];
  }else if(userMessage.match(/寒|さむい/)){//
    contents = ["ココアを飲むのはどうでしょう？",
    "ジョギングしてみませんか?",
    "ヨガをしてみませんか？",];
    result = contents[Math.floor(Math.random()*contents.length)];
  }else if(userMessage.match(/暑|あつい/)){//
    contents = ["クーラーの効いた店に行ってみませんか?",
    "アイスを食べて涼むのはどうでしょう?",
    "",];
    result = contents[Math.floor(Math.random()*contents.length)];
  }
  return result;
}