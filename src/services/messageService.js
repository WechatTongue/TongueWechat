import request from '../utils/request';
import host from './hostConfig';

export async function addWorkOrder(params) {

  console.log("addWorkOrder params",params);
  return request(`${host}/message/workorder`,{
    method : 'POST',
    body: JSON.stringify({
      ...params
    })
  });
}

export async function addChat(params){
  return request(`${host}/message/chat`,{
    method : 'POST',
    body : JSON.stringify({
      ...params
    })
  });
}

export async function updateChat(params){
  return request(`${host}/message/chat`,{
    method : 'PUT',
    body : JSON.stringify({
      ...params
    })
  });
}

export async function queryWorkOrder(params){

  let { workOrderId } =params;
  return request(`${host}/message/workorder/${workOrderId}`);

}

export async function queryWorkOrderList(params){

  let { patientId } = params;
  return request(`${host}/message/workorders/patient/${patientId}`);

}
