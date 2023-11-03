import React from 'react';
import { Button, Table } from '@radix-ui/themes';
import Link from 'next/link';
import prisma from '@/prisma/client';
import IssueStatusBadge from '../components/IssueStatusBadge';

const NewIssue = async () => {
  const issues = await prisma.issue.findMany({});
  console.log(issues);

  return (
    <div>
      <div className='mb-5'>
        <Button>
          <Link href="/issues/new">New button</Link>
        </Button>
      </div>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created At</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => {
            return <Table.Row key={issue.id}>
               <Table.ColumnHeaderCell>{issue.title}</Table.ColumnHeaderCell>
               <Table.ColumnHeaderCell className='hidden md:table-cell'>
                  <IssueStatusBadge status={issue.status}/>
                  </Table.ColumnHeaderCell>
               <Table.ColumnHeaderCell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.ColumnHeaderCell>
            </Table.Row>;
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default NewIssue;
