import React from 'react';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Box } from '@radix-ui/themes';
import Link from 'next/link';

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Box>
      <Pencil2Icon />
      <Link href={`/issues/${issueId}/edit`}>Edit issue</Link>
    </Box>
  );
};

export default EditIssueButton;
