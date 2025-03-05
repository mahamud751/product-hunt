"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Star,
  ThumbsUp,
  Share2,
  Flag,
  MessageSquare,
  Twitter,
  Linkedin,
  Trophy,
  X,
  ChevronRight,
  Clock,
  Monitor,
  Calendar,
  FileText,
  Coffee,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  commentOnProduct,
  getProductById,
  getUsers,
  reviewOnProduct,
  toggleHelpful,
  toggleReviewHelpful,
  updateComment,
  upvoteProduct,
} from "@/lib/server-actions";
import { PiCaretUpFill } from "react-icons/pi";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import ImageSlider from "@/components/productDetails/ImageSlider";
import { Product } from "@/services/types";
import AllReviewSection from "@/components/productDetails/AllReviewSection";
import { Editor } from "@tinymce/tinymce-react";
import { TINY_MCE_EDITOR_INIT } from "@/lib/constants";

// Define types based on your Prisma models
interface User {
  id: string;
  name?: string;
  image?: string;
  profilePicture?: string;
}

interface Review {
  id: string;
  profilePicture: string;
  productId: string;
  userId: string;
  body: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  helpful: number;
  helpfulUsers?: { userId: string }[];
}

interface Comment {
  id: string;
  profilePicture: string;
  productId: string;
  userId: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  replies?: Reply[];
  user: User;
  helpful: number;
  helpfulUsers?: { userId: string }[];
}

interface Reply {
  userId: string;
  body: string;
  createdAt: string;
  profilePicture?: string;
}

interface Alternative {
  name: string;
  description: string;
  icon: React.ReactNode;
  rating: number;
  reviews: number;
}

// Review Modal Component
interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  refetch: () => void; // Added refetch prop
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  productId,
  refetch,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");

  const handleSubmit = async () => {
    try {
      await reviewOnProduct(productId, reviewText, rating);
      setRating(0);
      setReviewText("");
      refetch(); // Trigger refetch after successful submission
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-xl mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white">
              N
            </div>
            <h2 className="text-xl font-bold">Write a Review</h2>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">Rate the product</div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setIsHovering(star)}
                  onMouseLeave={() => setIsHovering(0)}
                  onClick={() => setRating(star)}
                  className="p-1"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (isHovering || rating)
                        ? "text-[#FFC107] fill-[#FFC107]"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">
              Your Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#1F1F1F] focus:ring-1 focus:ring-[#1F1F1F] outline-none resize-none"
            />
          </div>

          <button
            disabled={!rating || !reviewText}
            onClick={handleSubmit}
            className={`w-full py-2 px-4 rounded-lg text-white ${
              rating && reviewText
                ? "bg-[#AF583B] hover:bg-[#AF583B]/90"
                : "bg-gray-300 cursor-not-allowed"
            } transition-colors`}
          >
            Post Review
          </button>
        </div>
      </div>
    </div>
  );
};

// Reviews Section Component
interface ReviewsSectionProps {
  productId: string;
  reviews: Review[];
  activeTab: any;
  data: any;
  setIsReviewModalOpen: any;
  isOverview?: boolean;
  refetch: () => void; // Added refetch prop
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  productId,
  reviews,
  activeTab,
  data,
  setIsReviewModalOpen,
  isOverview = false,
  refetch,
}) => {
  const [visibleReviews, setVisibleReviews] = useState<number>(2);
  const reviewsPerPage = 10;
  const [selectedSort, setSelectedSort] = useState<"newest" | "highest">(
    "newest"
  );

  const safeReviews = Array.isArray(reviews) ? reviews : [];

  const sortedReviews = [...safeReviews].sort((a, b) => {
    if (selectedSort === "newest")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (selectedSort === "highest") return b.rating - a.rating;
    return 0;
  });

  const handleViewAllReviews = () => {
    setVisibleReviews(reviewsPerPage);
  };

  const handleShowMoreReviews = () => {
    setVisibleReviews((prev) => prev + reviewsPerPage);
  };

  const handleToggleHelpful = async (reviewId: string) => {
    try {
      await toggleReviewHelpful(reviewId);
      // Assuming refetch is passed from parent, call it here
      // For now, we’ll rely on App-level refetch via ReviewModal
      refetch();
    } catch (error) {
      console.error("Error toggling review helpful:", error);
    }
  };

  const totalReviews = safeReviews.length;
  const hasMoreReviews = visibleReviews < totalReviews;

  const isHelpfulByUser = (
    review: Review,
    userId: string = "currentUserId" // Replace with actual user ID
  ) => review?.helpfulUsers?.some((h) => h?.userId === userId) || false;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Reviews {data?.name}</h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= (data?.averageRating || 0)
                      ? "text-[#FFC107] fill-[#FFC107]"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {(data?.averageRating || 0).toFixed(1)} based on (
              {safeReviews.length} reviews)
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="px-4 py-2 bg-[#198E49] text-white rounded-lg hover:bg-[#198E49]/90 transition-colors mb-8"
          >
            Leave a Review
          </button>
          <div>
            {isOverview && visibleReviews === 2 && (
              <button
                onClick={handleViewAllReviews}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                View all reviews
              </button>
            )}
          </div>
        </div>
      </div>

      {!isOverview && (
        <AllReviewSection data={data} safeReviews={safeReviews} />
      )}

      {!isOverview && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={selectedSort}
            onChange={(e) =>
              setSelectedSort(e.target.value as "newest" | "highest")
            }
            className="border rounded-lg p-1 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest Rated</option>
          </select>
        </div>
      )}

      <div className="space-y-6">
        {sortedReviews?.slice(0, visibleReviews).map((review) => (
          <div key={review.id} className="border rounded-lg p-6">
            <div className="flex justify-between mb-4">
              <div className="flex gap-3">
                <Image
                  src={review?.profilePicture || "/default-avatar.png"}
                  alt={review?.user?.name || "User"}
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
                <div>
                  <div className="font-semibold">
                    {review?.user?.name || "Anonymous"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating
                        ? "text-[#FFC107] fill-[#FFC107]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4">{review.body}</p>
            <div className="flex gap-4 text-sm">
              <button
                onClick={() => handleToggleHelpful(review.id)}
                className={`flex items-center gap-1 ${
                  isHelpfulByUser(review)
                    ? "text-green-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <ThumbsUp
                  className={`w-4 h-4 ${
                    isHelpfulByUser(review) ? "fill-green-500" : ""
                  }`}
                />
                <span>Helpful ({review.helpful || 0})</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                <Flag className="w-4 h-4" />
                <span>Report</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {hasMoreReviews && visibleReviews >= reviewsPerPage && !isOverview && (
        <div className="mt-6 text-center">
          <button
            onClick={handleShowMoreReviews}
            className="px-6 py-2 bg-[#AF583B] text-white rounded-lg hover:bg-[#AF583B]/90 transition-colors"
          >
            Show remaining reviews ({totalReviews - visibleReviews} more)
          </button>
        </div>
      )}
    </section>
  );
};

// Comments Section Component
interface CommentsSectionProps {
  productId: string;
  comments: Comment[];
  data: any;
  user: any;
  refetch: () => void; // Added refetch prop
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  productId,
  comments,
  data,
  user,
  refetch,
}) => {
  const [showAllReplies, setShowAllReplies] = useState<{
    [key: string]: boolean;
  }>({});
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [selectedSort, setSelectedSort] = useState<"newest" | "oldest">(
    "newest"
  );
  const [newCommentText, setNewCommentText] = useState<string>("");

  const handleReply = async (commentId: string) => {
    if (!replyText[commentId]) return;
    try {
      const existingComment = comments.find((c) => c.id === commentId);
      if (!existingComment) return;
      const updatedReplies: Reply[] = [
        ...(existingComment.replies || []),
        {
          userId: user?.id,
          body: replyText[commentId],
          createdAt: new Date().toISOString(),
          profilePicture: existingComment.user?.image || "/default-avatar.png",
        },
      ];
      await updateComment(commentId, { replies: updatedReplies });
      setReplyText((prev) => ({ ...prev, [commentId]: "" }));
      refetch();
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const handleNewComment = async () => {
    if (!newCommentText) return;
    try {
      await commentOnProduct(productId, newCommentText, 0);
      setNewCommentText("");
      refetch();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleToggleHelpful = async (commentId: string) => {
    try {
      await toggleHelpful(commentId);
      refetch(); // Refetch to update helpful count and user status
    } catch (error) {
      console.error("Error toggling helpful:", error);
    }
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (selectedSort === "newest")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const isHelpfulByUser = (
    comment: Comment,
    userId: string = "currentUserId"
  ) => comment.helpfulUsers?.some((h) => h?.userId === userId) || false;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
      </div>

      <div className="mb-6">
        <Editor
          apiKey="9i9siri6weyxjml0qbccbm35m7o5r42axcf3lv0mbr0k3pkl"
          init={TINY_MCE_EDITOR_INIT}
          value={newCommentText || ""}
          onEditorChange={(newValue: string) => setNewCommentText(newValue)}
        />
        <button
          onClick={handleNewComment}
          disabled={!newCommentText}
          className={`mt-2 px-4 py-2 rounded-lg text-white ${
            newCommentText
              ? "bg-[#AF583B] hover:bg-[#AF583B]/90"
              : "bg-gray-300 cursor-not-allowed"
          } transition-colors`}
        >
          Post Comment
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-600">Sort by:</span>
        <select
          value={selectedSort}
          onChange={(e) =>
            setSelectedSort(e.target.value as "newest" | "oldest")
          }
          className="border rounded-lg p-1 text-sm"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div className="space-y-6">
        {sortedComments.map((comment) => (
          <div key={comment.id} className="border rounded-lg p-6">
            <div className="flex justify-between mb-4">
              <div className="flex gap-3">
                <Image
                  src={comment?.profilePicture || "/default-avatar.png"}
                  alt={comment?.user?.name || "User"}
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
                <div>
                  <div className="font-semibold">
                    {comment?.user?.name || "Anonymous"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(comment?.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            <p
              className="text-gray-600 mb-4"
              dangerouslySetInnerHTML={{ __html: comment.body }}
            />
            <div className="flex gap-4 text-sm">
              <button
                onClick={() => handleToggleHelpful(comment.id)}
                className={`flex items-center gap-1 ${
                  isHelpfulByUser(comment)
                    ? "text-green-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <ThumbsUp
                  className={`w-4 h-4 ${
                    isHelpfulByUser(comment) ? "fill-green-500" : ""
                  }`}
                />
                <span>Helpful ({comment.helpful || 0})</span>
              </button>
              <button
                onClick={() =>
                  setReplyText((prev) => ({ ...prev, [comment.id]: "" }))
                }
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Reply</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                <Flag className="w-4 h-4" />
                <span>Report</span>
              </button>
            </div>

            {replyText[comment.id] !== undefined && (
              <div className="mt-4">
                <Editor
                  apiKey="9i9siri6weyxjml0qbccbm35m7o5r42axcf3lv0mbr0k3pkl"
                  init={TINY_MCE_EDITOR_INIT}
                  value={replyText[comment.id] || ""}
                  onEditorChange={(newValue: string) =>
                    setReplyText((prev) => ({
                      ...prev,
                      [comment.id]: newValue,
                    }))
                  }
                />
                <button
                  onClick={() => handleReply(comment.id)}
                  disabled={!replyText[comment.id]}
                  className={`mt-2 px-4 py-2 rounded-lg text-white ${
                    replyText[comment.id]
                      ? "bg-[#AF583B] hover:bg-[#AF583B]/90"
                      : "bg-gray-300 cursor-not-allowed"
                  } transition-colors`}
                >
                  Post Reply
                </button>
              </div>
            )}

            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4 pl-8 border-l">
                {(showAllReplies[comment.id]
                  ? comment.replies
                  : comment.replies.slice(0, 1)
                ).map((reply, index) => (
                  <div key={index} className="flex gap-3 mb-4">
                    <Image
                      src={reply?.profilePicture || "/default-avatar.png"}
                      alt="Reply author"
                      className="w-8 h-8 rounded-full"
                      width={32}
                      height={32}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{reply?.userId}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(reply?.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p
                        className="text-gray-600 text-sm mt-1"
                        dangerouslySetInnerHTML={{ __html: reply.body }}
                      />
                    </div>
                  </div>
                ))}
                {comment.replies.length > 1 && !showAllReplies[comment.id] && (
                  <button
                    onClick={() =>
                      setShowAllReplies((prev) => ({
                        ...prev,
                        [comment.id]: true,
                      }))
                    }
                    className="text-[#AF583B] text-sm hover:underline"
                  >
                    Show more replies ({comment.replies.length - 1})
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
interface AvatarProps {
  user: any;
}
const DetailsClientPage: React.FC<AvatarProps> = ({ user }) => {
  // Main App Component

  const [activeTab, setActiveTab] = useState<
    "overview" | "reviews" | "comments"
  >("overview");
  const [overviewSubTab, setOverviewSubTab] = useState<"reviews" | "comments">(
    "reviews"
  );
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState<Product | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [hasUpvoted, setHasUpvoted] = useState<boolean>(false);
  const [totalUpvotes, setTotalUpvotes] = useState<number>(0);

  const alternatives: Alternative[] = [
    {
      name: "DeskMinder",
      description: "Create quick desktop reminders",
      icon: <Clock className="w-6 h-6" />,
      rating: 4.8,
      reviews: 1245,
    },
    {
      name: "TaskFlow",
      description: "Streamline your workflow",
      icon: <Monitor className="w-6 h-6" />,
      rating: 4.7,
      reviews: 892,
    },
    {
      name: "TimeKeeper",
      description: "Smart calendar management",
      icon: <Calendar className="w-6 h-6" />,
      rating: 4.9,
      reviews: 1567,
    },
    {
      name: "DocuShare",
      description: "Collaborative document editing",
      icon: <FileText className="w-6 h-6" />,
      rating: 4.6,
      reviews: 734,
    },
    {
      name: "BreakTime",
      description: "Productivity break reminder",
      icon: <Coffee className="w-6 h-6" />,
      rating: 4.7,
      reviews: 945,
    },
  ];

  // Refetch function
  const fetchProductDetails = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const productData = await getProductById(id);
      setData({
        ...productData,
        reviews: Array.isArray(productData?.reviews) ? productData.reviews : [],
        comments: Array.isArray(productData?.comments)
          ? productData.comments
          : [],
      } as unknown as Product);
      // Set initial upvotes from product data
      setTotalUpvotes(productData?.upvotes?.length || 0);
      // Check if current user has upvoted (assuming user.id is available)
      setHasUpvoted(
        Array.isArray(productData?.upvotes) && user?.id
          ? productData.upvotes.some(
              (upvoter: any) => upvoter?.userId === user.id
            )
          : false
      ); // Check if user has upvoted
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  }, [id, user?.id]);
  console.log(data);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData as User[]);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleUpvoteClick = async () => {
    if (!user) {
      // Optionally show a login modal here
      console.log("Please log in to upvote");
      return;
    }
    try {
      await upvoteProduct(data!.id);
      setHasUpvoted(!hasUpvoted);
      setTotalUpvotes(hasUpvoted ? totalUpvotes - 1 : totalUpvotes + 1);
    } catch (error) {
      console.error("Error upvoting product:", error);
    }
  };

  const variants = {
    initial: { scale: 1 },
    upvoted: { scale: [1, 1.2, 1], transition: { duration: 0.3 } },
  };

  const makers = Array.isArray(users)
    ? users?.filter((user) => data?.makers?.includes(user?.id))
    : [];

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="relative bg-gradient-to-r from-[#AF583B]/10 to-[#198E49]/10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white">
                <Image
                  src={data.logo || "/default-logo.png"}
                  alt="Logo"
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#1F1F1F] mb-1">
                  {data?.name}
                </h1>
                <p className="text-lg text-gray-600">{data?.headline}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= (data?.averageRating || 0)
                              ? "text-[#FFC107] fill-[#FFC107]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span>•</span>
                  <span>{data.reviews.length} reviews</span>
                  <span>•</span>
                  <span>{data.comments.length} comments</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                {data?.featured && (
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                )}
                {data?.top && (
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-purple-600" />
                  </div>
                )}
              </div>
              <Link
                href={
                  data.website
                    ? data.website.startsWith("http") ||
                      data.website.startsWith("https")
                      ? data.website
                      : `https://${data.website}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors">
                  Visit website
                </button>
              </Link>
              <div className="text-sm">
                <motion.div
                  onClick={handleUpvoteClick}
                  variants={variants}
                  animate={hasUpvoted ? "upvoted" : "initial"}
                  className="cursor-pointer"
                >
                  {hasUpvoted ? (
                    <div
                      className="border px-2 rounded-md flex flex-col 
                        items-center bg-gradient-to-bl 
                        from-[#ff6154] to-[#ff4582] border-[#ff6154]
                        text-white h-10"
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
            </div>
          </div>
        </div>
      </header>

      <nav className="border-b sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {(["overview", "reviews", "comments"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 relative ${
                  activeTab === tab
                    ? "text-[#AF583B]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#AF583B]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          <div className="flex-1">
            {activeTab === "overview" && (
              <div>
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Overview</h2>
                  <p className="text-gray-600 mb-6">{data.description}</p>

                  <div className="relative overflow-hidden rounded-lg mb-8">
                    <ImageSlider photos={data.photos || []} />
                  </div>
                </section>

                <section className="bg-[#F5F5F5] rounded-lg p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    Awards & Recognition
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {data.featured && (
                      <div className="bg-white p-4 rounded-lg">
                        <Star className="w-6 h-6 text-[#FFC107] mb-2" />
                        <h3 className="font-semibold mb-1">Featured Product</h3>
                        <p className="text-sm text-gray-600">2023</p>
                      </div>
                    )}
                    {data.top && (
                      <div className="bg-white p-4 rounded-lg">
                        <Trophy className="w-6 h-6 text-purple-600 mb-2" />
                        <h3 className="font-semibold mb-1">Top Ranked</h3>
                        <p className="text-sm text-gray-600">2023</p>
                      </div>
                    )}
                  </div>
                </section>

                <section className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Recent Launches</h2>
                    <button className="text-[#AF583B] hover:underline">
                      View all launches
                    </button>
                  </div>
                  <div className="space-y-4">
                    {[1, 2].map((launch) => (
                      <div key={launch} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">
                            Major Update {launch}.0
                          </h3>
                          <span className="text-sm text-gray-500">
                            2 weeks ago
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Introducing new features and improvements...
                        </p>
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span>👍 234 upvotes</span>
                          <span>💬 45 comments</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                <AllReviewSection data={data} safeReviews={data.reviews} />

                {/* Nested Tabs for Reviews and Comments */}
                <div className="mb-8">
                  <div className="flex space-x-8 border-b mb-4">
                    {(["reviews", "comments"] as const).map((subTab) => (
                      <button
                        key={subTab}
                        onClick={() => setOverviewSubTab(subTab)}
                        className={`py-2 px-1 relative ${
                          overviewSubTab === subTab
                            ? "text-[#AF583B]"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {subTab.charAt(0).toUpperCase() + subTab.slice(1)}
                        {overviewSubTab === subTab && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#AF583B]" />
                        )}
                      </button>
                    ))}
                  </div>

                  {overviewSubTab === "reviews" && (
                    <ReviewsSection
                      productId={data.id}
                      reviews={data.reviews}
                      activeTab={activeTab}
                      data={data}
                      setIsReviewModalOpen={setIsReviewModalOpen}
                      isOverview={true}
                      refetch={fetchProductDetails}
                    />
                  )}

                  {overviewSubTab === "comments" && (
                    <CommentsSection
                      productId={data.id}
                      comments={data.comments}
                      data={data}
                      refetch={fetchProductDetails}
                      user={user}
                    />
                  )}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <ReviewsSection
                productId={data.id}
                reviews={data.reviews}
                activeTab={activeTab}
                data={data}
                setIsReviewModalOpen={setIsReviewModalOpen}
                isOverview={false}
                refetch={fetchProductDetails}
              />
            )}

            {activeTab === "comments" && (
              <CommentsSection
                productId={data.id}
                comments={data.comments}
                data={data}
                refetch={fetchProductDetails}
                user={user}
              />
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-80">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold">Product Status</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    Claimed
                  </span>
                </div>
                <button className="w-full bg-[#1F1F1F] text-white px-4 py-2 rounded-lg hover:bg-black/90 transition-colors">
                  Join Team
                </button>
              </div>

              <div className="border-t pt-6 mb-6">
                <h3 className="font-semibold mb-4">Product Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span>{data?.category?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pricing</span>
                    <span className="capitalize">{data?.priceOption}</span>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  {data.twitter && (
                    <a
                      href={data.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                    </a>
                  )}
                  {data.linkedin && (
                    <a
                      href={data.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                    </a>
                  )}
                </div>
              </div>

              <div className="border-t pt-6 mb-6">
                <h3 className="font-semibold mb-4">Makers</h3>
                <div className="flex -space-x-2">
                  {makers?.map((maker, index) => (
                    <Image
                      key={index}
                      src={maker?.image || "/default-avatar.png"}
                      alt="profile"
                      className="w-10 h-10 rounded-full border-2 border-white"
                      width={100}
                      height={100}
                    />
                  ))}
                </div>
              </div>

              <div className="border rounded-lg p-4 mb-6">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs text-gray-500">Ad</span>
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=40&h=40&q=80"
                    alt="Efficient App"
                    className="w-10 h-10 rounded-lg"
                    width={40}
                    height={40}
                  />
                </div>
                <h4 className="font-semibold text-lg mb-2">Efficient App</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Not all Open Source alternatives are equal — Narrow down the
                  best, without the bullsh*t
                </p>
                <button className="w-full bg-[#1F1F1F] text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-black/90 transition-colors">
                  Visit Efficient App
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Product Alternatives</h3>
                  <button className="text-sm text-[#AF583B] hover:underline flex items-center gap-1">
                    View all
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {alternatives.map((alt, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                        {alt.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{alt.name}</h4>
                        <p className="text-xs text-gray-600">
                          {alt.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-[#FFC107] fill-[#FFC107]" />
                            <span className="text-xs text-gray-600 ml-1">
                              {alt.rating}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600">
                            {alt.reviews} reviews
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        productId={data.id}
        refetch={fetchProductDetails}
      />
    </div>
  );
};

export default DetailsClientPage;
