import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text, Grid, Box } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react';

import Link from 'next/link';
import IssueDetail from './IssueDetail';
import EditIssueButton from './EditIssueButton';

interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    notFound();
  }
  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <IssueDetail issue={issue} />
      <EditIssueButton issueId={issue.id} />
    </Grid>
  );
};

export default IssueDetailPage;
