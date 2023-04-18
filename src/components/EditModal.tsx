import {
  Button,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import { useCallback } from "react";
import { RegistrationSchema } from "../helpers/schema";

import { QuestionProps } from "../store/types";
import { EDIT_QUESTION } from "../helpers/queries";

function EditModal({
  data,
  onClose,
  refetch,
}: {
  data: QuestionProps;
  onClose: () => void;
  refetch: () => void;
}) {
  const toast = useToast();
  const [editQuestion] = useMutation(EDIT_QUESTION);

  const onEdit = useCallback(
    async (payload: { name: string; description: string }) => {
      await editQuestion({
        variables: { questionInput: payload, id: data._id },
      })
        .then(() => {
          toast({
            title: "Question updated.",
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
    [editQuestion, toast, data._id]
  );

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Question</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              name: data.name || "",
              description: data.description || "",
            }}
            validationSchema={RegistrationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              await onEdit(values)
                .then(() => {
                  setSubmitting(false);
                  resetForm();
                  refetch();
                  onClose();
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
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
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
                      <Textarea
                        rows={10}
                        {...field}
                        placeholder="Question..."
                      />
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button
                  isLoading={isSubmitting}
                  mt={4}
                  colorScheme="teal"
                  type="submit"
                >
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default EditModal;
