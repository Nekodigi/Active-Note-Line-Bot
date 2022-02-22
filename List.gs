

function setList(userId, remove = false) {
  var list = PropertiesService.getScriptProperties().getProperty("list");
  list = list.replace(new RegExp(userId+",",'g'),"");//g複数ヒット 変数を使った正規表現　https://qiita.com/ykob/items/6e4d0b07bed57881a2bd
  if(!remove){
    console.log("ADD");
    list += userId+",";
  }
  PropertiesService.getScriptProperties().setProperty("list",list);
  //console.log(list);
}

console.log(getList());

function getList() {
  var list = PropertiesService.getScriptProperties().getProperty("list");//6e4d0b07bed57881a2bd
  var list = list.slice( 0, -1 ) ;
  return list.split(",");
}


