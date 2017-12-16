import request from '../utils/request';
import host from './hostConfig';

export async function queryBasicInfoService(params) {

  return request(`${host}/user/openId/${params.openId}`);
}

export async function saveUser(params){

  let formData = new FormData();
  formData.append("json",JSON.stringify({
  openId:"123",
    name:"吃",
    age:10,
    sex:0,
    mobile:"1234567890",
    job:"xuesheng",
    history:"无"
  }))

  return request(`${host}/user`,{
    method:'POST',
    body:JSON.stringify({
      ...params
    })
  });
}


