import { FormControlLabel, Typography } from '@material-ui/core';
import React from 'react';
import Form from './Form';
import MainContainer from './MainContainer';
import Input from './Input';
import PrimaryButton from './PrimaryButton';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { useData } from '../context/DataContext'

const schema = yup.object().shape({
  email: yup.string().email('Email Adress is not valid').required('Email Adress is required field'),
})
const normalizePhone = number => {
  const phoneNumber = parsePhoneNumberFromString(number);
  if(!phoneNumber){
    return number
  }

  return  phoneNumber.formatInternational()
}

const Step2 = () => {

  const { data, setValues } = useData()

  const history = useHistory();


  const {register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {email: data.email, hasPhone: data.hasPhone, phoneNumber: data.phoneNumber},
    mode: 'onBlur',
    resolver: yupResolver(schema)
    
  });

  const hasPhone = watch("hasPhone")

  const onSubmit = data => {
    setValues(data);
    history.push('/step3')
    
  }
  return (
    <MainContainer>
      <Typography component='h2' variant='h5'>
        Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input 
          {...register('email' , { required: true })} 
          id='email' 
          name='email' 
          type='email' 
          label='Email'
          error={!!errors.email}
          helperText={errors?.email?.message}
          required
        />

        <FormControlLabel control={
          <input type='checkbox' defaultValue={data.hasPhone} defaultChecked={data.hasPhone} name='hasPhone' {...register('hasPhone')} color='primary' />
        } label='Do you have a phone?' />

        {
          hasPhone && 
            <Input 
              {...register('phoneNumber')} 
              type='tel'  
              id='phoneNumber' 
              label='Phone Number' 
              name='phoneNumber'
              onChange={ event => {
                event.target.value = normalizePhone(event.target.value)
              }}
            />
        }
        
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step2;