import pathToRegexp from 'path-to-regexp';
import {queryWorkOrder,addWorkOrder} from '../services/messageService';

export default {
  namespace: 'workOrder',
  state: {
    workOrderId:1,
    patientId:12,
    description:"fasfad",
    time:"2017-12-09T13:09:41",
    chats:[{
      chatId:1,
      workOrderId:1,
      patientId:12,
      sequenceId:1,
      description:"fasfad",
      type:"inquiry",
      time:"2017-12-09T13:09:41",
      photos:[{
        id:31,
        url:"/home/tongue/4e519b73-187b-4b52-af7b-2a84a0bfe0b1_0adc3af28cf9f6a59b0257f2bcead7de.jpg",
        categoryId:1
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
      console.log("addWorkOrder",payload);
      const data = yield call(addWorkOrder,{
        ...payload
      });
      if(data.ok){
        yield put({
          type:'update',
          payload:data
        })
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
            console.log("inquiry",i);
            newChats[i]={
              ...chat,
              editable:true
            }
          }else{
            console.log("else",i);
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
        chats:chats
      }
    }
  },
};
