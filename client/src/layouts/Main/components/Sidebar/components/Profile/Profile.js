import React, {useEffect, useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import jwt_decode from 'jwt-decode';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  },
  imglogo: {
    height: 100,
    width: 200
  }
}));

const Profile = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  // const user = { // will come from DB
  //   name: 'Humberto Buniotto',
  //   avatar: '/images/avatars/humberto.jpg', 
  //   bio: 'Software Developer'
  // };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {/* <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
      /> */}
      <img
        className={classes.imglogo}
          alt="Logo"
          src="/images/logos/minimaless_logo-bgwhite.png"
        />
      {/* <Typography
        variant="h5"
      >
        {user.name}
      </Typography> */}
      {/* <Typography variant="body2">{user.bio}</Typography> */}
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
