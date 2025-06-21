import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { RiRobot2Line } from "react-icons/ri";

const Logo = () => {
  return (
    <Flex align="center" gap={2} color="purple.500">
      <RiRobot2Line size="24px" />
      <Text fontSize="xl" fontWeight="extrabold" fontFamily="'Exo', sans-serif">
        UG-Bot
      </Text>
    </Flex>
  );
};
export default Logo;
