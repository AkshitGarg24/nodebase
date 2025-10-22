interface ExeccutionPageProps {
  params: Promise<{
    executionId: string;
  }>;
}

const Page = async ({ params }: ExeccutionPageProps) => {
  const { executionId } = await params;
  return <p>Execution Id: {executionId}</p>;
};

export default Page;
