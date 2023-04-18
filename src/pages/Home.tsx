import { useEffect } from "react";

import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  Spinner,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCompanyInfo } from "../store/actions";
import { useIsMobile } from "../helpers/useIsMobile";
import RegistrationForm from "../components/RegistrationForm";

function Home() {
  const dispatch = useAppDispatch();
  const { isMobile } = useIsMobile();
  const { company, isLoading } = useAppSelector((state) => state.space);

  useEffect(() => {
    if (!company) {
      dispatch(fetchCompanyInfo());
    }
  }, [dispatch, company]);

  if (isLoading)
    return (
      <Flex
        h="80vh"
        data-testid="spinner-wrapper"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Flex>
    );

  if (!company) return null;

  return (
    <Box px="16" py="8" data-testid="spaceinfo-wrapper">
      <SimpleGrid columns={isMobile ? 1 : 2} gap={4}>
        <Box>
          <Heading>{company.name}</Heading>
          <Text my="4">{company.summary}</Text>
          <HStack>
            <VStack alignItems="left">
              <Text fontWeight="semibold">CEO</Text>
              <Text fontWeight="semibold">Founded</Text>
              <Text fontWeight="semibold">Founder</Text>
              <Text fontWeight="semibold">Employees</Text>
              <Text fontWeight="semibold">Headquarters</Text>
              <Text fontWeight="semibold">Launch Sites</Text>
              <Text fontWeight="semibold">Valuation</Text>
            </VStack>
            <VStack alignItems="left">
              <Text fontWeight="bold">:</Text>
              <Text fontWeight="bold">:</Text>
              <Text fontWeight="bold">:</Text>
              <Text fontWeight="bold">:</Text>
              <Text fontWeight="bold">:</Text>
              <Text fontWeight="bold">:</Text>
              <Text fontWeight="bold">:</Text>
            </VStack>
            <VStack alignItems="left" ml="4">
              <Text>{company.ceo}</Text>
              <Text>{company.founded}</Text>
              <Text>{company.founder}</Text>
              <Text>{company.employees}</Text>
              <Text>{`${company.headquarters.city}, ${company.headquarters.state}`}</Text>
              <Text>{company.launch_sites}</Text>
              <Text>{`${company.valuation} $`}</Text>
            </VStack>
          </HStack>
        </Box>
        <RegistrationForm />
      </SimpleGrid>
    </Box>
  );
}

export default Home;
