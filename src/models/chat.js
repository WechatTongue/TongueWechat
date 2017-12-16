import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { saveChat } from '../services/diseaseService';

export default {
  namespace: 'chat',
  state: {
    id:0,
    diseaseId:0,
    openId:0,
    sequenceId:0,
    description:"",
    type:"",
    time:"",
    photos:[{
      id:0,
      url:""
    }]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      const addChat= pathToRegexp('/disease/:diseaseId/addChat').exec(
        location.pathname
      );
      if(addChat){
        const diseaseId = addChat[1];
        dispatch({
          type:'disease/update',
          payload:{
            diseaseId:diseaseId
          }
        })
      }
    }
  },

  effects: {
    *addChat({payload},{call,put}){
      console.log("addChat",payload);
      const data = yield call(saveChat,{
        ...payload
      });
      if(data.result===1){
        yield put(routerRedux.push(`/disease/${payload.diseaseId}`));
      }else{
        alert(data.msg)
      }
    }
  },
  reducers: {
    update(state,action){
      console.log("updateChat", action);
      return {
        ...state,
        ...action.payload
      }
    }
  },
};
