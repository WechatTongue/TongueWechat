import request from '../utils/request';
import host from './hostConfig';

export async function queryBasicInfo() {

  return {
    name:"James",
    age:20,
    sex:"male",
    mobile:"123456789012",
    password:"123456",
    history:"none"
  }
  //return request('/api/users');
}


export async function queryOpenId() {

 // return {"openId":"oJhct0rDFCIryZKU6mfIOxm_V6bM"};
  let url2 = 'http://nju.erivermap.com/wx/getOpenId?redirect=http%3a%2f%2fnju.erivermap.com%2fwx%2finfoResp%3fredirect%3dhttp%3a%2f%2fwww.ufengtech.xyz%2fwx%2finfo';
  return request(url,
    {
      mode:'no-cors',
      redirect: 'follow',
      credentials: 'include',
    });
}



