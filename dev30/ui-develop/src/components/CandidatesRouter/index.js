import React from 'react';
import Tabs from 'app/components/WrappedMaterialComponents/TabPanel/subMenuTabPanel';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import URLSplitter from 'app/helpers/urlHelper';
import ImportCandidates from 'app/containers/ImportCandidates';
import NotFoundComponent from 'components/NotFound';
import SearchCandidates from 'app/containers/SearchCandidate';

/**
 * Candidates Router Component which is in charge to route the whole
 * pages for candidates module
 */
function CandidatesRouter() {
  const { path } = useRouteMatch();
  const [firstRoute, secondRoute, thirdRoute] = URLSplitter();
  const menuButtons = ['profile', 'statistics', 'design'];

  return (
    <div>
      <Tabs
        tabs={menuButtons}
        current={thirdRoute}
        path={`/${firstRoute}/${secondRoute}`}
      />
      <Switch>
        <Route exact path={`${path}/design`}>
          <h3>Import Candidates</h3>
          <ImportCandidates />
        </Route>
        <Route exact path={`${path}/profile`}>
          <SearchCandidates />
        </Route>
        <Route exact path={`${path}/statistics`}>
          <h3>Statistics</h3>
        </Route>
        <Route exact path={`${path}/`} />
        <Route path="*">
          <NotFoundComponent />
        </Route>
      </Switch>
    </div>
  );
}

export default CandidatesRouter;
