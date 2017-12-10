

export function formatLink(target){
  const api = 'http://nju.erivermap.com/wx/redirect';
  const redirect = 'http://nju.erivermap.com/wx/infoResp';
  const host='http://www.ufengtech.xyz/';
  return `${api}?redirect=${redirect}&host=${host}&target=${target}`;
}

export function formatTime(timestamp){
  let date = new Date(timestamp);
  return date.toLocaleDateString("zh-cn")
}
