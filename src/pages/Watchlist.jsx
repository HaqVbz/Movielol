import { useState, useEffect } from 'react'
import { useFirestore } from '../services/firestore'
import { useAuth } from '../context/useAuth'
import { Container, Flex, Grid, Heading, Spinner } from '@chakra-ui/react'
import WatchlistCard from '../components/WatchListCard'

const Watchlist = () => {
  const { getWatchlist } = useFirestore()
  const { user } = useAuth()
  const [watchlist, setWatchlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user?.uid) {
      getWatchlist(user?.uid)
        .then((data) => {
          setWatchlist(data)
          console.log(data, 'data')
        })
        .catch((err) => {
          console.log(err, 'error')
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [user?.uid, getWatchlist])

  return (
    <Container maxW={'container.xl'}>
      <Flex
        alignItems={'baseline'}
        gap={'4'}
        my={'10'}
        justifyContent={'space-between'}
      >
        <Heading as="h2" fontSize={'xl'} textTransform={'uppercase'}>
          Bookmark
        </Heading>
      </Flex>
      {isLoading && (
        <Flex justify={'center'} mt={10}>
          <Spinner size={'xl'} color="red" />
        </Flex>
      )}
      {!isLoading && watchlist?.length === 0 && (
        <Heading as="h2" fontSize={'md'} textTransform={'uppercase'}>
          Watchlist is empty
        </Heading>
      )}
      {!isLoading && watchlist?.length > 0 && (
        <Grid
          templateColumns={{
            base: '1fr',
          }}
          gap={'4'}
        >
          {watchlist?.map((item) => (
            <WatchlistCard
              key={item?.id}
              item={item}
              type={item?.type}
              setWatchlist={setWatchlist}
            />
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default Watchlist
