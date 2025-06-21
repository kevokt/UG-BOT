import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  Field,
  Input,
  Button,
  Icon,
  useBreakpointValue,
  Fieldset,
} from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";
import { Toaster, toaster } from "@/components/ui/toaster";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Registering a new user
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:3000/api/auth/register", { username, password })
  //     .then((result) => {
  //       console.log(result);
  //       toaster.create({
  //         title: "Registration Successful!",
  //         type: "success",
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // };

  // Login a new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3000/api/auth/login", {
        username,
        password,
      });

      if (result.data.status === "Success") {
        localStorage.setItem("token", result.data.token);
        toaster.create({
          title: "Login Successful!",
          type: "success",
        });
        navigate("/admin");
      }
    } catch (err) {
      console.log(err);
      toaster.create({
        title: err.response?.data || "Login failed",
        type: "error",
      });
    }
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.100", "gray.800")}
      >
        <form onSubmit={handleSubmit}>
          <Fieldset.Root spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Fieldset.Legend
                fontSize={"4xl"}
                textAlign={"center"}
                fontWeight={"bold"}
              >
                UG-Bot Admin Login
              </Fieldset.Legend>

              <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={useColorModeValue("2xl", "none")}
                p={8}
                mt={8}
              >
                <Stack spacing={4}>
                  <Field.Root>
                    <Field.Label>Username</Field.Label>
                    <Input
                      placeholder="Enter Username"
                      name="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Field.Root>

                  <Field.Root mb={4}>
                    <Field.Label>Password</Field.Label>
                    <Input
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Field.Root>

                  <Button
                    type="submit"
                    variant={useColorModeValue("surface", "solid")}
                    colorPalette={"purple"}
                    // onClick={toaster.create({
                    //   title: "Toast Title",
                    // })}
                  >
                    Login
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Fieldset.Root>
        </form>
      </Flex>

      <Box position="fixed" bottom={12} right={12} zIndex={10}>
        <ColorModeButton size="100%" />
      </Box>
    </>
  );
};

export default Login;
