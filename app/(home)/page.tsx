import { auth } from "@/auth";
import ActiveProducts from "@/components/active-products";
import AlternativeCard from "@/components/home/AlternativeCard";
import FeaturedCard from "@/components/home/FeaturedCard";
import HeroSection from "@/components/home/HeroSecion";
import PromoCard from "@/components/home/PromoCard";
import { getFilteredProducts, getProducts } from "@/lib/server-actions";
import { Grid, Typography, Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Home = async () => {
  const filteredTodayProducts = await getFilteredProducts("day");
  const filteredWeekProducts = await getFilteredProducts("week");
  const filteredMonthProducts = await getFilteredProducts("month");
  const featuredProducts = await getProducts(0, 10, "ACTIVE", true);

  const authenticatedUser = await auth();

  return (
    <div>
      <HeroSection />
      <div className="w-full mx-auto py-8 ">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={8} lg={8}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <ActiveProducts
                  activeProducts={filteredTodayProducts}
                  header="See all of today's products"
                  total={filteredTodayProducts?.length}
                  commentShow={true}
                  authenticatedUser={authenticatedUser}
                />
              </Grid>
              <Grid item>
                <ActiveProducts
                  activeProducts={filteredWeekProducts}
                  header="See all of last week's top products"
                  total={filteredWeekProducts?.length}
                  commentShow={true}
                  authenticatedUser={authenticatedUser}
                />
              </Grid>
              <Grid item>
                <ActiveProducts
                  activeProducts={filteredMonthProducts}
                  header="See all of last month's top products"
                  total={filteredMonthProducts?.length}
                  commentShow={true}
                  authenticatedUser={authenticatedUser}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Grid container direction="column" spacing={4}>
              {/* Featured Section */}
              <Grid item>
                <h1 className="text-xl font-medium"> Featured</h1>
                <Divider
                  sx={{ borderStyle: "dotted", borderColor: "gray.900" }}
                />
                <FeaturedCard />
                <ActiveProducts
                  activeProducts={featuredProducts.products}
                  commentShow={false}
                  authenticatedUser={authenticatedUser}
                />
              </Grid>

              <Grid item>
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium">Product Deals</h1>

                  <Link href={"/promos"}>
                    <button className="flex gap-1.5 px-1 py-2 text-sm font-medium leading-none bg-white rounded-md border border-solid border-neutral-200 text-neutral-600">
                      <span className="grow">View all</span>
                      <Image
                        src="/images/SVG.png"
                        alt="alternatives"
                        className="object-contain shrink-0 aspect-[1.07] w-[15px]"
                        width={200}
                        height={200}
                      />
                    </button>
                  </Link>
                </div>
                <Divider
                  sx={{ borderStyle: "dotted", borderColor: "gray.900" }}
                />
                <PromoCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

      <Grid container className="" sx={{ margin: "0 auto" }}>
        <Grid item xs={12}>
          <AlternativeCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
