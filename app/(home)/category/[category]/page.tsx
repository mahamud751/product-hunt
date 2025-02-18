// app/(home)/category/[category]/page.tsx
import { getProductsByCategoryName } from "@/lib/server-actions";
import CategoryPageClient from "./CategoryPageClient";
import { Product } from "@/services/types";

interface IParams {
  category: string;
  products: Product[];
}

export default async function CategoryPage({ params }: { params: IParams }) {
  const capitalizedCategory =
    params.category.charAt(0).toUpperCase() + params.category.slice(1);
  const products = await getProductsByCategoryName(capitalizedCategory);

  return (
    <CategoryPageClient
      //@ts-ignore
      products={products}
      category={capitalizedCategory}
    />
  );
}
