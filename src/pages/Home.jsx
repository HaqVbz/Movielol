import { Container, Heading, Grid, Flex, Box, Skeleton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { fetchTrending } from '../services/api'
import Movies from '../pages/movies/Movies.jsx'
import CardComponent from '../components/CardComponent'

const Home = () => {
  const [timeWindow, setTimeWindow] = useState('day')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true)
    fetchTrending(timeWindow)
      .then((res) => {
        setData(res)
      })
      .catch((err) => {
        console.log(err, 'err')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [timeWindow])

  console.log(data, 'item')

  return (
    <Container maxW={'container.xl'}>
      <Flex
        alignItems={'baseline'}
        gap={'4'}
        my={'10'}
        justifyContent={'space-between'}
      >
        <Heading as="h2" fontSize={'xl'} textTransform={'uppercase'}>
          Hot Updated
        </Heading>
        <Flex
          alignItems={'center'}
          gap={'2'}
          backgroundColor={'gray.800'}
          borderRadius={'5px'}
          px="2"
          py="2"
        >
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={'5px'}
            color={'white'}
            bg={`${timeWindow === 'day' ? 'purple.800' : ''}`}
            onClick={() => setTimeWindow('day')}
          >
            Today
          </Box>
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={'5px'}
            color={'white'}
            bg={`${timeWindow === 'week' ? 'blue.800' : ''}`}
            onClick={() => setTimeWindow('week')}
          >
            This Week
          </Box>
        </Flex>
      </Flex>
      {/* loading && <div>Loading...</div> */}
      <Grid
        templateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
        gap={'4'}
      >
        {data &&
          data?.map((item, i) => {
            return loading ? (
              <Skeleton height={300} key={i} />
            ) : (
              <CardComponent
                key={item?.id}
                item={item}
                type={item?.media_type}
              />
            )
          })}
      </Grid>
    </Container>
  )
}

export default Home
