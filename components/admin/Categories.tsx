import { getCategories } from "@/lib/server-actions";

import { Category } from "@/services/types";
import CategoryTable from "../table/CategoryTable";
export default async function Categories() {
  const { categories, totalCategories } = await getCategories(0, 10);
  console.log(categories);

  return (
    <div>
      <CategoryTable
        categories={categories as Category[]}
        totalCategories={totalCategories}
        initialPage={0}
        initialRowsPerPage={10}
      />
    </div>
  );
}
