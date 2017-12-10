import request from '../utils/request';
import host from './hostConfig';

export async function queryBasicInfo(params) {
  console.log("queryBasicInfo",params);
  if(params.openId=="1212"){
    return {
      ok:true,
      patientId:12,
      openId:"1212",
      name:"James",
      age:20,
      sex:"male",
      mobile:"123456789012",
      history:"无"
    };
  }

  //return request(`${host}/user/openId/${params.openId}`);
}

export async function saveBasicInfo(params){
  console.log("saveBasicInfo",params);
  return request(`${host}/user/openId/`,{
    method:'POST',
    body:JSON.stringify({
      ...params
    })
  });
}
