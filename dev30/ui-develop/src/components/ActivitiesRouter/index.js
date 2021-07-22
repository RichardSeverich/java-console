import React from 'react';
import Tabs from 'app/components/WrappedMaterialComponents/TabPanel/subMenuTabPanel';
import ImportActivities from 'app/containers/ImportActivities';
import ImportActivitiesEvaluations from 'app/containers/ImportActivitiesEvaluations';
import URLSplitter from 'app/helpers/urlHelper';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

/**
 * Activities Router Component which is in charge to route the whole
 * pages for activities module
 */
function ActivitiesRouter() {
  const { path } = useRouteMatch();
  const [firstRoute, secondRoute, thirdRoute] = URLSplitter();
  const menuButtons = ['design'];

  return (
    <div>
      <Tabs
        tabs={menuButtons}
        current={thirdRoute}
        path={`/${firstRoute}/${secondRoute}`}
      />
      <Switch>
        <Route exact path={`${path}/design`}>
          <h3>Import</h3>
          <ImportActivities />
          <h3>Import Results</h3>
          <ImportActivitiesEvaluations />
        </Route>
      </Switch>
    </div>
  );
}

export default ActivitiesRouter;
