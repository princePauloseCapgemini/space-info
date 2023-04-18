import { useState } from "react";

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useQuery, useMutation } from "@apollo/client";

import { DELETE_QUESTION, GET_QUESTIONS } from "../helpers/queries";
import { QuestionProps } from "../store/types";
import EditModal from "../components/EditModal";

function Questions() {
  const [editInfo, setEditInfo] = useState<QuestionProps | null>(null);

  const { loading, refetch, data } = useQuery(GET_QUESTIONS, {
    variables: { amount: 10 },
  });

  const toast = useToast();

  const [deleteQuestion] = useMutation(DELETE_QUESTION);

  if (loading)
    return (
      <Flex h="80vh" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    );

  if (!data?.getQuestions?.length)
    return (
      <Flex h="80vh" justifyContent="center" alignItems="center">
        <Text>Empty</Text>
      </Flex>
    );

  return (
    <Box px="16" py="8">
      <HStack justifyContent="space-between">
        <Heading>Questions</Heading>
        <Button onClick={() => refetch()}>Refresh</Button>
      </HStack>
      <SimpleGrid my="8" minChildWidth="320px" spacing="40px">
        {data.getQuestions?.map((item: QuestionProps) => (
          <Box boxShadow="md" p="4" key={item._id}>
            <Text fontWeight="semibold">{item.name}</Text>
            <Text fontSize="sm">{item.description}</Text>
            <Text fontSize="xs">{new Date(item.createdAt).toDateString()}</Text>
            <Flex w="100%" mt="4" justifyContent="flex-end">
              <Button
                variant="ghost"
                size="xs"
                mr="4"
                onClick={() => setEditInfo(item)}
              >
                Edit
              </Button>
              <Button
                colorScheme="red"
                size="xs"
                onClick={() => {
                  deleteQuestion({ variables: { id: item._id } })
                    .then(() => {
                      refetch();
                      toast({
                        title: "Question Deleted.",
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
                }}
              >
                Delete
              </Button>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
      {editInfo && (
        <EditModal
          data={editInfo}
          onClose={() => setEditInfo(null)}
          refetch={refetch}
        />
      )}
    </Box>
  );
}

export default Questions;
