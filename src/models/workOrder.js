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
          })
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

        const addChat = pathToRegexp('/workOrder/:workOrderId/addChat').exec(
          location.pathname
        );
        if(addChat){
          const workOrderId = addChat[1];
          dispatch({
            type:'queryWorkOrder',
            payload:{
              workOrderId:workOrderId
            }
          })
        }

        const editChat = pathToRegexp('/workOrder/:workOrderId/chats/:chatId').exec(
          location.pathname
        );
        if(editChat){
          const workOrderId = editChat[1];
          const chatId = editChat[2];
          dispatch({
            type:'queryWorkOrder',
            payload:{
              workOrderId:workOrderId
            }
          })
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
    *addChat({payload},{call,put}){
      console.log("addChat",payload);
      const data = yield call(addWorkOrder,{
        ...payload
      });
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
        console.log("action.payload",action.payload);
        console.log("newChats",newChats);
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
