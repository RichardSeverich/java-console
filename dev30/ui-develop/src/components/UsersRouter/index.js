import React from 'react';
import Tabs from 'app/components/WrappedMaterialComponents/TabPanel/subMenuTabPanel';
import UsersDesignContainer from 'app/containers/ImportUsers';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import URLSplitter from 'app/helpers/urlHelper';
import NotFoundComponent from 'app/components/NotFound';
import style from './style.module.css';

function UsersRouter() {
  const { path } = useRouteMatch();
  const [firstRoute, secondRoute, thirdRoute] = URLSplitter();
  const menuButtons = ['manage'];

  return (
    <div>
      <div>
        <div className={style.container}>
          <div className={style.buttonContainer}>
            <Tabs
              className={style.topButtons}
              tabs={menuButtons}
              current={thirdRoute}
              path={`/${firstRoute}/${secondRoute}`}
            />
          </div>
          <Switch>
            <Route exact path={`${path}/manage`}>
              <UsersDesignContainer />
            </Route>
            <Route exact path={`${path}/`} />
            <Route path="*">
              <NotFoundComponent />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

UsersRouter.propTypes = {};

UsersRouter.defaultProps = {};

export default UsersRouter;
