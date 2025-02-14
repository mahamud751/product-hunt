"use client";

import { useState } from "react";
import ProductItem from "./product-item";

interface ActiveProductsProps {
  activeProducts: any;
  header?: string;
  total?: number;
  commentShow?: boolean;
  authenticatedUser: any;
}

const ActiveProducts: React.FC<ActiveProductsProps> = ({
  activeProducts,
  header,
  total,
  commentShow,
  authenticatedUser,
}) => {
  const [showAll, setShowAll] = useState(false);

  const formattedActiveProducts = activeProducts?.map((product: any) => {
    const {
      id,
      name,
      slug,
      headline,
      description,
      logo,
      releaseDate,
      website,
      twitter,
      discord,
      createdAt,
      updatedAt,
      userId,
      status,
      images,
      category,
      comments,
      upvotes,
      price,
      priceOption,
    } = product;

    const imageUrls = images?.map((image: any) => image?.url);
    const categoryNames = category?.name!;
    const commentsCount = comments ? comments.length : 0;

    const commentText = comments
      ? comments.map((comment: any) => ({
          id: comment.id,
          profile: comment.profilePicture,
          body: comment.body,
          user: comment.user.name,
          timestamp: comment.createdAt,
          userId: comment.user.id,
          name: comment.user.name.toLowerCase().replace(/\s/g, "_"),
          replies: comment.replies,
        }))
      : [];

    const upvotesCount = upvotes ? upvotes.length : 0;
    const upvotesData = upvotes?.map((upvote: any) => upvote?.user?.id);

    return {
      id,
      name,
      slug,
      headline,
      description,
      logo,
      releaseDate,
      website,
      twitter,
      discord,
      createdAt,
      updatedAt,
      userId,
      status,
      price,
      priceOption,
      images: imageUrls,
      category: categoryNames,
      commentsLength: commentsCount,
      commentData: commentText,
      upvoters: upvotesData,
      upvotes: upvotesCount,
    };
  });

  const productsToShow = showAll
    ? formattedActiveProducts
    : formattedActiveProducts?.slice(0, 5);

  return (
    <div className="w-full">
      <div className={`flex items-center pb-3 ${header && "border-b"}`}>
        <h1 className="text-xl font-medium">
          {header} {total && "(" + total + ")"}
        </h1>
      </div>

      <div className="space-y-2 py-6 flex flex-col">
        {productsToShow?.map((product: any, index: number) => (
          <ProductItem
            key={product.id}
            index={index}
            product={product}
            authenticatedUser={authenticatedUser}
            total={total}
            commentShow={commentShow}
          />
        ))}
      </div>

      {formattedActiveProducts?.length > 5 && (
        <div className="flex mt-4">
          <div className="w-[80%] border-t-[3px] border-[#E1F0FE]"></div>
          <div className="mt-[-25px] mx-3 w-[310px]">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 text-sm font-medium bg-white rounded-[25px] border-2 border-[#448EE6]"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
          <div className="w-[80%] border-t-[3px] border-[#E1F0FE]"></div>
        </div>
      )}
    </div>
  );
};

export default ActiveProducts;
