import pathToRegexp from 'path-to-regexp';
import { queryDiseaseList } from '../services/diseaseService';

export default {
  namespace: 'diseaseList',
  state: {
    list:[]
  },
  subscriptions: {
    setup({dispatch,history}){
      history.listen((location)=>{
        const match = pathToRegexp('/diseaseList').exec(
          location.pathname
        );
        if(match){
          const openId = location.search.substring(8);
          dispatch({
            type:'basicInfo/queryBasicInfo',
            payload:{
              openId:openId
            }
          });
          dispatch({
            type:'queryDiseaseList',
            payload:{
              openId:openId,
            }
          });
        }
      })
    }
  },
  effects: {
    *queryDiseaseList({payload},{call,put}){
      let { openId } = payload;
      const data = yield call(queryDiseaseList,{
        openId:openId
      });
      if(data.result===1){
        yield put({
          type:'update',
          payload:data.list
        })
      }
    }
  },
  reducers: {
    update(state,action){
      return{
        ...state,
        list:action.payload
      }
    }
  },


};
