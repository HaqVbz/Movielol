import { Button, useColorMode } from '@chakra-ui/react'

function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button onClick={toggleColorMode} colorScheme="blue">
      {colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>
  )
}

export default ToggleTheme
