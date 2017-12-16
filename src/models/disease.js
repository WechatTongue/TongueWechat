import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { saveDisease , queryChat } from '../services/diseaseService';

export default {
  namespace: 'disease',
  state: {
    diseaseId:'',
    openId:0,
    photoTime:"",
    description:"",
    photosStr:[],
    chats:[]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location)=>{
        const disease= pathToRegexp('/disease/:diseaseId').exec(
          location.pathname
        );
        if(disease){
          const diseaseId = disease[1];
          dispatch({
            type:'update',
            payload:{
              diseaseId:diseaseId
            }
          });
          dispatch({
            type:'queryDisease',
            payload:{
              diseaseId:diseaseId
            }
          });
        }
        const addDisease = pathToRegexp('/addDisease').exec(
          location.pathname
        );
        if(addDisease){
          const openId = location.search.substring(8);
          dispatch({
            type:'basicInfo/queryBasicInfoForAuth',
            payload:{
              openId:openId
            }
          });
        }
      })
    }
  },

  effects: {
    *add({payload},{call,put}){
      const data = yield call(saveDisease,{
        ...payload
      });
      if(data.result===1){
        yield put({
          type:'update',
          payload:data.object
        });
        yield put(routerRedux.push(`/disease/${data.id}`))
      }else{
        alert(data.msg)
      }
    },
    *queryDisease({payload},{call,put}){
      const data = yield call(queryChat,{
        ...payload
      });
      if(data.result===1){
        yield put({
          type:'update',
          payload:{
            chats:data.list
          }
        })
      }
    }
  },
  reducers: {
    update(state,action){
      return{
        ...state,
        ...action.payload
      }
    }
  },
};
