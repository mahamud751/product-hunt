import { auth } from "@/auth";
import ActiveProducts from "@/components/active-products";
import AlternativeCard from "@/components/home/AlternativeCard";
import FeaturedCard from "@/components/home/FeaturedCard";
import FeaturedCardData from "@/components/home/FeaturedCardData";
import HeroSection from "@/components/home/HeroSecion";
import PromoButtonCard from "@/components/home/PromoButtonCard";
import PromoCard from "@/components/home/PromoCard";
import { getFilteredProducts } from "@/lib/server-actions";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Grid } from "@mui/material";

const Home = async () => {
  const filteredTodayProducts = await getFilteredProducts("day");
  const filteredWeekProducts = await getFilteredProducts("week");
  const filteredMonthProducts = await getFilteredProducts("month");

  const authenticatedUser = await auth();

  return (
    <div>
      <HeroSection />
      <div className="w-full mx-auto py-8">
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={8} lg={8}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <ActiveProducts
                  activeProducts={filteredTodayProducts}
                  header="Top Products Launching Today"
                  footer="See all of today's products"
                  total={filteredTodayProducts?.length}
                  commentShow={true}
                  authenticatedUser={authenticatedUser}
                />
              </Grid>
              <Grid item>
                <ActiveProducts
                  activeProducts={filteredWeekProducts}
                  header="Last Week's Top Startups"
                  footer="See all of last week's top products"
                  total={filteredWeekProducts?.length}
                  commentShow={true}
                  authenticatedUser={authenticatedUser}
                />
              </Grid>
              <Grid item>
                <ActiveProducts
                  activeProducts={filteredMonthProducts}
                  header="Last Month's Top Startups"
                  footer="See all of last month's top products"
                  total={filteredMonthProducts?.length}
                  commentShow={true}
                  authenticatedUser={authenticatedUser}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-medium whitespace-nowrap">
                    Featured
                  </h1>
                  <hr className="flex-grow border-t border-dashed border-black mt-4" />
                </div>

                <FeaturedCard />
                <FeaturedCardData />
                <div className="border border-dashed rounded-lg border-black mt-5">
                  <div className="flex justify-between mt-2 p-5">
                    <h1 className="text-xl font-medium mt-1">
                      Promote your product
                    </h1>
                    <AddCircleIcon sx={{ fontSize: 40 }} />
                  </div>
                </div>
              </Grid>

              <Grid item>
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-medium whitespace-nowrap">
                    Product Deals
                  </h1>
                  <hr className="flex-grow border-t border-dashed border-black mt-4" />
                </div>

                <PromoCard />
                <PromoButtonCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

      <Grid container className="" sx={{}}>
        <Grid item xs={12}>
          <AlternativeCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
