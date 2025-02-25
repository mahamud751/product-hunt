import { auth } from "@/auth";
import BlogAdd from "@/components/admin/BlogAdd";

import { getUser } from "@/lib/server-actions";

const Page = async () => {
  // Get the authenticated user
  const authenticatedUser = await auth();

  const user = await getUser(authenticatedUser?.user?.id ?? "");

  return <BlogAdd user={user} />;
};

export default Page;
