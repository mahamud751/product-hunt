"use client";
import React, { useEffect, useState } from "react";
import {
  Star,
  ThumbsUp,
  Share2,
  Flag,
  MessageSquare,
  Github,
  Twitter,
  Linkedin,
  Heart,
  Trophy,
  X,
  ChevronDown,
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
  updateComment,
} from "@/lib/server-actions";
import Image from "next/image";
import Link from "next/link";
import ImageSlider from "@/components/productDetails/ImageSlider";

import { Product } from "@/services/types";

// Define types based on your Prisma models
interface User {
  id: string;
  name?: string;
  image?: string;
  profilePicture?: string;
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
  rating: number;
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
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  productId,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");

  const handleSubmit = async () => {
    try {
      await commentOnProduct(productId, reviewText, rating);
      setRating(0);
      setReviewText("");
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
  comments: Comment[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  productId,
  comments,
}) => {
  const [showAllReplies, setShowAllReplies] = useState<{
    [key: string]: boolean;
  }>({});
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [selectedSort, setSelectedSort] = useState<"newest" | "highest">(
    "newest"
  );

  const handleReply = async (commentId: string) => {
    if (!replyText[commentId]) return;
    try {
      const existingComment = comments.find((c) => c.id === commentId);
      if (!existingComment) return;
      const updatedReplies: Reply[] = [
        ...(existingComment.replies || []),
        {
          userId: "currentUserId", // Replace with actual user ID from auth
          body: replyText[commentId],
          createdAt: new Date().toISOString(),
          profilePicture: existingComment.user.image || "/default-avatar.png",
        },
      ];
      await updateComment(commentId, { replies: updatedReplies });
      setReplyText((prev) => ({ ...prev, [commentId]: "" }));
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (selectedSort === "newest")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (selectedSort === "highest") return b.rating - a.rating;
    return 0;
  });

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Reviews</h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <=
                    comments.reduce((sum, c) => sum + c.rating, 0) /
                      (comments.length || 1)
                      ? "text-[#FFC107] fill-[#FFC107]"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {(
                comments.reduce((sum, c) => sum + c.rating, 0) /
                (comments.length || 1)
              ).toFixed(1)}{" "}
              ({comments.length} reviews)
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[#F5F5F5] rounded-lg p-6 mb-8">
        <div className="flex gap-8">
          <div>
            <div className="text-4xl font-bold">
              {(
                comments.reduce((sum, c) => sum + c.rating, 0) /
                (comments.length || 1)
              ).toFixed(1)}
            </div>
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <=
                    comments.reduce((sum, c) => sum + c.rating, 0) /
                      (comments.length || 1)
                      ? "text-[#FFC107] fill-[#FFC107]"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              {comments.length} reviews
            </div>
          </div>
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = comments.filter((c) => c.rating === rating).length;
              const percentage =
                comments.length > 0 ? (count / comments.length) * 100 : 0;
              return (
                <div key={rating} className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-600 w-4">{rating}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFC107]"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">
                    {Math.round(percentage)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

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

      <div className="space-y-6">
        {sortedComments.map((comment) => (
          <div key={comment.id} className="border rounded-lg p-6">
            <div className="flex justify-between mb-4">
              <div className="flex gap-3">
                <img
                  src={comment.profilePicture || "/default-avatar.png"}
                  alt={comment.user?.name || "User"}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-semibold">
                    {comment.user?.name || "Anonymous"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= comment.rating
                        ? "text-[#FFC107] fill-[#FFC107]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4">{comment.body}</p>
            <div className="flex gap-4 text-sm">
              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful</span>
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
                <textarea
                  value={replyText[comment.id]}
                  onChange={(e) =>
                    setReplyText((prev) => ({
                      ...prev,
                      [comment.id]: e.target.value,
                    }))
                  }
                  placeholder="Write a reply..."
                  className="w-full p-2 border rounded-lg resize-none"
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
                    <img
                      src={reply.profilePicture || "/default-avatar.png"}
                      alt="Reply author"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{reply.userId}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{reply.body}</p>
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

// Main App Component
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "reviews">(
    "overview"
  );
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      try {
        const productData = await getProductById(id);
        setData(productData as unknown as Product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

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
                  {data.name}
                </h1>
                <p className="text-lg text-gray-600">{data.headline}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <=
                            data.comments.reduce(
                              (sum, c) => sum + c.rating,
                              0
                            ) /
                              (data.comments.length || 1)
                              ? "text-[#FFC107] fill-[#FFC107]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span>•</span>
                  <span>{data.comments.length} reviews</span>
                  <span>•</span>
                  <span>{data.comments.length} reviews</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                {data.featured && (
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                )}
                {data.top && (
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
              <button className="px-4 py-2 rounded-lg bg-[#FF4B4B] text-white hover:bg-[#FF4B4B]/90 transition-colors">
                Follow
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="border-b sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {(["overview", "reviews"] as const).map((tab) => (
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

                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-4 py-2 bg-[#198E49] text-white rounded-lg hover:bg-[#198E49]/90 transition-colors mb-8"
                >
                  Leave a Review
                </button>

                <ReviewsSection productId={data.id} comments={data.comments} />
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-4 py-2 bg-[#198E49] text-white rounded-lg hover:bg-[#198E49]/90 transition-colors mb-8"
                >
                  Leave a Review
                </button>
                <ReviewsSection productId={data.id} comments={data.comments} />
              </div>
            )}
          </div>

          <div className="w-80">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold">Product Status</span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      data.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {data.status}
                  </span>
                </div>
                {data.isMaker && (
                  <button className="w-full bg-[#1F1F1F] text-white px-4 py-2 rounded-lg hover:bg-black/90 transition-colors">
                    Join Team
                  </button>
                )}
              </div>

              <div className="border-t pt-6 mb-6">
                <h3 className="font-semibold mb-4">Product Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span>{data.category?.name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pricing</span>
                    <span>{data.price || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Release Date</span>
                    <span>{data.releaseDate || "N/A"}</span>
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
                  {data.linekdin && (
                    <a
                      href={data.linekdin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                    </a>
                  )}
                  {data.twitter && (
                    <a
                      href={data.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                    </a>
                  )}
                  {data.linekdin && (
                    <a
                      href={data.linekdin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                    </a>
                  )}
                </div>
              </div>

              {data.makers && data.makers.length > 0 && (
                <div className="border-t pt-6 mb-6">
                  <h3 className="font-semibold mb-4">Makers</h3>
                  <div className="flex -space-x-2">
                    {data.makers.slice(0, 3).map((maker, index) => (
                      <img
                        key={index}
                        src={
                          (maker as unknown as User).image ||
                          (maker as unknown as User).profilePicture ||
                          "https://via.placeholder.com/40"
                        }
                        alt={`Maker ${index + 1}`}
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Product Alternatives</h3>
                  <button className="text-sm text-[#AF583B] hover:underline flex items-center gap-1">
                    View all
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {alternatives.slice(0, 3).map((alt, index) => (
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
      />
    </div>
  );
};

export default App;
