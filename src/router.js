import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import AddWorkOrderPage from './routes/AddWorkOrderPage';
import AddChatPage from './routes/AddChatPage';
import WorkOrderListPage from './routes/WorkOrderListPage';
import WorkOrderPage from './routes/WorkOrderPage';

import BasicInfoPage from "./routes/BasicInfoPage.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={AddWorkOrderPage} />
        <Route path="/addWorkOrder" exact component={AddWorkOrderPage} />
        <Route path="/basicInfoPage" component={BasicInfoPage} />
        <Route path="/workOrderList" component={WorkOrderListPage} />
        <Route path="/workOrder" component={WorkOrderPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
