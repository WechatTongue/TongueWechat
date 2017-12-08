import pathToRegexp from 'path-to-regexp';
import { queryBasicInfo, queryOpenId } from '../services/basicInfoService';

export default {

  namespace: 'basicInfo',

  state: {
      name:"Patient1",
      sex:"男",
      age:20,
      history:"none"
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location)=>{
        console.log(location);
        const match= pathToRegexp('/basicInfoPage').exec(
          location.pathname
        );
        if(match){
          const openId = location.search.substring(8);
          if(openId!=null){
            alert(openId)
          }
        }
      })
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const data = yield call(queryBasicInfo);
     if(data.ok){
      yield put({
          type:'save',
          payload:data
        })
     }
    },
    *queryOpenId({payload},{call,put}){
      const data = yield call(queryOpenId);
      alert(JSON.stringify(data));
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};

