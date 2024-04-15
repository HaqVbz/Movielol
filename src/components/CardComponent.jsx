import { Box, Button, ButtonGroup, CircularProgress, CircularProgressLabel, Collapse, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { imagePath } from '../services/api'
import { Link } from 'react-router-dom'
import { ratingtoPercentage } from '../utils/helpers'

const CardComponent = ({ item, type }) => {
  return (
    <Link to={`${type}/${item?.id}`}>
      <Box
        position={'relative'}
        transform={'scale(1)'}
        gap={4}
        py={2}
        mb={2}
        _hover={{
          transform: { base: 'scale(1)x', md: 'scale(1.04)' },
          transition: 'transform 0.2s ease-in-out',
          zIndex: '10',
          '& .overlay': {
            opacity: 1,
          },
        }}
      >
        <Box
          position="relative"
          py={'68%'}
          px={'40%'}
          bgImg={`${imagePath}/${item?.poster_path}`}
          alt={item?.title || item?.name}
          bgSize={'100%'}
          rounded={'10'}
          boxShadow={'0 0 1px #000'}
        >
          <ButtonGroup>
            <Button
              position={'absolute'}
              left={'3'}
              top={'3'}
              w="auto"
              h="auto"
              fontWeight={'bold'}
              fontSize={'12'}
              textTransform={'uppercase'}
              px={'4'}
              py={'2'}
              variant="solid"
              colorScheme="blue"
              color={'black'}
              boxShadow={'0 0 28px #000'}
            >
              {item?.vote_average?.toFixed(1)}
            </Button>
          </ButtonGroup>
        </Box>
        <Text mt={'4'} textAlign={'center'} fontWeight={'medium'}>
          {item?.title || item?.name}
        </Text>
      </Box>
    </Link>
  )
}

export default CardComponent
