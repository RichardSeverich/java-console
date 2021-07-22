import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

const tabHeight = '2em';
const StyledTabs = withStyles({
  root: {
    minHeight: tabHeight,
    height: tabHeight,
    background: '#575c78',
    border: 0,
    color: 'white',
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: 'white',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    minHeight: tabHeight,
    height: tabHeight,
    color: 'white',
    background: '#575c78',
    textTransform: 'capitalize',
  },
}))((props) => <Tab disableRipple {...props} />);

/**
 * A single line tab panel of buttons that displays a single array of strings
 * @param  {string} className CSS class name of the component
 * @param  {number} current indicates the currently selected element
 * @param  {string} path is the path to where the TabPanel is located
 * @param  {array} tabs an array of strings that will be displayed on the tab panel
 */
function SubMenu({ className, current, path, tabs }) {
  const position = tabs.includes(current) ? current : false;
  return (
    <div className={className}>
      <StyledTabs
        value={position}
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="off"
      >
        {tabs.map((tab) => (
          <StyledTab
            key={tab}
            label={tab}
            value={tab}
            component={Link}
            to={`${path}/${tab}`}
          />
        ))}
      </StyledTabs>
    </div>
  );
}

SubMenu.propTypes = {
  current: PropTypes.string,
  className: PropTypes.string,
  path: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.string),
};

SubMenu.defaultProps = {
  current: '',
  className: '',
  path: '',
  tabs: [],
};

export default SubMenu;
