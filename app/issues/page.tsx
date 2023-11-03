import React from 'react';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const NewIssue = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">New button</Link>
      </Button>
    </div>
  );
};

export default NewIssue;
