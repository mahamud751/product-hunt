import ActiveProducts from "@/components/active-products";
import { getActiveProducts, getTopVotedProducts } from "@/lib/server-actions";

const Home = async () => {
  const activeProducts = await getActiveProducts();
  const topVotedProducts = await getTopVotedProducts();

  return (
    <>
      {topVotedProducts.length > 0 && (
        <div className="mt-12 bg-white p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Top Voted Products Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topVotedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border rounded-lg shadow-md p-4"
              >
                <img
                  src={product.logo || "/default-product-image.jpg"}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.headline}</p>
                <p className="text-sm text-gray-500">{product.description}</p>
                <a
                  href={product.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 mt-2 block"
                >
                  Visit Website
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="md:w-3/5 mx-auto py-10 px-6">
        <ActiveProducts activeProducts={activeProducts} />
      </div>
    </>
  );
};

export default Home;
