import {queryWorkOrder,addWorkOrder} from '../services/messageService';

export default {
  namespace: 'workOrder',
  state: {
    patientId:1,
    description:"医生帮我看看是啥毛病呗",
    type:"inquiry",  //病人的问诊
    photos:[{
      id:12345,
      url:"http://www.ufengtech.xyz/tongue/1.jpeg",
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
  },
  subscriptions: {},

  effects: {
    *query({payload},{call,put}){
      const data = yield call(queryWorkOrder,{
        ...payload
      });
      if(data.ok){
        yield put({
          type:'update',
          payload:data
        })
      }
    },
    *add({payload},{call,put}){
      const data = yield call(addWorkOrder,{
        ...payload
      });
      if(data.ok){
        yield put({
          type:'update',
          payload:data
        })
      }
    }
  },
  reducers: {
    update(state,action){
      return {...state,...action.payload}
    }
  },
};
