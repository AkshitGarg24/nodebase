interface CredentialPageProps {
  params: Promise<{
    credentialId: string;
  }>;
}

const Page = async ({ params }: CredentialPageProps) => {
  const { credentialId } = await params;
  return <p>Credential Id: {credentialId}</p>;
};

export default Page;
