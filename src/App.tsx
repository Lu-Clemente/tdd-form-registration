import { Box, Button, Center, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Box
      p={15} h="100vh" w="100vw"
      bgColor="blackAlpha.200"
      display="grid"
      placeItems="center"
    >
      <Stack
        p={15} margin="auto"
        w={["95%", "90%", "70%", "60%"]} h="80%"
        bgColor="#fff" shadow="md"
        borderRadius={5}
        justifyContent="space-around"
      >

        <Text
          aria-label="registration" alignSelf="center"
          fontSize={25}
        >
          Registration
        </Text>

        <FormControl isRequired >

          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input
            type="email"
            aria-label="input-email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            marginBottom={5}
          />

          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input
            type="password"
            name="password"
            role="password-input"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            marginBottom={5}
          />

          <FormLabel htmlFor='confirmPassword'>Confirm password</FormLabel>
          <Input
            type="password"
            name="confirmPassword"
            role="confirm-password-input"
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
            marginBottom={25}
          />

          <Center>
            <Button
              type="submit"
              aria-label="submit"
              colorScheme="green"
              cursor="pointer"
              w="80%" alignSelf="center"
            >
              Submit
            </Button>
          </Center>
        </FormControl>

      </Stack>
    </Box>
  );
}

export default App;
