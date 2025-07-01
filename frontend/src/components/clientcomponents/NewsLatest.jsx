import React from "react";
import {
  Box,
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useColorModeValue } from "@/components/ui/color-mode";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <Box h={"90vh"} maxH={"800px"} position="relative">
      <Text>Latest News</Text>
    </Box>
  );
};

export default Hero;
