import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { queryBasicInfoService, addBasicInfo, updateBasicInfo } from '../services/basicInfoService';

export default {

  namespace: 'basicInfo',

  state: {
      basicInfo:{
        patientId:null,
        openId:null,
        name:null,
        sex:null,
        age:null,
        mobile:null,
        history:null,
        password:null,
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
    *queryBasicInfo({ payload }, { call, put }) {
      let { openId, callback } = payload;
      const data = yield call(queryBasicInfoService,{
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
     }else{
        yield put({
          type:'update',
          payload:{
            basicInfo:{
              openId:openId
            }
          }
        });
        yield put(routerRedux.push(`/editBasicInfo?openId=${openId}`));
      }
    },
    *queryBasicInfoForEdit({ payload },{call ,put}){
      let { openId } = payload;
      const data = yield call(queryBasicInfoService,{
        openId:openId
      });
      if(data&&data.ok){
        yield put({
          type:'update',
          payload:{
            basicInfo:data
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
      let { patientId,openId} = payload;
      let data ={};
      if(patientId==null){
        data = yield call(addBasicInfo,{
          ...payload
        });
        if(data&&data.ok){
          yield put({
            type:'update',
            payload:{
              saveSuccess:true
            },
          });
          yield put(routerRedux.push(`/basicInfo?openId=${data.openId}`));
        }else{
          yield put({
            type:'update',
            payload:{
              saveSuccess:false
            }
          })
        }
      }else{
        data = yield call(updateBasicInfo,{
          ...payload
        });
        if(data&&data.ok){
          yield put({
            type:'update',
            payload:{
              saveSuccess:true
            },
          });
          yield put(routerRedux.push(`/basicInfo?openId=${data.openId}`));
        }else{
          yield put({
            type:'update',
            payload:{
              saveSuccess:false
            }
          })
        }
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

