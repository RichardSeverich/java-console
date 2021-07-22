import React, { useEffect } from 'react';
import Tabs from 'app/components/WrappedMaterialComponents/TabPanel/subMenuTabPanel';
import ProgramDesignContainer from 'app/containers/ProgramsDesign';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import URLSplitter from 'app/helpers/urlHelper';
import ProgramProgressContainer from 'app/containers/ProgramProgress';
import SingleProgramContainer from 'app/containers/SingleProgram';
import NotFoundComponent from 'app/components/NotFound';
import SingleProgramDesignContainer from 'app/containers/SingleProgramDesign';
import style from './style.module.css';

function ProgramsRouter() {
  const { path } = useRouteMatch();
  const [firstRoute, secondRoute, thirdRoute] = URLSplitter();
  const menuButtons = ['progress', 'statistics', 'design'];
  const history = useHistory();

  useEffect(() => {
    if (!thirdRoute) {
      history.push(`${path}/progress`);
    }
  }, [history, thirdRoute, path]);

  return (
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
        <Route exact path={`${path}/progress`}>
          <ProgramProgressContainer />
        </Route>
        <Route exact path={`${path}/progress/:id`}>
          <SingleProgramContainer />
        </Route>
        <Route exact path={`${path}/statistics`}>
          <h3> Statistics </h3>
        </Route>
        <Route exact path={`${path}/design`}>
          <ProgramDesignContainer />
        </Route>
        <Route exact path={`${path}/design/:id`}>
          <SingleProgramDesignContainer />
        </Route>
        <Route exact path={`${path}/`} />
        <Route path="*">
          <NotFoundComponent />
        </Route>
      </Switch>
    </div>
  );
}

ProgramsRouter.propTypes = {};

ProgramsRouter.defaultProps = {};

export default ProgramsRouter;
