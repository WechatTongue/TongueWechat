import request from '../utils/request';
import host from './hostConfig';
import { convertJSONToFormData } from '../utils/format';

export async function saveDisease(params){

  let formData = convertJSONToFormData(params);

  return request(`${host}/disease/add`,{
    method:'POST',
    body:formData
  })
}

export async function queryDiseaseList(params){
  return request(`${host}/disease/getOwnDiseases?openId=${params.openId}`)
}

export async function queryChat(params){
  return request(`${host}/chat/getChat?diseaseId=${params.diseaseId}`)
}

export async function saveChat(params){

  let formData = convertJSONToFormData(params);
  return request(`${host}/chat/add`,{
    method:'POST',
    body:formData
  })

}


