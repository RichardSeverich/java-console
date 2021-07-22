import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import UserForm from 'app/components/UserForm';
import Tabs from 'app/components/WrappedMaterialComponents/TabPanel/DefaultTabPanel';
import ProgramsContainer from 'app/containers/Programs';
import CandidatesRouterComponent from 'components/CandidatesRouter';
import ActivitiesRouterComponent from 'components/ActivitiesRouter';
import UsersRouterComponent from 'components/UsersRouter';
import ImportTeams from 'app/containers/ImportTeams';
import {
  Route,
  useRouteMatch,
  Switch,
  Link,
  useHistory,
} from 'react-router-dom';
import URLSplitter from 'app/helpers/urlHelper';
import StagesRouterComponent from 'components/StagesRouter';
import style from './style.module.css';

/**
 * Home displays the main ui component including the Login
 * @param  {string} user string that represents the current logged user
 * @param  {function} handleLogout function that consumes the logout service
 * @param  {number} getIdProgram number that is id program
 */
function Home({ user, handleLogout }) {
  const menuButtons = [
    'programs',
    'candidates',
    'users',
    'stages',
    'activities',
    'teams',
  ];
  const { path } = useRouteMatch();
  const [firstRoute, secondRoute] = URLSplitter(path);
  const buttonPosition = secondRoute;
  const history = useHistory();

  useEffect(() => {
    if (!buttonPosition) {
      history.push(`${firstRoute}/programs`);
    }
  }, [history, firstRoute, buttonPosition]);

  return (
    <div className={style.container}>
      <div className={style.sideBar}>
        <Link to="/home">
          <div className={style.logo} />
        </Link>
      </div>
      <div className={style.body}>
        <div className={style.topMenu}>
          <div className={style.buttonContainer}>
            <Tabs
              className={style.topButtons}
              tabs={menuButtons}
              current={buttonPosition}
              path={path}
            />
          </div>
          <UserForm
            className={style.userInfo}
            user={user}
            logout={handleLogout}
          />
        </div>
        <Switch>
          <Route path={`${path}/programs`}>
            <ProgramsContainer />
          </Route>
          <Route path={`${path}/candidates`}>
            <CandidatesRouterComponent />
          </Route>
          <Route path={`${path}/users`}>
            <UsersRouterComponent />
          </Route>
          <Route path={`${path}/stages`}>
            <StagesRouterComponent />
          </Route>
          <Route path={`${path}/activities`}>
            <ActivitiesRouterComponent />
          </Route>
          <Route path={`${path}/teams`}>
            <h3>Import Teams</h3>
            <ImportTeams />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

Home.propTypes = {
  user: PropTypes.string,
  handleLogout: PropTypes.func,
};

Home.defaultProps = {
  user: '',
  handleLogout: () => {},
};

export default Home;
