import { useEffect, useState } from "react";
import { Box, Button, Input, VStack, useStepsContext } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Controller, useFormContext } from "react-hook-form";
import { stepOneSchema } from "../schemas/step-one-schema";
import { z } from "zod";
import Select from "react-select";
import { interestsCustomStyles } from "../styles/interests-input-styles";

type FormData = z.infer<typeof stepOneSchema>;

const StepOneForm = () => {
  const [interestsOptions, setInterestsOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const form = useFormContext<FormData>();
  const { hasNextStep, goToNextStep } = useStepsContext();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    fetch("/api/interests")
      .then((res) => res.json())
      .then((data) =>
        setInterestsOptions(
          data.map((interest: string) => ({ label: interest, value: interest }))
        )
      )
      .catch(console.error);
  }, []);

  const onSubmit = () => {
    console.log("✅ Step 1 submitted with:", form.getValues());
    if (hasNextStep) {
      goToNextStep();
    }
  };


  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      width={"75%"}
      p={7}
      borderWidth={1}
      borderRadius="lg"
      shadow="2px 2px 1px 1px #822659"
    >
      <VStack align="stretch">
        <FormControl isInvalid={!!errors.fullName}>
          <FormLabel>Full Name</FormLabel>
          <Input {...register("fullName")} variant={"subtle"} />
          <FormErrorMessage color={"#822659"}>
            {errors.fullName?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register("password")} variant={"subtle"} />
          <FormErrorMessage color={"#822659"}>
            {errors.password?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            {...register("confirmPassword")}
            variant={"subtle"}
          />
          <FormErrorMessage color={"#822659"}>
            {errors.confirmPassword?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.interests}>
          <FormLabel>Interests</FormLabel>
          <Controller
            control={control}
            name="interests"
            rules={{
              required: "Please choose at least 1 interest",
              validate: (value) =>
                value.length <= 2 || "You can choose up to 2 interests",
            }}
            render={({ field }) => (
              <Select
                isMulti
                value={interestsOptions.filter((option) =>
                  field.value.includes(option.value)
                )}
                onChange={(selectedOptions) => {
                  const selected = selectedOptions.map(
                    (option) => option.value
                  );
                  field.onChange(selected);
                }}
                //isOptionDisabled={() => field.value.length >= 2}
                options={interestsOptions}
                styles={interestsCustomStyles}
              />
            )}
          />
          <FormErrorMessage color={"#822659"}>
            {errors.interests?.message}
          </FormErrorMessage>
        </FormControl>
      </VStack>
      <Button
        mt={6}
        type="submit"
        width="30%"
        bg="#822659"
        color="white"
        _hover={{ bg: "#F487B6" }}
       // onClick={() => handleSubmit(onSubmit)()}
      >
        Next Step
      </Button>
    </Box>
  );
};

export default StepOneForm;
