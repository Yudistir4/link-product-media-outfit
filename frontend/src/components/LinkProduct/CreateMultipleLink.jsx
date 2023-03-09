import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { createLink } from '../../services/Link';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';

const FORM_VALIDATION = Yup.object().shape({
  number: Yup.number('Harus nomor').required('Wajib diisi'),
  text: Yup.string().required('Wajib diisi'),
  originUrl: Yup.string().required('Wajib diisi'),
});

const defaultValues = {
  number: '',
  text: '',
  originUrl: '',
};

const CreateMultipleLink = ({ id, username }) => {
  const queryClient = useQueryClient();
  const [nextUrutan, setNextUrutan] = useState();
  const toast = useToast();

  useEffect(() => {
    setTimeout(() => {
      let next =
        queryClient.getQueryData(['get-links', id])?.pages[0].data?.docs[0]
          ?.number + 1;
      console.log(next);
      setValue('number', isNaN(next) ? 1 : next);
      setNextUrutan(isNaN(next) ? 1 : next);
    }, 500);
  }, [id]);

  // const nextUrutan =
  //   queryClient.getQueryData(["get-links"])?.pages[0].data?.docs[0]?.number + 1;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(FORM_VALIDATION),
    defaultValues,
  });

  const { mutate, isLoading } = createLink(() => {
    reset({ ...defaultValues, number: nextUrutan + 1 });
    setNextUrutan((prev) => prev + 1);
  });

  const submit = (data) => {
    console.log(data);
    let splitLinks = data.originUrl.split('\n');
    let splitText = data.text.split('\n');
    splitText = splitText.map((text) => {
      return text
        .substring(0, text.lastIndexOf(' '))
        .substring(text.indexOf('.') + 1)
        .trim();
    });
    data = {
      tags: [username, `${data.number}`],
      account: id,
      number: data.number,
      links: splitLinks.map((link, i) => ({
        number: i + 1,
        name: splitText[i],
        link,
      })),
    };
    if (!username) {
      toast({ title: 'Username Wajib Ada', status: 'error' });
      return;
    }
    mutate(data);
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="justify-center flex flex-col gap-3 p-3 border rounded-md"
    >
      <h2 className="text-center font-semibold">Multi Link</h2>
      {/* <Input size="sm" placeholder="Number" {...register("number")} /> */}
      <FormControl isInvalid={errors.number} isDisabled={isSubmitting}>
        <Input
          id="namaFakultas"
          type="number"
          className="text-center"
          placeholder="Number"
          {...register('number')}
        />
        <FormErrorMessage>
          {errors.number && errors.number.message}
        </FormErrorMessage>
      </FormControl>
      <div className="flex gap-3">
        <FormControl isInvalid={errors.text} isDisabled={isSubmitting}>
          <Textarea
            {...register('text')}
            // value={value}
            // onChange={handleInputChange}
            placeholder="Text"
            size="sm"
          />
          <FormErrorMessage>
            {errors.text && errors.text.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.originUrl} isDisabled={isSubmitting}>
          <Textarea
            {...register('originUrl')}
            // value={value}
            // onChange={handleInputChange}
            placeholder="Link"
            size="sm"
          />
          <FormErrorMessage>
            {errors.originUrl && errors.originUrl.message}
          </FormErrorMessage>
        </FormControl>
      </div>
      <div className="flex gap-3">
        <Button
          type="submit"
          size="sm"
          className="w-full"
          colorScheme="blue"
          variant="solid"
          isLoading={isLoading}
        >
          Submit
        </Button>
        <Button
          type="button"
          onClick={() => reset(defaultValues)}
          size="sm"
          className="w-full"
          colorScheme="red"
          variant="solid"
        >
          Reset
        </Button>
      </div>
    </form>
  );
};

export default CreateMultipleLink;
