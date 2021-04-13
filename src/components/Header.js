import { Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root:{
    margin: theme.spacing(3, 0, 2),
    textAlign: 'center',
    fontSize: '40px',
    fontFamily: 'Architects Daughter',
    color: '#1A1F16',
    textShadow: '1px 1px darkmagenta'
  }
}))

const Header = () => {
  const styles = useStyles()
  return (
    <Typography className={styles.root} component='h1' variant='h5'>Ultimate React Form</Typography>
  );
};

export default Header;