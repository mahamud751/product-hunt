"use client";

import Image from "next/image";
import { useState } from "react";
import {
  PiArrowBendDoubleUpRight,
  PiCaretUpFill,
  PiChatCircle,
} from "react-icons/pi";
import ProductModal from "./ui/modals/product-modal";
import ProductModalContent from "./product-modal-content";
import Modal from "./ui/modals/modal";
import AuthContent from "./navbar/auth-content";
import Link from "next/link";
import { upvoteProduct } from "@/lib/server-actions";
import { motion } from "framer-motion";

interface ProductItemProps {
  product: any;
  authenticatedUser: any;
  total?: number;
  commentShow?: boolean;
  index?: number;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  authenticatedUser,
  total,
  commentShow,
  index,
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  const [hasUpvoted, setHasUpvoted] = useState(
    product.upvoters?.includes(authenticatedUser?.user.id)
  );

  const [totalUpvotes, setTotalUpvotes] = useState(product.upvotes || 0);

  const handleProductItemClick = () => {
    if (!authenticatedUser) {
      setShowLoginModal(true);
    } else {
      setCurrentProduct(product);
      setShowProductModal(true);
    }
  };

  const handleArrowClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Prevent the click event from propagating to the product item container
    e.stopPropagation();
    // Open the link in a new tab
    window.open(`${product.website}`, "_blank");
  };

  const handleCategoryClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const handleUpvoteClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    try {
      await upvoteProduct(product.id);
      setHasUpvoted(!hasUpvoted);
      setTotalUpvotes(hasUpvoted ? totalUpvotes - 1 : totalUpvotes + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const releaseDate = product?.releaseDate && new Date(product?.releaseDate);

  const currentDate = new Date();

  let displayReleaseDate;

  if (releaseDate > currentDate) {
    displayReleaseDate = releaseDate.toDateString();
  } else {
    displayReleaseDate = "Available Now";
  }

  const variants = {
    initital: { scale: 1 },
    upvoted: { scale: [1, 1.2, 1], transition: { duration: 0.3 } },
  };

  return (
    <div
      onClick={handleProductItemClick}
      className="
    py-4 w-full cursor-pointer p-2   
    rounded-md
     hover:bg-gradient-to-bl
    from-[#ffe6d3]
    via-[#fdfdfd]
    to-white
    "
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={product?.logo}
            alt="logo"
            width={1000}
            height={1000}
            className={`h-12 w-12 rounded-md ${commentShow ? "" : "mt-[-2px]"}`}
          />

          <div className="ml-4">
            <div className="md:flex items-center gap-x-2">
              {commentShow && (
                <h1 className="text-sm font-semibold">{index! + 1}.</h1>
              )}

              <h1 className="text-sm font-semibold">{product?.name}</h1>
              <div
                onClick={handleArrowClick}
                className="hidden md:flex cursor-pointer"
              >
                <PiArrowBendDoubleUpRight className="text-[12px]" />
              </div>
            </div>
            <p className="text-gray-500 text-xs md:text-sm pr-2">
              {product?.headline.slice(0, 40)}
            </p>
            <div className="hidden md:flex gap-x-2 items-center mt-1">
              {/* <p className="hidden md:flex text-xs">-</p> */}
              <div className="text-xs text-gray-500 w-[120px]">
                <div className="flex gap-x-1 items-center">
                  {commentShow && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="none"
                      viewBox="0 0 14 14"
                      data-sentry-element="TagIcon"
                      data-sentry-source-file="index.tsx"
                    >
                      <path
                        stroke="#667085"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="m12.25 6.417-4.43-4.43c-.303-.303-.454-.454-.63-.562a1.8 1.8 0 0 0-.506-.21c-.202-.048-.416-.048-.844-.048H3.5M1.75 5.075v1.152c0 .285 0 .428.032.562q.044.18.14.337c.072.118.173.219.375.42l4.55 4.55c.462.463.693.694.96.78.233.077.486.077.72 0 .267-.086.498-.317.96-.78l1.443-1.443c.462-.462.693-.693.78-.96a1.17 1.17 0 0 0 0-.72c-.087-.267-.318-.498-.78-.96L6.672 3.755c-.202-.202-.303-.303-.42-.375a1.2 1.2 0 0 0-.338-.14c-.134-.032-.277-.032-.562-.032H3.617c-.654 0-.98 0-1.23.128-.22.111-.398.29-.51.51-.127.249-.127.576-.127 1.229"
                      ></path>
                    </svg>
                  )}

                  <Link
                    href={`/category/${product?.category}`}
                    className="hover:underline"
                    onClick={handleCategoryClick}
                  >
                    {product?.category}
                  </Link>
                </div>
              </div>
              {commentShow && <div className="mr-1">•</div>}

              {commentShow && (
                <p className="text-gray-500 text-xs pr-2">
                  {product?.priceOption}
                </p>
              )}

              {commentShow && (
                <div className="text-xs text-gray-500 flex gap-x-1 items-center">
                  {product.commentsLength}
                  <PiChatCircle />
                </div>
              )}

              {/* <div className="text-xs text-gray-500">
                <div className="flex gap-x-1 items-center">
                  <div className="mr-1">•</div>
                  {displayReleaseDate}
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {total && (
          <div className="text-sm">
            <motion.div
              onClick={handleUpvoteClick}
              variants={variants}
              animate={hasUpvoted ? "upvoted" : "initital"}
            >
              {hasUpvoted ? (
                <div
                  className="border px-2 rounded-md flex flex-col 
      items-center bg-gradient-to-bl 
      from-[#ff6154] to-[#ff4582] border-[#ff6154]
      text-white"
                >
                  <PiCaretUpFill className="text-xl" />
                  {totalUpvotes}
                </div>
              ) : (
                <div className="border px-2 rounded-md flex flex-col items-center">
                  <PiCaretUpFill className="text-xl" />
                  {totalUpvotes}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>

      <ProductModal visible={showProductModal} setVisible={setShowProductModal}>
        <ProductModalContent
          currentProduct={currentProduct}
          authenticatedUser={authenticatedUser}
          setTotalUpvotes={setTotalUpvotes}
          totalUpvotes={totalUpvotes}
          hasUpvoted={hasUpvoted}
          setHasUpvoted={setHasUpvoted}
          total={total}
        />
      </ProductModal>

      <Modal visible={showLoginModal} setVisible={setShowLoginModal}>
        <AuthContent />
      </Modal>
    </div>
  );
};

export default ProductItem;
