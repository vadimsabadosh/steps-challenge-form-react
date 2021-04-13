import { Button } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root:{
    margin: theme.spacing(3, 0, 2)
  }
}))

const PrimaryButton = ({children, ...props}) => {
  const styles = useStyles()
  return (
    <Button 
      type='submit' 
      fullWidth 
      variant='contained'
      color='primary'
      className={styles.root}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;