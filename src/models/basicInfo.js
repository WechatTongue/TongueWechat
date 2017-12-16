import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { saveUser, queryUser } from '../services/userService';

export default {

  namespace: 'basicInfo',

  state: {
      basicInfo:{
        openId:null,
        name:null,
        sex:null,
        sexStr:null,
        age:null,
        mobile:null,
        job:null,
        history:null,
      }
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
        const matchRoot= pathToRegexp('/').exec(
          location.pathname
        );
        if(matchRoot){
          const openId = location.search.substring(8);
          dispatch({
            type:'queryBasicInfo',
            payload:{
              openId:openId
            }
          })
        }
        const edit = pathToRegexp('/editBasicInfo').exec(
          location.pathname
        );
        if(edit){
          const openId = location.search.substring(8);
          dispatch({
            type:'queryBasicInfoForEdit',
            payload:{
              openId:openId
            }
          });
        }
      });
    }
  },

  effects: {
    *queryBasicInfoForAuth({payload},{call,put}){
      let { openId } = payload;
      const data = yield call(queryUser,{
        openId:openId
      });
      if(data&&data.result===1){
        yield put({
          type:'update',
          payload:{
            basicInfo:data.object
          }
        });
      }else{
        yield put({
          type:'update',
          payload:{
            basicInfo:{
              openId:openId
            }
          }
        });
        yield put(routerRedux.push(`/editBasicInfo?openId=${openId}`))
      }
    },
    *queryBasicInfo({ payload }, { call, put }) {
      let { openId } = payload;
      const data = yield call(queryUser,{
        openId:openId
      });
      if(data&&data.result===1){
        yield put({
          type:'update',
          payload:{
            basicInfo:data.object
          }
        });
     }else{
        yield put({
          type:'update',
          payload:{
            basicInfo:{
              openId:openId
            }
          }
        });
      }
    },
    *saveBasicInfo({ payload },{ call, put }){
      let { openId } = payload;
      const data = yield call(saveUser,{
          ...payload
      });
      if(data.result===1){
        yield put(routerRedux.push(`/basicInfo?openId=${openId}`));
      }

    }
  },
  reducers: {
    update(state, action) {
      return { ...state, ...action.payload };
    },
    updateFromLocal(state,action){
      return {
        ...state,
        basicInfo:{
          ...state.basicInfo,
          ...action.payload
        }
      }
    }
  },

};

