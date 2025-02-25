import { auth } from "@/auth";
import Footer from "@/components/layout/Footer/Footer";

import Navbar from "@/components/navbar/navbar";
import Spinner from "@/components/spinner";
import { getNotifications, getProductsByUserId } from "@/lib/server-actions";
import { Container } from "@mui/material";

import { Suspense } from "react";

const HomeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // get the user from the server

  const authenticatedUser = await auth();
  const notifications = await getNotifications();
  const products = await getProductsByUserId(authenticatedUser?.user?.id || "");

  return (
    <html suppressHydrationWarning={true} lang="en">
      <body>
        <Container className="px-8 xl:px-16">
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

export default HomeLayout;
