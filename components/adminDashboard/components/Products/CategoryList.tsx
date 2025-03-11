import { getCategories } from "@/lib/server-actions";
import CategoryManagement from "./CategoryManagement";

export default async function CategoriyList() {
  const initialPage = 0;
  const initialRowsPerPage = 10;
  const { categories, totalCategories } = await getCategories(
    initialPage,
    initialRowsPerPage
  );

  return (
    <div className="p-8">
      <CategoryManagement
        //@ts-ignore
        initialCategories={categories}
        initialTotalCategories={totalCategories}
        dateFilter="all" // Adjust as needed
      />
    </div>
  );
}
