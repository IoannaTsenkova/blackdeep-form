import { useRef, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  FileUpload,
  Flex,
  Icon,
  Image,
  useStepsContext,
  VStack,
} from "@chakra-ui/react";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { useFormContext } from "react-hook-form";
import { stepTwoSchema } from "@/schemas/step-two-schema";
import type { z } from "zod";
import { LuUpload } from "react-icons/lu";

type FormData = z.infer<typeof stepTwoSchema>;

const StepTwoForm = ({ onFormSubmit }: { onFormSubmit: () => void }) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext<FormData>();
  const { goToNextStep } = useStepsContext();

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async () => {
    const data = getValues();
    const result = stepTwoSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      (Object.keys(fieldErrors) as (keyof typeof fieldErrors)[]).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: fieldErrors[key]?.[0] || "Invalid",
          });
        }
      );
      return;
    }

    onFormSubmit();
    goToNextStep();
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      width="75%"
      p={7}
      borderWidth={1}
      borderRadius="lg"
      shadow="2px 2px 1px 1px #822659"
    >
      <VStack align="stretch">
        <Flex justify="center" align="center" minH="300px">
          <FormControl isInvalid={!!errors.avatar} width={"70%"}>
            <FileUpload.Root alignItems="stretch" maxFiles={1}>
              {preview ? (
                <>
                  <Image
                    src={preview}
                    alt="Avatar Preview"
                    boxSize="180px"
                    borderRadius="full"
                    objectFit="cover"
                    mx="auto"
                  />
                  <FileUpload.List />
                </>
              ) : (
                <>
                  <FileUpload.HiddenInput
                    {...register("avatar")}
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) {
                        setValue("avatar", undefined, { shouldValidate: true });
                        setPreview(null);
                        return;
                      }
                      if (!file.type.startsWith("image/")) {
                        setError("avatar", {
                          type: "manual",
                          message: "File must be an image.",
                        });
                        setPreview(null);
                        return;
                      }
                      clearErrors("avatar");
                      setValue("avatar", file, { shouldValidate: true });
                      setPreview(URL.createObjectURL(file));
                    }}
                  />
                  <FileUpload.Dropzone>
                    <Icon size="md" color="fg.muted">
                      <LuUpload />
                    </Icon>
                    <FileUpload.DropzoneContent>
                      <Box>Upload your avatar here</Box>
                      <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                    </FileUpload.DropzoneContent>
                  </FileUpload.Dropzone>
                </>
              )}
            </FileUpload.Root>
            <FormErrorMessage color={"#822659"}>
              {errors.avatar?.message as string}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <ButtonGroup justifyContent={"center"} display={"flex"}>
          {preview && (
            <Button
              bg="#822659"
              width={"30%"}
              color="white"
              _hover={{ bg: "#F487B6" }}
              onClick={() => {
                setValue("avatar", undefined, { shouldValidate: true });
                setPreview(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              Change photo
            </Button>
          )}
          <Button
            type="submit"
            width="30%"
            bg="#822659"
            color="white"
            _hover={{ bg: "#F487B6" }}
          >
            Submit
          </Button>
        </ButtonGroup>
      </VStack>
    </Box>
  );
};

export default StepTwoForm;
