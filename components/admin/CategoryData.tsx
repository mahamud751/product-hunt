import { getActiveCategory, getCategories } from "@/lib/server-actions";

import { Category } from "@/services/types";

import NewProduct from "@/app/(home)/new-product/page";
export default async function Categories() {
  const categories = await getActiveCategory();
  console.log("categories", categories);

  return (
    <div>
      <NewProduct categories={categories} />
    </div>
  );
}
