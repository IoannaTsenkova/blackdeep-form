import { useState } from 'react';
import { Box, Button, FileUpload, Icon, Image, VStack } from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage
} from '@chakra-ui/form-control';
import { useFormContext } from 'react-hook-form';
import type { stepTwoSchema } from '@/schemas/step-two-schema';
import type { z } from 'zod';
import { LuUpload } from 'react-icons/lu';

type FormData = z.infer<typeof stepTwoSchema>;

const StepTwoForm = ({ onSubmit }: { onSubmit: () => void }) => {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useFormContext<FormData>();

    const [preview, setPreview] = useState<string | null>(null);

    //const avatar = watch('avatar');

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            setPreview(null);
            return;
        }

        if (!file.type.startsWith('image/')) {
            setError('avatar', {
                type: 'manual',
                message: 'File must be an image.',
            });
            setPreview(null);
            return;
        }

        clearErrors('avatar');
        setPreview(URL.createObjectURL(file));
    };

    const onFormSubmit = (data: FormData) => {
        console.log('✅ Step 2 submitted with:', data);
        onSubmit();
    };

    return (
        <Box
            as="form"
            onSubmit={handleSubmit(onFormSubmit)}
            width="75%"
            p={7}
            borderWidth={1}
            borderRadius="lg"
            shadow="2px 2px 1px 1px #822659"
        >
            <VStack align="stretch">
                <FormControl isInvalid={!!errors.avatar}>
                    <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={1}>
                        <FileUpload.HiddenInput />
                        <FileUpload.Dropzone>
                            <Icon size="md" color="fg.muted">
                                <LuUpload />
                            </Icon>
                            <FileUpload.DropzoneContent>
                                <Box>Upload your avatar here</Box>
                                <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                            </FileUpload.DropzoneContent>
                        </FileUpload.Dropzone>
                        <FileUpload.List />
                    </FileUpload.Root>
                    <FormErrorMessage>{errors.avatar?.message as string}</FormErrorMessage>
                </FormControl>

                {preview && (
                    <Image
                        src={preview}
                        alt="Avatar Preview"
                        boxSize="120px"
                        borderRadius="full"
                        objectFit="cover"
                        mx="auto"
                    />
                )}
                <Button
                    type="submit"
                    width="100%"
                    bg="#822659"
                    color="white"
                    _hover={{ bg: '#F487B6' }}
                >
                    Submit
                </Button>
            </VStack>
        </Box>
    );
};

export default StepTwoForm;
