import { auth } from "@/auth";
import ProfileUpdate from "@/components/profile/ProfileUpdate";
import { getUser } from "@/lib/server-actions";

const Page = async () => {
  // get the user from the server

  const authenticatedUser = await auth();
  const user = await getUser(authenticatedUser?.user?.id ?? "");

  return <ProfileUpdate authenticatedUser={authenticatedUser} user={user} />;
};

export default Page;
