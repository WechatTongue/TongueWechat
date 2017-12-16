import request from '../utils/request';
import { formatRequestData } from '../utils/format';
import host from './hostConfig';

export async function queryUser(params){
  let { openId } = params;
  return request(`${host}/user/getUser?openId=${openId}`);
}

export async function saveUser(params){

  let formData = formatRequestData(params);

  return request(`${host}/user/add`,{
    method:'POST',
    body:formData
  });
}


