"use client";

import { useState } from "react";
import ProductItem from "./product-item";

interface ActiveProductsProps {
  activeProducts: any;
  header?: string;
  footer?: string;
  total?: number;
  commentShow?: boolean;
  authenticatedUser: any;
}

const ActiveProducts: React.FC<ActiveProductsProps> = ({
  activeProducts,
  header,
  footer,
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
      <div className={`flex items-center  ${header && "pb-3"}`}>
        <h1 className="text-xl font-medium">{header}</h1>
      </div>

      <div className="flex flex-col">
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

      {formattedActiveProducts?.length > 5 && commentShow && (
        <div className="flex mt-12 items-center justify-between">
          {/* Left border with flex-grow */}
          <div className="flex-grow border-t-[2px] border-[#D4D4D4]"></div>

          {/* Button with dynamic width based on text */}
          <div className="mx-3">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-1 md:px-4 py-1 text-sm font-medium bg-white rounded-[10px] border-2 border-[#343435]"
            >
              {showAll ? "Show Less" : `${footer}`}
            </button>
          </div>

          {/* Right border with flex-grow */}
          <div className="flex-grow border-t-[2px] border-[#D4D4D4]"></div>
        </div>
      )}
    </div>
  );
};

export default ActiveProducts;
