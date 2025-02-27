import { getCategories } from "@/lib/server-actions";
import { Category, Subcategory } from "@/services/types";
import { Breadcrumbs } from "@mui/material";
import { Home } from "lucide-react";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function SubcategoryCard({ name, description, products }: Subcategory) {
  return (
    <div className="group bg-[#F5F5F5] p-6 rounded-lg transition-all duration-200 hover:shadow-md hover:bg-white cursor-pointer">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
        className="my-4"
      >
        <Link color="inherit" href="/" className="flex items-center gap-1">
          <Home className="w-5 h-5 text-gray-500" />
          <span className="ms-[2px]">Home</span>
        </Link>
        <span>categories</span>
      </Breadcrumbs>
      <div className="flex flex-col gap-2">
        <div className="flex items-center w-full">
          <div className="flex-shrink-0">
            <h3 className="text-lg font-medium text-[#1F1F1F]">
              {name?.slice(0, 10)}
            </h3>
          </div>
          <div className="flex-grow mx-2 relative">
            <div
              className="absolute top-0 w-full"
              style={{
                height: "1px",
                background:
                  "repeating-linear-gradient(to right, #9CA3AF 0px, #9CA3AF 4px, transparent 4px, transparent 8px)",
              }}
            ></div>
          </div>
          <div className="flex-shrink-0 text-sm text-gray-500 whitespace-nowrap">
            {products?.length} products
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-600 text-sm">{description?.slice(0, 30)}</p>
        </div>
      </div>
    </div>
  );
}
function CategorySection({ category }: { category: Category }) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        {/* {category.} */}
        <h2 className="text-2xl font-semibold text-[#1F1F1F]">
          {category.name?.slice(0, 12)}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category?.subcategories &&
          category?.subcategories.map((subcategory) => (
            <SubcategoryCard key={subcategory?.name} {...subcategory} />
          ))}
      </div>
    </section>
  );
}

const Categories = async () => {
  const { categories } = await getCategories(0, 10);

  return (
    <div className="">
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="border-b border-gray-200 py-16 mb-12">
          <div className="max-w-[1080px] mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1F1F1F] mb-4">
              Product Categories
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Browse top categories to find your best product.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <div className="max-w-[1080px] mx-auto px-4 pb-20">
          {categories?.map((category) => (
            <Link
              href={`/category/${category.name.toLowerCase()}`}
              key={category.id}
              className="space-x-10 p-5 rounded-xl
        
               hover:scale-105
               hover:cursor-pointer
               transition-transform
                 duration-300
                 ease-in-out
               
               "
            >
              <CategorySection
                key={category.name}
                //@ts-ignore
                category={category}
              />
            </Link>
          ))}
        </div>
      </div>
      {/* <div className="bg-gray-100 rounded-md w-full p-10 ">
        <h1 className="text-4xl font-semibold">Categories</h1>
        <p className="text-gray-500 pt-2">
          Discover new products in different categories and find what you need
          to make your life easier
        </p>
      </div>

      <div>
        <div className="pt-10 grid grid-cols-2 gap-6">
          {categories &&
            categories.map((category: any) => (
              <Link
                href={`/category/${category.name.toLowerCase()}`}
                key={category.id}
                className="space-x-10 p-5 rounded-xl
                 shadow-md bg-orange-100
                  hover:scale-105
                  hover:cursor-pointer
                  transition-transform
                    duration-300
                    ease-in-out
                  
                  "
              >
                <div className="md:flex justify-between">
                  <h2 className="md:text-2xl font-semibold">{category.name}</h2>
                  <p className="hover:underline cursor-pointer text-sm">
                    View all products
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div> */}
    </div>
  );
};

export default Categories;
