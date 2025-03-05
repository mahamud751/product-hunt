import { auth } from "@/auth";

import { getUser } from "@/lib/server-actions";
import DetailsClientPage from "./DetailsClientPage";

const Page = async () => {
  // Get the authenticated user
  const authenticatedUser = await auth();

  const user = await getUser(authenticatedUser?.user?.id ?? "");

  return <DetailsClientPage user={user} />;
};

export default Page;
