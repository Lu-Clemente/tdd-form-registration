import {
  Box, Button, Center, FormControl,
  FormHelperText, FormLabel, HStack, Input,
  Stack, Text, useRadioGroup
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import RadioCard from './components/Radio';
import { validationEmail } from './helpers/validations';

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [personType, setPersonType] = useState("Consumer")
  const [error, setError] = useState({
    status: false,
    message: ""
  });

  const options = ['Consumer', 'Seller', 'Staff']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'person-type',
    defaultValue: 'Consumer',
    onChange: setPersonType,
    value: personType,
  });

  const group = getRootProps();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validationEmail(email)) {
      setError({
        status: true,
        message: "Invalid email"
      });
    } else if (password !== confirmPassword) {
      setError({
        status: true,
        message: "Passwords don't match"
      });
    }
  }

  const checkForErrors = () => {
    if (error.status === true) {
      if (validationEmail(email) && password === confirmPassword) {
        setError({
          status: false,
          message: ""
        })
      } else if (validationEmail(email) && password !== confirmPassword) {
        setError({
          status: true,
          message: "Passwords don't match"
        });
      }
    }
  }

  useEffect(() => {
    checkForErrors();
  }, [email, password, confirmPassword]);

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

        <FormControl isRequired>

          <FormLabel htmlFor='email'>Select your profile</FormLabel>
          <Center>
            <HStack {...group}>
              {options.map((value) => {
                const radio = getRadioProps({ value })
                return (
                  <RadioCard key={value} {...radio} >
                    {value}
                  </RadioCard>
                )
              })}
            </HStack>
          </Center>

          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input
            type="email"
            aria-label="input-email"
            value={email}
            isInvalid={error.message === "Invalid email" ? true : false}
            onChange={(e: any) => setEmail(e.target.value)}
          />

          <FormHelperText marginBottom={5}>
            We only use your email for validation proposes.
          </FormHelperText>

          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input
            type="password"
            name="password"
            role="password-input"
            value={password}
            isInvalid={error.message === "Passwords don't match" ? true : false}
            onChange={(e: any) => setPassword(e.target.value)}
            marginBottom={5}
          />

          <FormLabel htmlFor='confirmPassword'>Confirm password</FormLabel>
          <Input
            type="password"
            name="confirmPassword"
            role="confirm-password-input"
            value={confirmPassword}
            isInvalid={error.message === "Passwords don't match" ? true : false}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
            marginBottom={25}
          />

          {error.status === true &&
            <Box bgColor="blackAlpha.200" p={1} marginBottom={5} borderRadius={5}>
              <Text
                role="note"
                aria-label="error-warning"
                color="red" fontWeight="600" fontSize={15}
              >
                {error.message}
              </Text>
            </Box>
          }

          <Center>
            <Button
              disabled={(!email || !password || !confirmPassword) ? true : false}
              type="submit"
              onClick={handleSubmit}
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
