import { auth } from "@/auth";

import Profile from "@/components/profile/Profile";
import { getUser } from "@/lib/server-actions";

const Page = async () => {
  // Get the authenticated user
  const authenticatedUser = await auth();

  const user = await getUser(authenticatedUser?.user?.id ?? "");

  return <Profile user={user} />;
};

export default Page;
