import { auth } from "@/auth";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/navbar/navbar";
import Spinner from "@/components/spinner";
import {
  getNotifications,
  getProductsByUserId,
  isUserPremium,
} from "@/lib/server-actions";
import { Container } from "@mui/material";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const NewProductLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const authenticatedUser = await auth();

  const notifications = await getNotifications();

  const products = await getProductsByUserId(authenticatedUser?.user?.id || "");

  const isPremium = await isUserPremium();

  if (!authenticatedUser) {
    redirect("/");
  }

  // if (!isPremium && products?.length === 2) {
  //   redirect("/");
  // }

  return (
    <html lang="en">
      <body>
        <Container className="px-8 xl:px-28">
          <Suspense fallback={<Spinner />}>
            <Navbar
              authenticatedUser={authenticatedUser}
              notifications={notifications}
              products={products}
            />

            {children}
          </Suspense>
          <Footer />
        </Container>
      </body>
    </html>
  );
};

export default NewProductLayout;
