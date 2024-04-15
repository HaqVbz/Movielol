import {
  Box,
  Container,
  Flex,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  Avatar,
  Text,
  TagLabel,
  Tag,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  useDisclosure,
  DrawerBody,
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import ToggleTheme from './ToggleTheme'
import { HamburgerIcon, Search2Icon, SearchIcon } from '@chakra-ui/icons'
import { useAuth } from '../context/useAuth'
import Lottie from 'lottie-react'
import mvlol from '../images/mvlol.json'

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth()
  const { onOpen, isOpen, onClose } = useDisclosure()

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle()
      console.log('success')
    } catch (error) {
      console.log('err', error)
    }
  }
  return (
    <Box py="4" mb="2">
      <Container maxW={'container.xl'}>
        <Flex justifyContent={'space-between'}>
          <Link to="/">
            <Box
              fontSize={'3xl'}
              fontWeight={'bold'}
              color={'purple.800'}
              letterSpacing={'widest'}
            >
              <Lottie animationData={mvlol} />
            </Box>
          </Link>

          {/* Desktop */}
          <Flex
            gap="2"
            justifyContent={'center'}
            alignItems="center"
            display={{ base: 'none', md: 'flex' }}
          >
            <Button>
              <Link to={'/'}>Home</Link>
            </Button>
            <Button>
              <Link to={'/movies'}>Movies</Link>
            </Button>
            <Button>
              <Link to={'/shows'}>TV Shows</Link>
            </Button>
            <Button>
              <Link to={'/watchlist'}>Bookmark</Link>
            </Button>
            <Button>
              <Link to={'/about'}>Movielol.biz</Link>
            </Button>
            <ToggleTheme />
          </Flex>
          <Flex
            gap="4"
            alignItems="center"
            display={{ base: 'none', md: 'flex' }}
          >
            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    size={'sm'}
                    color={'white'}
                    name={user?.email}
                    src={user?.photoURL}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={logout}>Log Out</MenuItem>
                </MenuList>
              </Menu>
            )}
            {!user && (
              <Avatar
                size={'sm'}
                bg={'gray.800'}
                as="button"
                onClick={handleGoogleLogin}
              />
            )}
            <Button>
              <Link to="/search">
                <SearchIcon fontSize={'xl'} />
              </Link>
            </Button>
          </Flex>

          {/* Mobile */}
          <Flex
            display={{ base: 'flex', md: 'none' }}
            alignItems={'center'}
            gap="2"
          >
            <Button>
              <Link to="/search">
                <SearchIcon fontSize={'xl'} />
              </Link>
            </Button>
            <IconButton onClick={onOpen} icon={<HamburgerIcon />} />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bg={'gray.800'}>
                <DrawerCloseButton />
                <DrawerHeader>
                  {user ? (
                    <Flex alignItems="center" gap="2">
                      <Avatar
                        size={'sm'}
                        name={user?.email}
                        src={user?.photoURL}
                      />
                      <Box fontSize={'sm'}>
                        {user?.displayName || user?.email}
                      </Box>
                    </Flex>
                  ) : (
                    <Avatar
                      size={'sm'}
                      bg="gray.800"
                      as="button"
                      onClick={handleGoogleLogin}
                    />
                  )}
                </DrawerHeader>
                <DrawerBody>
                  <Flex flexDirection={'column'} gap={'4'} onClick={onClose}>
                    <Link to="/">Home</Link>
                    <Link to="/movies">Movies</Link>
                    <Link to="/shows">TV Shows</Link>
                    {user && (
                      <>
                        <Link to="/watchlist">Bookmark</Link>
                        <Button
                          variant={'solid'}
                          colorScheme="red"
                          onClick={logout}
                        >
                          Logout
                        </Button>
                      </>
                    )}
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar
