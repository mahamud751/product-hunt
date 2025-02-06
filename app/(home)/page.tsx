import ActiveProducts from "@/components/active-products";
import AlternativeCard from "@/components/home/AlternativeCard";
import FeaturedCard from "@/components/home/FeaturedCard";
import HeroSection from "@/components/home/HeroSecion";
import PromoCard from "@/components/home/PromoCard";
import { getFilteredProducts, getProducts } from "@/lib/server-actions";
import { Grid, Typography, Divider } from "@mui/material";

const Home = async () => {
  const filteredTodayProducts = await getFilteredProducts("day");
  const filteredWeekProducts = await getFilteredProducts("week");
  const filteredMonthProducts = await getFilteredProducts("month");
  const featuredProducts = await getProducts(0, 10, "ACTIVE", true);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      <div className="md:w-5/5 mx-auto sm:px-8 py-8">
        <Grid
          container
          spacing={12}
          sx={{
            padding: {},
          }}
        >
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <ActiveProducts
                  activeProducts={filteredTodayProducts}
                  header="Top Products Launching Today"
                  total={filteredTodayProducts?.length}
                />
              </Grid>
              <Grid item>
                <ActiveProducts
                  activeProducts={filteredWeekProducts}
                  header="Last Week's Top Startups"
                  total={filteredWeekProducts?.length}
                />
              </Grid>
              <Grid item>
                <ActiveProducts
                  activeProducts={filteredMonthProducts}
                  header="Last Month's Top Startups"
                  total={filteredMonthProducts?.length}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            <Grid container direction="column" spacing={4}>
              {/* Featured Section */}
              <Grid item>
                <Typography
                  variant="h6"
                  fontWeight="medium"
                  gutterBottom
                  mb={2}
                >
                  Featured
                </Typography>
                <Divider
                  sx={{ borderStyle: "dotted", borderColor: "gray.900" }}
                />
                <FeaturedCard />
                <ActiveProducts activeProducts={featuredProducts.products} />
              </Grid>

              {/* Product Deals Section */}
              <Grid item>
                <Typography
                  variant="h6"
                  fontWeight="medium"
                  gutterBottom
                  mb={4}
                >
                  Product Deals
                </Typography>
                <Divider
                  sx={{ borderStyle: "dotted", borderColor: "gray.900" }}
                />
                <PromoCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {/* Alternative Card Section */}
      <Grid container className="" sx={{ margin: "0 auto" }}>
        <Grid item xs={12}>
          <AlternativeCard />
        </Grid>
      </Grid>

      {/* Main Content Grid */}
    </>
  );
};

export default Home;
