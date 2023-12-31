import React from 'react';
import { Button, Table, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import prisma from '@/prisma/client';
import IssueStatusBadge from '../components/IssueStatusBadge';
import IssueAction from '../components/IssueAction';
import IssueStatusFilter from '../components/IssueStatusFilter';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '../components/Pagination';

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const IssuePage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    {
      label: 'Created At',
      value: 'createdAt',
      className: 'hidden md:table-cell',
    },
  ];

  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 5

  const where = { status };
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip : (page - 1) * pageSize,
    take : pageSize
  });

  const count = await prisma.issue.count({where})
  return (
    <div>
      <Flex justify={'between'} gap={'2'}>
        <IssueStatusFilter />
        <IssueAction />
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => {
              return (
                <Table.ColumnHeaderCell key={column.value}>
                  <Link
                    href={{
                      query: { ...searchParams, orderBy: column.value },
                    }}
                  >
                    {column.label}
                  </Link>
                  {column.value === searchParams.orderBy && (
                    <ArrowUpIcon className="inline" />
                  )}
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.ColumnHeaderCell>
                  <Link href={`/issues/${issue.id}`}> {issue.title}</Link>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.ColumnHeaderCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      <Pagination itemCount={count} pageSize={pageSize} currentPage={page} />
    </div>
  );
};

export default IssuePage;
