import { useEffect } from "react";

import { Box, Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchShipsInfo } from "../store/actions";
import ShipCard from "../components/ShipCard";
import { SpaceShipProps } from "../store/types";

function Ships() {
  const dispatch = useAppDispatch();
  const { ships, isLoading } = useAppSelector((state) => state.space);

  useEffect(() => {
    if (!ships) {
      dispatch(fetchShipsInfo());
    }
  }, [dispatch, ships]);

  if (isLoading)
    return (
      <Flex h="80vh" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    );

  if (!ships) return null;

  return (
    <Box px="16" py="8">
      <Heading>Ships</Heading>
      <SimpleGrid my="8" minChildWidth="320px" spacing="40px">
        {ships.map((item: SpaceShipProps, index: number) =>
          item.image ? (
            <Box boxShadow="md" key={`ship-${index}`}>
              <ShipCard data={item} />
            </Box>
          ) : null
        )}
      </SimpleGrid>
    </Box>
  );
}

export default Ships;
