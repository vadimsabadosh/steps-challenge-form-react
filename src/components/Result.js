import React, { useState } from 'react';
import MainContainer from './MainContainer';
import { useData } from '../context/DataContext'
import { List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { InsertDriveFile } from '@material-ui/icons';
import PrimaryButton from './PrimaryButton';
import Confetti from 'react-confetti'
import Swal from 'sweetalert2'

const Result = () => {

  const {data} = useData();
  const [success, setSucces] = useState(false)

  const entries = Object.entries(data).filter(entry => entry[0] !== 'files');
  const { files } = data;

  const onSubmit = async() => {
    const formData = new FormData();

    if(data.files){
      data.files.forEach(file => {
        formData.append('files', file, file.name)
      })
    }
    entries.forEach(entry => {
      formData.append(entry[0], entry[1]);
    })

    const res = await fetch('http://localhost:4000/', {
      method: 'POST',
      body: formData
    });

    if(res.status === 200){
      Swal.fire('Great Job!', 'You`ve passed challenge', 'success');
      setSucces(true)
    }
  }

  if(success){
    return <Confetti />
  }

  return (
    <MainContainer>
      <Typography component='h2' variant='h5'>
        Result Values
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Field
              </TableCell>
              <TableCell align='right'>
                Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              entries.map(entry => (
                <TableRow key={entry[0]}>
                  <TableCell>
                    { entry[0] }
                  </TableCell>
                  <TableCell align='right'>
                    { entry[1].toString() }
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      {files && (

        <>
          <Typography component='h2' variant='h5'>
            Files
          </Typography>
          <List>
            { files.map((file, i ) => {
              return (
                <ListItem key={i} >
                  <ListItemIcon>
                    <InsertDriveFile />
                  </ListItemIcon>
                  <ListItemText  primary={file.name} secondary={file.size} />
                </ListItem>
              )
            })}
          </List>
        </>
      )
      }
      <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
      <Link to='/'>Start Over</Link>
    </MainContainer>
  );
};

export default Result;