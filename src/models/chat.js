import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import {addChat,updateChat} from '../services/messageService';
import {formatLink} from '../utils/format';

export default {
  namespace: 'chat',
  state: {
      chatId:0,
      workOrderId:0,
      patientId:0,
      sequenceId:0,
      description:"",
      type:"",
      time:"",
      photos:[{
        id:0,
        url:"",
        categoryId:0
      }]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location)=>{

        const addChat = pathToRegexp('/workOrder/:workOrderId/addChat').exec(
          location.pathname
        );
        if(addChat){
          const workOrderId = addChat[1];
          const openId = location.search.substring(8);
          dispatch({
            type:'basicInfo/queryBasicInfo',
            payload:{
              openId:openId
            }
          });
          dispatch({
            type:'workOrder/queryWorkOrder',
            payload:{
              workOrderId:workOrderId
            }
          })
        }

        const editChat = pathToRegexp('/workOrder/:workOrderId/chats/:chatId').exec(
          location.pathname
        );
        if(editChat){
          console.log(formatLink("/basicInfo"));
          const workOrderId = editChat[1];
          const chatId = editChat[2];
          const openId = location.search.substring(8);
          dispatch({
            type:'workOrder/queryChatFromWorkOrder',
            payload:{
              workOrderId:workOrderId,
              chatId:chatId
            }
          });
          dispatch({
            type:'basicInfo/queryBasicInfo',
            payload:{
              openId:openId
            }
          });
        }
      })
    }
  },

  effects: {
    *addChat({payload},{call,put}){
      console.log("addChat",payload);
      const data = yield call(addChat,{
        ...payload
      });
      if(data.ok){
        yield put(routerRedux.push(`/workOrder/${data.workOrderId}`));
      }
    },
    *updateChat({payload},{call,put}){
      console.log("updateChat",payload);
      const data = yield call(updateChat,{
        ...payload
      });
      if(data.ok){
        yield put(routerRedux.push(`/workOrder/${data.workOrderId}`));
      }
    }
  },
  reducers: {
    update(state,action){
      console.log("updateChat",action);
      return {
        ...state,
        ...action.payload
      }
    },
    updatePhotos(state,action){
      console.log("updatePhotos",action.payload);
      const { photos } =action.payload;
      return {
        ...state,
        photos:photos
      }
    }
  },
};
