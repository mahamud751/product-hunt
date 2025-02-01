import { getProducts } from "@/lib/server-actions";
import ProductTable from "../table/ProductTable";
import { Product } from "@/services/types";
export default async function Products() {
  const { products, totalProducts } = await getProducts(0, 10);

  return (
    <div>
      <ProductTable
        products={products as Product[]}
        totalProducts={totalProducts}
        initialPage={0}
        initialRowsPerPage={10}
      />
    </div>
  );
}
