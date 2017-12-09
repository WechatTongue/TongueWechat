import pathToRegexp from 'path-to-regexp';
import {queryWorkOrder,addWorkOrder} from '../services/messageService';

export default {
  namespace: 'workOrder',
  state: {
    patientId:null,
    description:"",
    type:"",  //病人的问诊
    photos:[{
      id:null,
      url:"",
    }],
    time:"",
    sequences:[
      {
        workOrderId:null,
        patientId:null,
        sequenceId:null,
        description:"",
        type:"",
        photos:[{
          id:null,
          url:"",
          category:{}
        }],
        time:""
      }
    ]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location)=>{
        const match= pathToRegexp('/workOrder/:workOrderId').exec(
          location.pathname
        );
        if(match){
          //const openId = location.search.substring(8);
          // let openId="1212";
          // dispatch({
          //   type:'basicInfo/queryBasicInfo',
          //   payload:{
          //     openId:openId,
          //     callback:null
          //   }
          // });
          const workOrderId = match[1];
          dispatch({
            type:'queryWorkOrder',
            payload:{
              workOrderId:workOrderId
            }
          })
        }
      })
    }
  },

  effects: {
    *queryWorkOrder({payload},{call,put}){
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
    *addWorkOrder({payload},{call,put}){
      console.log("addWorkOrder",payload);
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
      console.log("action",action);
      return {...state,...action.payload}
    }
  },
};
