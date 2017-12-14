import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import {queryWorkOrder,addWorkOrder} from '../services/messageService';

export default {
  namespace: 'workOrder',
  state: {
    workOrderId:0,
    patientId:0,
    description:"",
    time:"",
    chats:[{
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
      }],
    }]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location)=>{
        const workOrder= pathToRegexp('/workOrder/:workOrderId').exec(
          location.pathname
        );
        if(workOrder){
          const workOrderId = workOrder[1];
          dispatch({
            type:'queryWorkOrder',
            payload:{
              workOrderId:workOrderId
            }
          });
          const openId = location.search.substring(8);
          dispatch({
            type:'basicInfo/queryBasicInfo',
            payload:{
              openId:openId,
              callback:null
            }
          });

        }
        const addWorkOrder = pathToRegexp('/addWorkOrder').exec(
          location.pathname
        );
        if(addWorkOrder){
          const openId = location.search.substring(8);
          dispatch({
            type:'basicInfo/queryBasicInfo',
            payload:{
              openId:openId,
              callback:null
            }
          });
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
    *queryChatFromWorkOrder({payload},{call,put}){
      let { workOrderId,chatId } =payload;
      const data = yield call(queryWorkOrder,{
        workOrderId
      });
      if(data.ok){
        const { chats } = data;
        let chat = {};
        for(let i=0;i<chats.length;i++){
          if(chats[i].chatId==chatId){
            chat={
              ...chats[i]
            };
            yield put({
              type:'chat/update',
              payload:{
                ...chat
              }
            });
            break;
          }
        }
      }
    },
    *addWorkOrder({payload},{call,put}){
      const data = yield call(addWorkOrder,{
        ...payload
      });
      if(data.ok){
        yield put({
          type:'update',
          payload:data
        });
        yield put(routerRedux.push(`/workOrder/${data.workOrderId}`))
      }
    },

  },
  reducers: {
    update(state,action){
      let { workOrderId, patientId, description, time, chats } = action.payload;
      let newChats = [];
        let flag = true;
        for(let i = chats.length;i--;i>=0){
          let chat = chats[i];
          if(flag&&chat.type==="inquiry"){
            newChats[i]={
              ...chat,
              editable:true
            }
          }else{
            flag=false;
            newChats[i]={
              ...chat,
              editable:false
            }
          }
        }
      return {
        ...state,
        workOrderId:workOrderId,
        patientId:patientId,
        description:description,
        time:time,
        chats:newChats
      }
    }
  },
};
