import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
} from '@chakra-ui/react';
import {FormControl,
  FormLabel,
  FormErrorMessage} from '@chakra-ui/form-control';
import {
  useForm,
  Controller,
  FormProvider,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema } from '../schemas/step-one-schema';
import { z } from 'zod';
import Select from 'react-select';

type FormData = z.infer<typeof step1Schema>;


const customStyles = {
  control: (provided: { label: string; value: string }) => ({
    ...provided,
    backgroundColor: '#18181B', // bg color на полето
    borderColor: 'transparent',
    height: '40px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#A0AEC0',
    },
  }),
  menu: (provided: { label: string; value: string }) => ({
    ...provided,
    backgroundColor: '#18181B', // bg color на падащото меню
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#18181B' // избрано
      : state.isFocused
      ? '#18181B' // hover
      : '#18181B', // default
    color: '#18181B',
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#18181B', // фон на избрания "таг"
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: '#822659',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: '#822659',
    ':hover': {
      backgroundColor: '#822659',
      color: 'white',
    },
  }),
};

const StepOneForm = () => {
  const [interestsOptions, setInterestsOptions] = useState<{ label: string; value: string }[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: '',
      password: '',
      confirmPassword: '',
      interests: [],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    fetch('/api/interests')
      .then((res) => res.json())
      .then((data) =>
        setInterestsOptions(data.map((interest: string) => ({ label: interest, value: interest })))
      )
      .catch(console.error);
  }, []);

  const onSubmit = (data: FormData) => {
    console.log('✅ Step 1 data:', data);
    // Тук ще извикаш родител за преминаване към Step 2
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} width={'75%'} p={7} borderWidth={1} borderRadius="lg" shadow="2px 2px 1px 1px rgba(130, 38, 89, 0.65)">
     <FormProvider {...form}>
           <VStack align="stretch">
            <FormControl isInvalid={!!errors.fullName}>
              <FormLabel>Full Name</FormLabel>
              <Input {...register('fullName')} variant={'subtle'} />
              <FormErrorMessage color={'#822659'} >{errors.fullName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Input type="password" {...register('password')} variant={'subtle'} />
              <FormErrorMessage color={'#822659'}>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" {...register('confirmPassword')} variant={'subtle'} />
              <FormErrorMessage color={'#822659'}>{errors.confirmPassword?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.interests}>
              <FormLabel>Select up to 2 interests</FormLabel>
              <Controller
                control={control}
                name="interests"
                render={({ field }) => (
                  <Select
                    isMulti
                    value={interestsOptions.filter((option) =>
                      field.value.includes(option.value)
                    )}
                    onChange={(selectedOptions) => {
                      const selected = selectedOptions.map((option) => option.value);
                      if (selected.length <= 2) {
                        field.onChange(selected);
                      }
                    }}
                    options={interestsOptions}
                    styles={customStyles}
                    
                  />
                )}
              />
              <FormErrorMessage color={'#822659'}>{errors.interests?.message}</FormErrorMessage>
            </FormControl>
          </VStack>

          {/* Бутон */}
          <Button mt={6} type="submit" width="100%" bg="rgba(130, 38, 89, 0.65)" color="white" _hover={{ bg: '#822659' }} onClick={handleSubmit(onSubmit)}>
            Next Step
          </Button>
    
      </FormProvider>
    </Box>
  );
};

export default StepOneForm;
