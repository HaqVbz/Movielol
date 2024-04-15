import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'

const About = () => {
  return (
    <Container maxW={'container.xl'}>
      <Heading as="h2" fontSize={'md'} textTransform={'uppercase'}>
        Movielol.biz
      </Heading>
      <Card maxW="xl" my={"5"}>
        <CardBody  colorScheme='blue'>
          <Image
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1931674c-b4c7-4333-b2b7-7b4c4399ec48/dh5liba-d670cc69-f6df-4d21-8aeb-90c3d40b38d5.png/v1/fill/w_1232,h_648,q_70,strp/free_wallpaper_for_the_best_community__by_lovestoryai_dh5liba-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvMTkzMTY3NGMtYjRjNy00MzMzLWIyYjctN2I0YzQzOTllYzQ4XC9kaDVsaWJhLWQ2NzBjYzY5LWY2ZGYtNGQyMS04YWViLTkwYzNkNDBiMzhkNS5wbmciLCJ3aWR0aCI6Ijw9MTUyMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Hsr57cO2TT9tD1XSwTSnbQKGzHI4PE2LcqJbNZXwCOA"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">터니</Heading>
            <Text>다른 것 없음</Text>
            <Text>실패는 성공의 어머니이다</Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              <Link alignItems={'start'} href="https://bio.link/haqvbz_">
                MY BIO
              </Link>
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Container>
  )
}

export default About
