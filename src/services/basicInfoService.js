import request from '../utils/request';
import host from './hostConfig';

export async function queryBasicInfoService(params) {

  return request(`${host}/user/openId/${params.openId}`);
}

export async function addBasicInfo(params){
  console.log("addBasicInfo",params);
  return request(`${host}/user`,{
    method:'POST',
    body:JSON.stringify({
      ...params
    })
  });
}

export async function updateBasicInfo(params){
  console.log("updateBasicInfo",params);
  return request(`${host}/user`,{
    method:'PUT',
    body:JSON.stringify({
      ...params
    })
  });
}
