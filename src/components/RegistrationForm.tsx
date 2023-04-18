import {
  Box,
  Button,
  Input,
  Text,
  Textarea,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import { useCallback } from "react";

import { RegistrationSchema } from "../helpers/schema";
import { ADD_QUESTION } from "../helpers/queries";

function RegistrationForm() {
  const [addQuestion] = useMutation(ADD_QUESTION);
  const toast = useToast();

  const onRegister = useCallback(
    async (payload: { name: string; description: string }) => {
      await addQuestion({ variables: { questionInput: payload } })
        .then(() => {
          toast({
            title: "Question added.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch(() => {
          toast({
            title: "Something went wrong.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    },
    [addQuestion, toast]
  );

  return (
    <Box boxShadow="md" borderRadius="md" px="4" py="2">
      <Text mb="4" fontWeight="bold" fontSize="lg">
        Ask Question
      </Text>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        validationSchema={RegistrationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await onRegister(values)
            .then(() => {
              setSubmitting(false);
              resetForm();
            })
            .catch(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="name">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <Input mb="4" {...field} placeholder="Your Name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="description">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.description && form.touched.description
                  }
                >
                  <Textarea rows={10} {...field} placeholder="Question..." />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              isLoading={isSubmitting}
              mt={4}
              colorScheme="teal"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default RegistrationForm;
