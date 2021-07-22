import Tabs from 'components/WrappedMaterialComponents/TabPanel/subMenuTabPanel';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFoundComponent from 'components/NotFound';
import React from 'react';
import URLSplitter from 'helpers/urlHelper';
import StageDesignContainer from 'app/containers/StageDesign';
import SingleStageDesignContainer from 'app/containers/SingleStageDesign';
import style from './style.module.css';

/**
 * Stages Router Component which is in charge to route the whole
 * pages for stages module
 */
function StagesRouter() {
  const { path } = useRouteMatch();
  const [firstRoute, secondRoute, thirdRoute] = URLSplitter();
  const menuButtons = ['design'];

  return (
    <div>
      <div className={style.container}>
        <div>
          <Tabs
            tabs={menuButtons}
            current={thirdRoute}
            path={`/${firstRoute}/${secondRoute}`}
          />
        </div>
        <Switch>
          <Route exact path={`${path}/design`}>
            <StageDesignContainer />
          </Route>
          <Route exact path={`${path}/design/:id`}>
            <SingleStageDesignContainer />
          </Route>
          <Route exact path={`${path}/`} />
          <Route path="*">
            <NotFoundComponent />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default StagesRouter;
