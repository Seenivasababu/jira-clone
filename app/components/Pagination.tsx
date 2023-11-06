'use client';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Flex, Button, Text } from '@radix-ui/themes';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const router = useRouter();
  const searchParams = useSearchParams();

  const onChange = (page: number) => {
   const params = new URLSearchParams()
   params.set('page', page.toString())
   router.push('?'+params.toString())
  };

  return (
    <Flex align={'center'} gap={'2'} mt={'4'}>
      <Text>
        Page {currentPage} of {pageCount}{' '}
      </Text>
      <Button color="gray" variant="soft" disabled={currentPage === 1} onClick={()=>onChange(1)}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1} onClick={()=>onChange(currentPage  - 1)}>
        <ArrowLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount} onClick={()=>onChange(currentPage + 1)}>
        <ArrowRightIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount} onClick={()=>onChange(pageCount)}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
