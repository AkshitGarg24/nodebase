interface WorkflowPageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

const Page = async ({ params }: WorkflowPageProps) => {
  const { workflowId } = await params;
  return <p>Workflow Id: {workflowId}</p>;
};

export default Page;
