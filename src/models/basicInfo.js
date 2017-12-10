import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { queryBasicInfo, saveBasicInfo } from '../services/basicInfoService';

export default {

  namespace: 'basicInfo',

  state: {
      basicInfo:{
        openId:"",
        id:"",
        name:"",
        sex:"",
        age:null,
        mobile:"",
        history:""
      },
      saveSuccess:true,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location)=>{
        const match= pathToRegexp('/basicInfo').exec(
          location.pathname
        );
        if(match){
          const openId = location.search.substring(8);
          dispatch({
            type:'queryBasicInfo',
            payload:{
              openId:openId
            }
          })
        }
      })
    }
  },

  effects: {
    *queryBasicInfo({ payload }, { call, put }) {
      let { openId, callback } = payload;
      const data = yield call(queryBasicInfo,{
        openId:openId
      });

      if(data&&data.ok){
        yield put({
          type:'update',
          payload:{
            basicInfo:data
          }
        });
        if(callback!=null){
          yield put({
            type:callback,
            payload:{
              patientId:data.patientId
            }
          })
        }
     }
    },
    *saveBasicInfo({ payload },{ call, put }){
      const data = yield call(saveBasicInfo,{
        ...payload
      });
      if(data&&data.ok){
        yield put({
          type:'update',
          payload:{
            saveSuccess:true
          },
        });
        yield put(routerRedux.push(`/basicInfo`));
      }else{
        yield put({
          type:'update',
          payload:{
            saveSuccess:false
          }
        })
      }
    }
  },

  reducers: {
    update(state, action) {
      console.log("update",action);
      return { ...state, ...action.payload };
    },
  },

};

