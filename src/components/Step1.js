import { Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from './Form';
import Input from './Input';
import MainContainer from './MainContainer';
import PrimaryButton from './PrimaryButton';
import { useHistory } from 'react-router';
import {useData} from '../context/DataContext';

const schema = yup.object().shape({
  firstName: yup.string().matches(/^([^0-9]*)$/, 'First Name should not contains numbers').required('First Name is required field'),
  lastName: yup.string().matches(/^([^0-9]*)$/, 'Last Name should not contains numbers').required('Last Name is required field'),
})


const Step1 = () => {
  const { data, setValues } = useData()


  const history = useHistory();

  const {register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {firstName: data.firstName, lastName: data.lastName},
    mode: 'onBlur',
    resolver: yupResolver(schema)
    
  })

  const onSubmit = data => {
    setValues(data)
    history.push('/step2')
  }

  return (
    <MainContainer>
      <Typography component='h2' variant='h5'>
        Step 1
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input 
          {...register('firstName' , { required: true })} 
          id='firstName' 
          name='firstName' 
          type='text' 
          label='First Name'
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />
        <Input 
          {...register('lastName' , { required: true })} 
          id='lastName' 
          name='lastName' 
          type='text' 
          label='Last Name'
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
          />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step1;