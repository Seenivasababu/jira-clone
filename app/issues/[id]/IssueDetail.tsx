import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Issue } from '@prisma/client'
import { Box, Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'

const IssueDetail = ({issue}:{issue:Issue}) => {
  return (
   <Box>
   <Heading>{issue.title}</Heading>
   <Flex className="space-x-3" my="2">
     <IssueStatusBadge status={issue.status} />
     <Text>{issue.createdAt.toDateString()}</Text>
   </Flex>
   <Card>
     <p>{issue.description}</p>
   </Card>
 </Box>
  )
}

export default IssueDetail