import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  useToast,
  Text,
  Stack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  fetchCredits,
  fetchDetails,
  fetchVideos,
  imagePath,
  imagePathOriginal,
} from '../services/api'
import {
  CalendarIcon,
  CheckCircleIcon,
  SmallAddIcon,
  TimeIcon,
} from '@chakra-ui/icons'
import {
  minutesTohours,
  ratingtoPercentage,
  resolveRatingColor,
} from '../utils/helpers'
import { useAuth } from '../context/useAuth'
import VideoComponent from '../components/VideoComponent'
import { useFirestore } from '../services/firestore'

const DetailsPage = () => {
  const router = useParams()
  const { type, id } = router

  const { user } = useAuth()
  const { addToWatchlist, checkIfInWatchlist, removeFromWatchlist } =
    useFirestore()
  const toast = useToast()

  const [details, setDetails] = useState({})
  const [cast, setCast] = useState([])
  const [video, setVideo] = useState([null])
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  // useEffect(() => {
  // fetchDetails(type, id)
  // .then((res) => {
  // console.log(res, 'res')
  // setDetails(res)
  // })
  // .catch((err) => {
  //   console.log(err, 'err')
  // })
  // .finally(() => {
  //  setLoading(false)
  // })
  // }, [type, id])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsData, creditsData, videosData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
          fetchVideos(type, id),
        ])

        // Set details
        setDetails(detailsData)

        // Set cast
        setCast(creditsData?.cast?.slice(0, 10))

        // Set videos
        const video = videosData?.results?.find(
          (video) => video?.type === 'Trailer'
        )
        setVideo(video)
        const videos = videosData?.results
          ?.filter((video) => video?.type !== 'Trailer')
          ?.slice(0, 10)
        setVideos(videos)
      } catch (error) {
        console.log(error, 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [type, id])

  console.log(video, videos, 'videos')

  const handleSaveToWatchlist = async () => {
    if (!user) {
      toast({
        title: 'Login to add to watchlist',
        status: 'error',
        isClosable: true,
      })
      return
    }

    const data = {
      id: details?.id,
      title: details?.title || details?.name,
      type: type,
      poster_path: details?.poster_path,
      release_date: details?.release_date || details?.first_air_date,
      vote_average: details?.vote_average,
      overview: details?.overview,
    }

    // console.log(data, 'data')

    // addDocument('watchlist', data)
    const dataId = details?.id?.toString()
    await addToWatchlist(user?.uid, dataId, data)
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, dataId)
    setIsInWatchlist(isSetToWatchlist)
  }

  useEffect(() => {
    if (!user) {
      setIsInWatchlist(false)
      return
    }

    checkIfInWatchlist(user?.uid, id).then((data) => {
      setIsInWatchlist(data)
    })
  }, [id, user, checkIfInWatchlist])

  const handleRemoveFromWatchlist = async () => {
    await removeFromWatchlist(user?.uid, id)
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, id)
    setIsInWatchlist(isSetToWatchlist)
  }

  if (loading) {
    return (
      <Flex justify={'center'}>
        <Spinner size={'xl'} color="purple.900" />
      </Flex>
    )
  }

  const title = details?.title || details?.name
  const releaseDate =
    type === 'tv' ? details?.first_air_date : details?.release_date

  return (
    <Box>
      <Box
        background={`linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(${imagePathOriginal}/${details?.backdrop_path})`}
        backgroundRepeat={'no-repeat'}
        backgroundSize={'cover'}
        backgroundPosition={'center'}
        w={'100%'}
        h={{ base: 'auto', md: '500px' }}
        py={'2'}
        display={'flex'}
        alignItems={'center'}
        zIndex={'-1'}
      >
        <Container maxW={'container.xl'}>
          <Flex
            alignItems={'center'}
            gap="10"
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Image
              height={'450px'}
              borderRadius={'10'}
              src={`${imagePath}/${details?.poster_path}`}
            />
            <Box>
              <Heading fontSize={'3xl'}>
                {title}{' '}
                <Text as="b" color={'gray.400'}>
                  {new Date(releaseDate).getFullYear()}
                </Text>
              </Heading>

              <Flex alignItems={'center'} gap={'4'} mt={1} mb={5}>
                <Flex alignItems={'center'}>
                  <CalendarIcon mr={2} color={'gray.400'} />
                  <Text fontSize={'sm'}>
                    {new Date(releaseDate).toLocaleDateString('ID')} (ID)
                  </Text>
                </Flex>

                {type === 'movie' && (
                  <>
                    <Flex alignItems={'center'}>
                      <TimeIcon mr="2" color={'gray.400'} />
                      <Text fontSize={'sm'}>
                        {minutesTohours(details?.runtime)}
                      </Text>
                    </Flex>
                  </>
                )}
              </Flex>

              <Flex alignItems={'center'} gap={'4'}>
                
                {isInWatchlist ? (
                  <Button
                    leftIcon={<CheckCircleIcon />}
                    colorScheme="green"
                    variant={'solid'}
                    onClick={handleRemoveFromWatchlist}
                  >
                    In watchlist
                  </Button>
                ) : (
                  <Button
                    leftIcon={<SmallAddIcon />}
                    colorScheme="green"
                    variant={'outline'}
                    onClick={handleSaveToWatchlist}
                  >
                    Add to watchlist
                  </Button>
                )}
              </Flex>
              <Text
                color={'gray/400'}
                fontSize={'sm'}
                fontStyle={'italic'}
                my="5"
              >
                {details?.tagline}
              </Text>
              <Heading fontSize={'xl'} mb={'3'}>
                Overview
              </Heading>
              <Text fontSize={'md'} mb={'3'}>
                {details?.overview}
              </Text>
              <Flex mt="6" gap="2">
                {details?.genres?.map((genre) => (
                  <Badge fontSize={'md'} colorScheme={'purple'} key={genre?.id}>
                    {genre?.name}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Container spacing="10px" maxW={'container.xl'} mt="2">
        <Stack direction={['column', 'row']} spacing="8px">
          <Button
            as="h2"
            fontSize={'md'}
            textTransform={'uppercase'}
            color="white"
            mt="6"
            colorScheme="blue"
          >
            <Link to={'/'}>Eps 1</Link>
          </Button>
          <Button as="h2" fontSize={'md'} mt="6" textTransform={'uppercase'}>
            <Link to={'/'}>2</Link>
          </Button>
          <Button as="h2" fontSize={'md'} mt="6" textTransform={'uppercase'}>
            <Link to={'/'}>3</Link>
          </Button>
          <Button as="h2" fontSize={'md'} mt="6" textTransform={'uppercase'}>
            <Link to={'/'}>4</Link>
          </Button>
          <Button as="h2" fontSize={'md'} mt="6" textTransform={'uppercase'}>
            <Link to={'/'}>5</Link>
          </Button>
          <Button as="h2" fontSize={'md'} mt="6" textTransform={'uppercase'}>
            <Link to={'/'}>6</Link>
          </Button>
          <Button as="h2" fontSize={'md'} mt="6" textTransform={'uppercase'}>
            <Link to={'/'}>7</Link>
          </Button>
          <Button as="h2" fontSize={'md'} mt="6" textTransform={'uppercase'}>
            <Link to={'/'}>8</Link>
          </Button>
          <Button as="h2" fontSize={'md'} mt="6" textTransform={'uppercase'}>
            <Link to={'/'}>9</Link>
          </Button>
        </Stack>
      </Container>

      <Container maxW={'container.xl'} mt={5}>
        <Stack>
          <Alert status="success" variant="solid" rounded={5}>
            <AlertIcon />
            Data uploaded to the server. Fire on!
          </Alert>
        </Stack>
      </Container>

      <Container maxW={'container.xl'} mt={5}>
        <Stack>
          <Alert status="success" variant="solid" rounded={5} colorScheme="red">
            <AlertIcon />
            Data uploaded to the server. Fire on!
          </Alert>
        </Stack>
      </Container>

      <Container maxW={'container.xl'} mt={5}>
        <Button as="h2" fontSize="md" textTransform={'uppercase'} mb="5">
          Videos
        </Button>
        <VideoComponent id={video?.key} />
        <Flex mt="5" mb="10" overflowX={'scroll'} gap={'5'}>
          {videos &&
            videos?.map((item) => (
              <Box key={item?.id}>
                <VideoComponent id={item?.key} small />
                <Text fontSize={'sm'} fontWeight={'bold'} mt="2" noOfLines={2}>
                  {item?.name}{' '}
                </Text>
              </Box>
            ))}
        </Flex>
      </Container>
    </Box>
  )
}

export default DetailsPage
