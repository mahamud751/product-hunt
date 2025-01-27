import ActiveProducts from "@/components/active-products";
// import FilteredProducts from "@/components/filter-product";
import {
  getActiveProducts,
  getFilteredProducts,
  getTopVotedProducts,
} from "@/lib/server-actions";

const Home = async () => {
  // const activeProducts = await getActiveProducts();
  const topVotedProducts = await getTopVotedProducts();
  const filteredTodayProducts = await getFilteredProducts("day");
  const filteredYesterDayProducts = await getFilteredProducts("yesterday");
  const filteredWeekProducts = await getFilteredProducts("week");

  return (
    <>
      <div className="md:w-3/5 mx-auto py-10 px-6">
        <ActiveProducts
          activeProducts={topVotedProducts}
          header="Product of the Day"
        />
      </div>
      <div className="md:w-3/5 mx-auto py-10 px-6">
        <ActiveProducts
          activeProducts={filteredTodayProducts}
          header="Top Products Launching Today"
          total={filteredTodayProducts.length}
        />
      </div>
      <div className="md:w-3/5 mx-auto py-10 px-6">
        <ActiveProducts
          activeProducts={filteredYesterDayProducts}
          header="Yesterday's Top Products"
          total={filteredYesterDayProducts.length}
        />
      </div>
      <div className="md:w-3/5 mx-auto py-10 px-6">
        <ActiveProducts
          activeProducts={filteredWeekProducts}
          header="Last Week's Top Products"
          total={filteredWeekProducts.length}
        />
      </div>
    </>
  );
};

export default Home;
