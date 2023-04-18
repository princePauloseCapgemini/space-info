import { Fragment, memo } from "react";

import { Box, Image, Tag, Text } from "@chakra-ui/react";

import { SpaceShipProps } from "../store/types";

interface ShipCardProps {
  data: SpaceShipProps;
}

function ShipCard({ data }: ShipCardProps) {
  return (
    <Fragment>
      <Image src={data.image} w="100%" h="220px" objectFit="cover" />
      <Box p="4">
        <Text fontWeight="bold">{data.name}</Text>
        <Text
          fontSize="sm"
          fontWeight="semibold"
        >{`Home Port: ${data.home_port}`}</Text>
        <Text fontSize="sm">
          {data.active ? "Currently Active" : "Currently not active"}
        </Text>
        <Box my="4">
          {data.roles?.map((role, index) => (
            <Tag key={`${role}-${index}`} px="4" ml={index === 0 ? "0" : "4"}>
              {role}
            </Tag>
          ))}
        </Box>
      </Box>
    </Fragment>
  );
}

export default memo(ShipCard);
