import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import AddWorkOrderPage from './routes/AddWorkOrderPage';
import AddChatPage from './routes/AddChatPage';
import WorkOrderListPage from './routes/WorkOrderListPage';
import WorkOrderPage from './routes/WorkOrderPage';
import EditBasicInfoPage from './routes/EditBasicInfoPage';
import EditChatPage from './routes/EditChatPage';
import BasicInfoPage from "./routes/BasicInfoPage.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={BasicInfoPage} />
        <Route path="/addWorkOrder" exact component={AddWorkOrderPage} />
        <Route path="/basicInfo" component={BasicInfoPage} />
        <Route path="/editBasicInfo" component={EditBasicInfoPage} />
        <Route path="/workOrderList" component={WorkOrderListPage} />
        <Route path="/workOrder/:workOrderId/addChat" component={AddChatPage} />
        <Route path="/workOrder/:workOrderId/chats/:chatId" component={EditChatPage} />
        <Route path="/workOrder/:workOrderId" component={WorkOrderPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
