import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import Logout from "./logout";

const Page = async () => {
  await requireAuth();

  const users = await caller.getUsers();

  return <div>
    Protected Server Component
    {JSON.stringify(users)}
    <Logout />
  </div>;
};

export default Page;