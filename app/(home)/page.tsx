import ActiveProducts from "@/components/active-products";
import AlternativeCard from "@/components/home/AlternativeCard";
import FeaturedCard from "@/components/home/FeaturedCard";
import HeroSection from "@/components/home/HeroSecion";
import PromoCard from "@/components/home/PromoCard";
import { getFilteredProducts, getProducts } from "@/lib/server-actions";
import { Grid, Typography, Divider, Container } from "@mui/material";

const Home = async () => {
  const filteredTodayProducts = await getFilteredProducts("day");
  const filteredWeekProducts = await getFilteredProducts("week");

  const filteredMonthProducts = await getFilteredProducts("month");
  const featuredProducts = await getProducts(0, 10, "ACTIVE", true);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      <div className="w-full mx-auto py-8 ">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={8} lg={8}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <ActiveProducts
                  activeProducts={filteredTodayProducts}
                  header="Top Products Launching Today"
                  total={filteredTodayProducts?.length}
                  commentShow={true}
                />
              </Grid>
              <Grid item>
                <ActiveProducts
                  activeProducts={filteredWeekProducts}
                  header="Last Week's Top Startups"
                  total={filteredWeekProducts?.length}
                  commentShow={true}
                />
              </Grid>
              <Grid item>
                <ActiveProducts
                  activeProducts={filteredMonthProducts}
                  header="Last Month's Top Startups"
                  total={filteredMonthProducts?.length}
                  commentShow={true}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Grid container direction="column" spacing={4}>
              {/* Featured Section */}
              <Grid item>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  Featured
                </Typography>
                <Divider
                  sx={{ borderStyle: "dotted", borderColor: "gray.900" }}
                />
                <FeaturedCard />
                <ActiveProducts
                  activeProducts={featuredProducts.products}
                  commentShow={false}
                />
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
    </div>
  );
};

export default Home;
