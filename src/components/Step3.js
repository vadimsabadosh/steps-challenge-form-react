import React from 'react';
import MainContainer from './MainContainer';
import { Typography } from '@material-ui/core';
import Form from './Form';
import FormInput from './FormInput';
import { useForm } from 'react-hook-form';
import PrimaryButton from './PrimaryButton';
import { useHistory } from 'react-router';
import { useData } from '../context/DataContext';

const Step3 = () => {

  const { data, setValues } = useData()

  const history = useHistory()
  const { control, handleSubmit } = useForm({
    defaultValues: {files: data.files}
  })

  const onSubmit = (data) => {
    setValues(data)
    history.push('/result')
  }
  return (
    <MainContainer>
      <Typography component='h2' variant='h5'>
        Step 3
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput name='files' control={control}/>
        <PrimaryButton>Next</PrimaryButton>
      </Form>
     </MainContainer>
  );
};

export default Step3;