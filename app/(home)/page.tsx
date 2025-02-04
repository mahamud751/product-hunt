import ActiveProducts from "@/components/active-products";
import AlternativeCard from "@/components/home/AlternativeCard";
import FeaturedCard from "@/components/home/FeaturedCard";
import HeroSection from "@/components/home/HeroSecion";
import PromoCard from "@/components/home/PromoCard";
import {
  getFilteredProducts,
  getProducts,
  // getTopUpvotedProducts,
} from "@/lib/server-actions";

const Home = async () => {
  const filteredTodayProducts = await getFilteredProducts("day");
  const filteredWeekProducts = await getFilteredProducts("week");
  const filteredMonthProducts = await getFilteredProducts("month");

  const featuredProducts = await getProducts(0, 10, "ACTIVE", true);

  return (
    <>
      <HeroSection />
      <div className="md:w-4/5 mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-40">
        <div className="space-y-8">
          <div>
            <ActiveProducts
              activeProducts={filteredTodayProducts}
              header="Top Products Launching Today"
              total={filteredTodayProducts?.length}
            />
          </div>
          <div>
            <ActiveProducts
              activeProducts={filteredWeekProducts}
              header="Last Week's Top Startups"
              total={filteredWeekProducts?.length}
            />
          </div>
          <div>
            <ActiveProducts
              activeProducts={filteredMonthProducts}
              header="Last Month's Top Startups"
              total={filteredMonthProducts?.length}
            />
          </div>
        </div>

        <div>
          <h1 className="text-xl font-medium mb-3">Featured</h1>
          <hr className="border-dotted border-gray-950 mb-8" />
          <FeaturedCard />
          <ActiveProducts activeProducts={featuredProducts.products} />
          <h1 className="text-xl font-medium mb-3">Product Deals</h1>
          <hr className="border-dotted border-gray-950 mb-8" />
          <PromoCard />
        </div>
      </div>
      <AlternativeCard />
    </>
  );
};

export default Home;
