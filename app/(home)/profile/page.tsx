import { auth } from "@/auth";

import Profile from "@/components/profile/Profile";
import { getUser, getUserActivityLogs } from "@/lib/server-actions";

const Page = async () => {
  // Get the authenticated user
  const authenticatedUser = await auth();

  const user = await getUser(authenticatedUser?.user?.id ?? "");
  const activityLogs = await getUserActivityLogs(
    authenticatedUser?.user?.id ?? ""
  );

  return <Profile user={user} activityLogs={activityLogs} />;
};

export default Page;
