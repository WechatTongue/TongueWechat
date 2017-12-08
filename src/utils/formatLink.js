

export default function formatLink(target){
  const api = 'http://nju.erivermap.com/wx/redirect';
  const redirect = 'http://nju.erivermap.com/wx/infoResp';
  const host='http://www.ufengtech.xyz/';
  return `${api}?redirect=${redirect}&host=${host}&target=${target}`;
}
