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

  return {
    ok:true,
    workOrderId:1,
    patientId:12,
    description:"fasfad",
    time:"2017-12-09T13:09:41",
    chats:[{
      chatId:1,
      workOrderId:1,
      patientId:12,
      sequenceId:1,
      description:"fasfad",
      type:"inquiry",
      time:"2017-12-09T13:09:41",
      photos:[{
        id:31,
        url:"/home/tongue/4e519b73-187b-4b52-af7b-2a84a0bfe0b1_0adc3af28cf9f6a59b0257f2bcead7de.jpg",
        categoryId:1
      }],
    },
      {
        chatId:2,
        workOrderId:1,
        patientId:12,
        sequenceId:2,
        description:"fasfad",
        type:"diagnostic",
        time:"2017-12-09T13:09:41",
      },
      {
        chatId:3,
        workOrderId:1,
        patientId:12,
        sequenceId:3,
        description:"最后一个",
        type:"inquiry",
        time:"2017-12-09T13:09:41",
        photos:[{
          id:31,
          url:"/home/tongue/4e519b73-187b-4b52-af7b-2a84a0bfe0b1_0adc3af28cf9f6a59b0257f2bcead7de.jpg",
          categoryId:1
        }],
      }]
  };

  // let { workOrderId } =params;
  // return request(`${host}/message/workorder/${workOrderId}`);

}

export async function queryWorkOrderList(params){

  let { patientId } = params;
  return request(`${host}/message/workorders/patient/${patientId}`);

}
