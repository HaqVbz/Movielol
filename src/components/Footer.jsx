import { Box, VStack } from '@chakra-ui/react'

const Footer = () => {
  return (
    <VStack
      spacing={4}
      align="stretch"
      alignItems={'center'}
      my={'10'}
    >
      <Box h="40px" >
        <footer >
          <aside>
            <p>Copyright © Movielol - All right reserved </p>
          </aside>
        </footer>
      </Box>
    </VStack>
  )
}

export default Footer
