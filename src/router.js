import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import UploadPage from './routes/UploadImagePage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={UploadPage} />
        <Route path="/upload" exact component={UploadPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
