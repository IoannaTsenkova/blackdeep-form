import { Box, Heading, Steps } from "@chakra-ui/react";
import StepOneForm from "./step-one-form";
import StepTwoForm from "./step-two-form";
import { FormProvider, useForm } from "react-hook-form";
import { fullSchema } from "@/schemas/form-schema";
import type { z } from "zod";

type FormData = z.infer<typeof fullSchema>;

const RegistrationForm = () => {
  const form = useForm<FormData>({
    defaultValues: {
      fullName: "",
      password: "",
      confirmPassword: "",
      interests: [],
      avatar: undefined,
    },
  });

  const { getValues, setError } = form;

  const onFormSubmit = async () => {
    const data = getValues();
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("interests", JSON.stringify(data.interests));
    if (data.avatar instanceof File) {
      formData.append("avatar", data.avatar);
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      await response.json();
    } catch (err: unknown) {
      console.log("Submission error:", err);
      setError("avatar", {
        type: "manual",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <Heading as="h1" size="lg" mb={2} textTransform={"uppercase"}>
        welcome!
      </Heading>
      <Heading as="h2" size="md" mb={10}>
        Please fill out the form to join our community!
      </Heading>
      <Steps.Root defaultStep={0} count={2}>
        <Steps.List width={"30%"} display={"flex"} alignSelf={"center"}>
          <Steps.Item key={0} index={0} title={"Step 1"}>
            <Steps.Indicator
              backgroundColor={"#822659"}
              borderColor={"#F487B6"}
            />
            <Steps.Title>Step 1</Steps.Title>
            <Steps.Separator />
          </Steps.Item>
          <Steps.Item key={1} index={1} title={"Step 2"}>
            <Steps.Indicator
              backgroundColor={"#822659"}
              borderColor={"#F487B6"}
            />
            <Steps.Title>Step 2</Steps.Title>
            <Steps.Separator />
          </Steps.Item>
        </Steps.List>
        <Steps.Content key={0} index={0}>
          <Box as={"div"} justifyContent={"center"} display={"flex"}>
            <StepOneForm />
          </Box>
        </Steps.Content>
        <Steps.Content key={1} index={1}>
          <Box as={"div"} justifyContent={"center"} display={"flex"}>
            <StepTwoForm onFormSubmit={onFormSubmit} />
          </Box>
        </Steps.Content>

        <Steps.CompletedContent>Thanks for joining us!</Steps.CompletedContent>
      </Steps.Root>
    </FormProvider>
  );
};

export default RegistrationForm;
