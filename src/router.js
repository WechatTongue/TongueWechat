import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import AddWorkOrderPage from './routes/AddDiseasePage';
import AddChatPage from './routes/AddChatPage';
import DiseaseListPage from './routes/DiseaseListPage';
import DiseasePage from './routes/DiseasePage';
import EditBasicInfoPage from './routes/EditBasicInfoPage';
import EditChatPage from './routes/EditChatPage';
import BasicInfoPage from "./routes/BasicInfoPage.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={BasicInfoPage} />
        <Route path="/addDisease" exact component={AddWorkOrderPage} />
        <Route path="/basicInfo" component={BasicInfoPage} />
        <Route path="/editBasicInfo" component={EditBasicInfoPage} />
        <Route path="/diseaseList" component={DiseaseListPage} />
        <Route path="/disease/:diseaseId/addChat" component={AddChatPage} />
        <Route path="/disease/:diseaseId/chats/:chatId" component={EditChatPage} />
        <Route path="/disease/:diseaseId" component={DiseasePage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
