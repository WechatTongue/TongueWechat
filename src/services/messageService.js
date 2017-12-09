import request from '../utils/request';
import host from './hostConfig';

export async function addWorkOrder(params) {

  // return {
  //   patientId:1,
  //   workOrderId:123,
  //   description:"医生帮我看看是啥毛病呗",
  //   type:"inquiry",  //病人的问诊
  //   photos:[{
  //     id:12345,
  //     url:"http://www.ufengtech.xyz/tongue/1.jpeg",
  //   },{
  //     id:12346,
  //     url:"http://www.ufengtech.xyz/tongue/2.jpeg"
  //   }],
  //   time:"2017-12-6 08:30"
  // };

  console.log("params",params);
  return request(`${host}/message/workorder`,{
    method : 'POST',
    body: JSON.stringify({
      patientId:1,
      description:"医生帮我看看是啥毛病呗",
      type:"inquiry",
      photos:[{
        id:12345,
        url:"http://www.ufengtech.xyz/tongue/1.jpeg",
      },{
        id:12346,
        url:"http://www.ufengtech.xyz/tongue/2.jpeg"
      }],
      time:"2017-12-6 08:30"
    })
  });
}

export async function addChat(params){
  return request(`${host}/message/chat`,{
    method : 'POST',
    data : {...params}
  });
}

export async function queryWorkOrder(params){

  console.log(params);

  return {
    ok:true,
    patientId:1,
    description:"医生帮我看看是啥毛病呗",
    type:"inquiry",  //病人的问诊
    photos:[{
      id:12345,
      url:"http://img1.gtimg.com/dajia/pics/hv1/148/163/2231/145112488.jpg",
    },{
      id:12346,
      url:"http://www.ufengtech.xyz/tongue/1.jpeg"
    }],
    time:"2017-12-6 08:30",
    sequences:[
      {
        workOrderId:1,
        patientId:1,
        sequenceId:2,
        description:"你这是表寒",
        type:"diagnostic",
        time:"2017-12-7 08:30",
      },{
        workOrderId:1,
        inquiryId:1,
        sequenceId:3,
        description:"医生我听不懂",
        type:"inquiry",
        time:"2017-12-7 09:30",
      },{
        workOrderId:1,
        patientId:1,
        sequenceId:4,
        description:"刚刚又拍了一张",
        type:"inquiry",
        photos:[{
          id:12347,
          url:"http://www.ufengtech.xyz/tongue/1.jpeg",
          category:{}
        }],
        time:"2017-12-6 15:30"
      }
    ]
  }

 // return request(`${host}/message/workorder/${params.id}`);
}

export async function queryWorkOrderList(params){
  let { patientId } = params;
  if(patientId===12){
    let data =[
      {
        workOrderId:12345,
        time:'2017-06-30 15:22:33',
        description:"咳嗽咳咳咳咳咳咳咳咳"
      },{
        workOrderId:123456,
        time:'2017-08-20 16:20:33',
        description:"头晕脑胀胀胀胀胀胀胀胀胀胀胀胀胀胀胀胀"
      }
    ];
    data.ok=true;
    return data;
  }

  //return request(`${host}/message/workorderlist/${patientId}`);
}
