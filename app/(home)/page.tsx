import ActiveProducts from "@/components/active-products";
import HeroSection from "@/components/home/HeroSecion";
import {
  getFilteredProducts,
  getProducts,
  // getTopUpvotedProducts,
} from "@/lib/server-actions";

const Home = async () => {
  // const topVotedProducts = await getTopUpvotedProducts("day");

  const filteredTodayProducts = await getFilteredProducts("day");
  // const filteredYesterDayProducts = await getFilteredProducts("yesterday");
  const filteredWeekProducts = await getFilteredProducts("week");
  const featuredProducts = await getProducts(0, 10, "ACTIVE", true);

  return (
    <>
      <HeroSection />
      {/* Main Grid Container */}
      <div className="md:w-4/5 mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-40">
        {/* Left Side: Two Grids (6 and 6) */}
        <div className="space-y-8">
          <div>
            <ActiveProducts
              activeProducts={filteredTodayProducts}
              header="Top Products Launching Today"
              total={filteredTodayProducts.length}
            />
          </div>
          <div>
            <ActiveProducts
              activeProducts={filteredWeekProducts}
              header="Last Week's Top Products"
              total={filteredWeekProducts.length}
            />
          </div>
        </div>

        {/* Right Side: Featured Products */}
        <div>
          <ActiveProducts
            activeProducts={featuredProducts.products}
            header="Featured Products"
            total={featuredProducts.totalProducts}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
