import { getSubCategories } from "@/lib/server-actions";
import { Subcategory } from "@/services/types";
import SubCategoryTable from "../table/SubCategoryTable";
export default async function SubCategories() {
  const { subcategory, totalSubCategories } = await getSubCategories(0, 10);

  return (
    <div>
      <SubCategoryTable
        subcategory={subcategory as Subcategory[]}
        totalSubCategories={totalSubCategories}
        initialPage={0}
        initialRowsPerPage={10}
      />
    </div>
  );
}
