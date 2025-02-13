"use client";

import Image from "next/image";
import Link from "next/link";
import {
  PiCaretUpFill,
  PiChatCircle,
  PiTrash,
  PiUpload,
  PiUploadSimple,
} from "react-icons/pi";
import CarouselComponent from "./carousel-component";
import { useState } from "react";
import ShareModal from "./ui/modals/share-product-modal";
import ShareModalContent from "./share-modal-content";
import {
  commentOnProduct,
  deleteComment,
  updateComment,
  upvoteProduct,
} from "@/lib/server-actions";
import { Badge } from "./ui/badge";

interface ProductModalContentProps {
  currentProduct: any;
  authenticatedUser: any;
  totalUpvotes: number;
  hasUpvoted: boolean;
  setTotalUpvotes: any;
  setHasUpvoted: any;
  total?: number;
}

const ProductModalContent: React.FC<ProductModalContentProps> = ({
  currentProduct,
  authenticatedUser,
  totalUpvotes,
  hasUpvoted,
  setTotalUpvotes,
  setHasUpvoted,
  total,
}) => {
  const [commentText, setCommentText] = useState("");

  const [shareModalModalVisible, setShareModalVisible] = useState(false);

  const [comments, setComments] = useState(
    currentProduct?.commentData?.map((comment: any) => ({
      ...comment,
      replies: comment.replies || [],
    })) || []
  );

  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  const handleReplyChange = (commentId: string, value: string) => {
    setReplyText((prevReplies) => ({
      ...prevReplies,
      [commentId]: value,
    }));
  };

  const handleReplySubmit = async (commentId: string) => {
    const reply = replyText[commentId];

    if (!reply) return;

    try {
      // call the updateComment function with the comment id and the reply text
      await updateComment(commentId, {
        replies: [
          // add the new reply to the replies array
          ...comments?.find((comment: any) => comment?.id === commentId)
            .replies,
          {
            user: authenticatedUser?.user?.name,
            body: reply,
            profile: authenticatedUser?.user?.image,
            userId: authenticatedUser?.user?.id,
            timestamp: new Date().toISOString(),
          },
        ],
      });

      // update the comments state with the new reply
      setComments(
        comments.map((comment: any) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [
                  {
                    user: authenticatedUser?.user?.name,
                    replies: reply,
                    profile: authenticatedUser?.user?.image,
                    userId: authenticatedUser?.user?.id,
                    timestamp: new Date().toISOString(),
                  },
                ],
              }
            : comment
        )
      );

      // reset the reply text for the specific comment
      setReplyText((prevReplies) => ({
        ...prevReplies,
        [commentId]: "",
      }));
    } catch (error) {
      console.error("Error replying to comment:", error);
    }
  };

  const handleShareClick = () => {
    setShareModalVisible(true);
  };

  const handleCommentSubmit = async () => {
    try {
      // call the comment server action with the product id and the comment text
      await commentOnProduct(
        currentProduct.id,
        commentText,
        currentProduct.rating
      );

      //reset the comment text
      setCommentText("");
      setComments([
        ...comments,
        {
          user: authenticatedUser?.user?.name,
          body: commentText,
          profile: authenticatedUser?.user?.image,
          userId: authenticatedUser?.user?.id,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentChange = (event: any) => {
    setCommentText(event.target.value);
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      // Call the deleteComment function with the comment ID
      await deleteComment(commentId);
      // Filter out the deleted comment from the comments state
      setComments(comments.filter((comment: any) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Handle error appropriately, e.g., display an error message to the user
    }
  };

  const handleUpvoteClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    try {
      await upvoteProduct(currentProduct.id);
      setTotalUpvotes(hasUpvoted ? totalUpvotes - 1 : totalUpvotes + 1);
      setHasUpvoted(!hasUpvoted);
    } catch (error) {
      console.error("Error upvoting product:", error);
    }
  };

  return (
    <div className="h-full">
      <div className="md:w-4/5 mx-auto">
        <Image
          src={currentProduct?.logo}
          alt="logo"
          width={200}
          height={200}
          className="h-20 w-20 border rounded-md bg-white shadow-md"
        />

        <div className="py-4 space-y-2">
          <h1 className="text-2xl font-semibold">{currentProduct.name}</h1>
          <div className="md:flex md:justify-between items-center">
            <p className="text-gray-600 text-xl font-light md:w-3/5">
              {currentProduct.headline}
            </p>

            <div className="flex items-center gap-2 pt-4">
              <button
                onClick={() => window.open(currentProduct.website, "_blank")}
                className="border rounded-md flex justify-center 
                        items-center p-5 cursor-pointer"
              >
                Visit
              </button>
              {total && (
                <button
                  className={`rounded-md flex justify-center items-center p-5 
                gap-x-3 cursor-pointer bg-gradient-to-r w-full xl:w-56 ${
                  hasUpvoted
                    ? "from-[#ff6154] to-[#ff4582] border-[#ff6154] text-white"
                    : "text-black border"
                }`}
                  onClick={handleUpvoteClick}
                >
                  <PiCaretUpFill
                    className={`text-xl ${
                      hasUpvoted ? "text-white" : "text-black"
                    }`}
                  />
                  {totalUpvotes}
                </button>
              )}
            </div>
          </div>
          <h2 className="text-gray-600 py-6">{currentProduct?.description}</h2>

          <div className="md:flex justify-between items-center">
            <div className="flex gap-x-2">
              {currentProduct?.categories?.map((category: any) => (
                <Link
                  href={`/category/${category.toLowerCase()}`}
                  key={category}
                  className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md cursor-pointer"
                >
                  {category}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-x-4 py-4">
              <div
                className="text-md text-gray-600 
              flex items-center gap-x-1 cursor-pointer"
              >
                <PiChatCircle />
                <p>Discuss</p>
              </div>

              <div
                onClick={handleShareClick}
                className="text-md text-gray-600 
              flex items-center gap-x-1 cursor-pointer"
              >
                <PiUploadSimple />
                <p>Share</p>
              </div>
            </div>
          </div>

          <CarouselComponent productImages={currentProduct?.images} />

          <h1 className="font-semibold pt-10">Community Feedback</h1>

          <div>
            <div className="w-full flex gap-4 mt-4">
              <Image
                src={authenticatedUser?.user?.image}
                alt="profile"
                width={50}
                height={50}
                className="rounded-full h-12 w-12"
              />

              <textarea
                value={commentText}
                onChange={handleCommentChange}
                placeholder="What do you think about this product?"
                className="w-full rounded-md p-4 
                focus:outline-none text-gray-600"
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleCommentSubmit}
                className="bg-[#ff6154] text-white p-2 rounded-md"
              >
                Comment
              </button>
            </div>
          </div>

          <div className="py-8 space-y-8">
            {comments?.map((comment: any) => (
              <div key={comment.id} className="flex gap-4">
                <Image
                  src={comment?.profile}
                  alt="profile"
                  width={50}
                  height={50}
                  className="w-8 h-8 rounded-full mt-1 cursor-pointer"
                />

                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-x-2 items-center">
                      <h1 className="text-gray-600 font-semibold cursor-pointer">
                        {comment.user}
                      </h1>
                      {comment?.userId === currentProduct?.userId && (
                        <Badge className="bg-[#88aaff]">Creator</Badge>
                      )}

                      <div className="text-gray-500 text-xs">
                        {new Date(comment?.timestamp).toDateString()}
                      </div>
                    </div>

                    {(comment?.userId === authenticatedUser?.user?.id ||
                      currentProduct?.userId ===
                        authenticatedUser?.user?.id) && (
                      <PiTrash
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-500 hover:cursor-pointer"
                      />
                    )}
                  </div>

                  <div
                    className="text-gray-600 text-sm 
                    hover:cursor-pointer mt-2"
                  >
                    {comment.body}
                  </div>
                  <div className="ml-10 mt-4 space-y-4">
                    {comment?.replies?.map((reply: any, index: number) => (
                      <div key={index} className="flex gap-2 items-start">
                        <Image
                          src={reply?.profile}
                          alt="profile"
                          width={30}
                          height={30}
                          className="w-6 h-6 rounded-full mt-1 cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <div className="flex gap-2 items-center">
                            <h1 className="text-gray-600 font-semibold cursor-pointer text-sm">
                              {reply.user}
                            </h1>
                            <div className="text-gray-500 text-xs">
                              {new Date(reply.timestamp).toDateString()}
                            </div>
                          </div>
                          <div className="text-gray-600 text-sm mt-1">
                            {reply.body}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Reply Form */}
                    <div className="mt-4">
                      <textarea
                        value={replyText[comment.id] || ""}
                        onChange={(e) =>
                          handleReplyChange(comment.id, e.target.value)
                        }
                        placeholder="Reply to this comment"
                        className="w-full rounded-md p-2 focus:outline-none text-gray-600"
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => handleReplySubmit(comment.id)}
                          className="bg-[#ff6154] text-white p-2 rounded-md"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ShareModal
        visible={shareModalModalVisible}
        setVisible={setShareModalVisible}
      >
        <ShareModalContent currentProduct={currentProduct} />
      </ShareModal>
    </div>
  );
};

export default ProductModalContent;
