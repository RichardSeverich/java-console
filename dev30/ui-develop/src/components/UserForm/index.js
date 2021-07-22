import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'app/components/WrappedMaterialComponents/Avatars/DefaultAvatar';
import Button from 'app/components/WrappedMaterialComponents/Buttons/DefaultButton';
import style from './style.module.css';

/**
 * UserForm displays the logged user at the moment, with a name, and avatar and a logout button
 * @param  {string} className css class name
 * @param  {string} user string that represents the current logged user
 * @param  {function} logout function that logs out the current user
 */
function UserForm({ className, user, logout }) {
  return (
    <div className={className}>
      <div className={style.wrapper}>
        <div className={style.avatar}>
          <Avatar email={user} />
        </div>
        <div className={style.element}>
          <div className={style.name}>{user}</div>
          <Button className={style.button} label="Log out" onClick={logout} />
        </div>
      </div>
    </div>
  );
}

UserForm.propTypes = {
  className: PropTypes.string,
  user: PropTypes.string,
  logout: PropTypes.func,
};
UserForm.defaultProps = {
  className: '',
  user: '',
  logout: () => {},
};

export default UserForm;
