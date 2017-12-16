

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

export function formatRequestData(params){
  let formData = new FormData();
  formData.append("json",JSON.stringify({
    ...params
  }));
  return formData;
}

export function convertJSONToFormData(json){
  let formData = new FormData();
  for(let key in json ){
    formData.append(key,json[key]);
  }
  return formData
}
