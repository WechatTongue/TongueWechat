import pathToRegexp from 'path-to-regexp';
import { queryWorkOrderList } from '../services/messageService';

export default {
  namespace: 'workOrderList',
  state: {
    workOrderList:[
      {
        workOrderId:null,
        time:'',
        description:""
      },
    ]
  },
  subscriptions: {
    setup({dispatch,history}){
      history.listen((location)=>{
        const match = pathToRegexp('/workOrderList').exec(
          location.pathname
        );
        if(match){
          const openId = location.search.substring(8);
          dispatch({
            type:'basicInfo/queryBasicInfo',
            payload:{
              openId:openId,
              callback:'workOrderList/queryWorkOrderList'
            }
          });
        }
      })
    }
  },
  effects: {
    *queryWorkOrderList({payload},{call,put}){
      let { patientId } = payload;
      const data = yield call(queryWorkOrderList,{
        patientId:patientId
      });
      console.log("queryWorkOrderList",payload,data);
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
      return{
        ...state,
        workOrderList:action.payload
      }
    }
  },


};
