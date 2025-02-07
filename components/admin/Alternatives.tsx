import { getAlternatives, getCategories } from "@/lib/server-actions";
import { Alternative } from "@/services/types";
import AlternativeTable from "../table/AlternativeTable";

export default async function Alternatives() {
  const { alternatives, totalAlternatives } = await getAlternatives(0, 10);

  return (
    <div>
      <AlternativeTable
        alternatives={alternatives as Alternative[]}
        totalAlternatives={totalAlternatives}
        initialPage={0}
        initialRowsPerPage={10}
      />
    </div>
  );
}
