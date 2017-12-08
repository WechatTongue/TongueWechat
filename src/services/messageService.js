import request from '../utils/request';
import host from './hostConfig';

export async function addWorkOrder(params) {

  return {
    patientId:1,
    workOrderId:123,
    description:"医生帮我看看是啥毛病呗",
    type:"inquiry",  //病人的问诊
    photos:[{
      id:12345,
      url:"http://www.ufengtech.xyz/tongue/1.jpeg",
    },{
      id:12346,
      url:"http://www.ufengtech.xyz/tongue/2.jpeg"
    }],
    time:"2017-12-6 08:30"
  };

  // return request(`${host}/message/workorder`,{
  //   type : 'POST',
  //   data : {...params}
  // });
}

export async function addChat(params){
  return request(`${host}/message/chat`,{
    type : 'POST',
    data : {...params}
  });
}

export async function queryWorkOrder(params){
  return request(`${host}/message/workorder/${params.id}`);
}

export async function queryWorkOrderList(params){
  return [
    {
      id:12345,
      time:'2017-06-30 15:22:33'
    },{
      id:123456,
      time:'2017-08-20 16:20:33'
    },{
      id:45678,
      time:'2017-12-02 12:00:00'
    }
  ];
  //return request(`${host}/message/workorderlist/${openId}`);
}
