import { Box, useRadio } from "@chakra-ui/react";
import React from "react";

function RadioCard(props: any) {
    const { getInputProps, getCheckboxProps, state } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getCheckboxProps()
    return (
      <Box as='label'>
        <input {...input} checked={state.isChecked} />
        <Box
          {...checkbox}
          data-testid="check-input"
          aria-label="check-input"
          cursor='pointer'
          borderWidth='1px'
          borderRadius='md'
          boxShadow='md'
          _checked={{
            bg: 'green.500',
            color: 'white',
            borderColor: 'green.500',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={5}
          py={3}
        >
          {props.children}
        </Box>
      </Box>
    )
  }

  export default RadioCard;