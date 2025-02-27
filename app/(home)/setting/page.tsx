import { auth } from "@/auth";

import Setting from "@/components/setting/Setting";
import { getUser } from "@/lib/server-actions";

const Page = async () => {
  // Get the authenticated user
  const authenticatedUser = await auth();

  const user = await getUser(authenticatedUser?.user?.id ?? "");

  return <Setting user={user} />;
};

export default Page;
