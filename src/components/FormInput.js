import { List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core';
import { CloudUpload, InsertDriveFile } from '@material-ui/icons';
import React from 'react';
import Dropzone from 'react-dropzone';
import { Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root:{
    background: '#eee',
    cursor: 'pointer',
    color: '#333',
    padding: '10px',
    textAlign: 'center',
    marginTop: '20px' 
  },
  icon:{
    marginTop: '10px',
    color: '#888',
    fontSize: '42px',

  }
}))


const FormInput = ({control, name}) => {

  const styles = useStyles();
  return (
    <Controller 
      control={control}
      name={name}
      defaultValue={[]}
      render={({onChange, onBlur, value = []}) => {
        return(
        <>
          <Dropzone onDrop={onChange}>
            {
              ({getRootProps, getInputProps}) => {
               return (
                <Paper className={styles.root} variant='outlined' {...getRootProps()}>
                  <CloudUpload className={styles.icon}/>
                  <input {...getInputProps()} name={name} onBlur={onBlur}/>
                  <p>Drag 'n' Drop files or click to select.</p>
                </Paper>
              )}
            }
          </Dropzone>
          <List>
            {
              value.map((file, index) => {
                return (
                <ListItem key={index}>
                  <ListItemIcon>
                    <InsertDriveFile/>
                  </ListItemIcon>
                  <ListItemText primary={file.name} secondary={file.size} />
                </ListItem>)
                })
            }
          </List>
        </>
      )}}
    />

  );
};

export default FormInput;