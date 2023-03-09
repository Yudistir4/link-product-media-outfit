import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { login } from '../services/User';

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email().required('Wajib diisi'),
  password: Yup.string().required('Wajib diisi'),
});
const Login = () => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(FORM_VALIDATION),
    defaultValues: { email: '', password: '' },
  });
  const { mutate, isLoading, error } = login();
  const submit = (data) => {
    console.log(data);
    mutate(data);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form
        onSubmit={handleSubmit(submit)}
        className="max-w-sm border-2  rounded-lg p-5 flex flex-col gap-3"
      >
        {error && (
          <div className="text-center text-sm text-red-500">{error}</div>
        )}
        <FormControl isInvalid={errors.email}>
          <FormLabel>Email address</FormLabel>
          <Input type="email" placeholder="Email" {...register('email')} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          className="w-full"
          colorScheme="blue"
          variant="solid"
          isLoading={isLoading}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
