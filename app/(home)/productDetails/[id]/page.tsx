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
import { getProductById, getSingleAlternative } from "@/lib/server-actions";
import Image from "next/image";
import Link from "next/link";
import ImageSlider from "@/components/productDetails/ImageSlider";

function ReviewModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [isHovering, setIsHovering] = useState(0);
  const [isUsingProduct, setIsUsingProduct] = useState(true);
  const [reviewText, setReviewText] = useState("");

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
            <h2 className="text-xl font-bold">
              What do you think of Product Name?
            </h2>
          </div>

          {/* Star Rating */}
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">
              How would you rate it?
            </div>
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

          {/* Review Text */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">
              What are your thoughts about Product Name?
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell us more about your experience with Product Name"
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#1F1F1F] focus:ring-1 focus:ring-[#1F1F1F] outline-none resize-none"
            />
          </div>

          {/* Using Product Checkbox */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              checked={isUsingProduct}
              onChange={(e) => setIsUsingProduct(e.target.checked)}
              className="w-4 h-4 text-[#198E49] border-gray-300 rounded focus:ring-[#198E49]"
            />
            <label className="ml-2 text-sm text-gray-600">
              I'm using Product Name
            </label>
          </div>

          {/* Submit Button */}
          <button
            disabled={!rating}
            className={`w-full py-2 px-4 rounded-lg text-white ${
              rating
                ? "bg-[#AF583B] hover:bg-[#AF583B]/90"
                : "bg-gray-300 cursor-not-allowed"
            } transition-colors`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("best");
  const [currentPage, setCurrentPage] = useState(1);
  const alternativesPerPage = 5;
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  console.log(id);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log(data);

  useEffect(() => {
    const fetchAlternativeDetails = async () => {
      try {
        const data = await getProductById(id as string);
        setData(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlternativeDetails();
  }, [id]);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "launches", label: "Launches" },
    { id: "reviews", label: "Reviews" },
  ];

  const sortOptions = [
    { id: "best", label: "Best" },
    { id: "newest", label: "Newest" },
    { id: "highest", label: "Highest Rated" },
  ];

  const alternatives = [
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

  const ReviewsSection = () => (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">a</h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4 text-[#FFC107] fill-[#FFC107]"
                />
              ))}
            </div>
            <span className="text-gray-600">4.79/5 based on 2,976 reviews</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="px-4 py-2 bg-[#198E49] text-white rounded-lg hover:bg-[#198E49]/90 transition-colors"
          >
            Leave a review
          </button>
          {activeTab === "overview" && (
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              View all reviews
            </button>
          )}
        </div>
      </div>

      {/* Rating Overview */}
      <div className="bg-[#F5F5F5] rounded-lg p-6 mb-8">
        <div className="flex gap-8">
          <div>
            <div className="text-4xl font-bold mb-2">4.79</div>
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4 text-[#FFC107] fill-[#FFC107]"
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">2,976 reviews</div>
          </div>
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2 mb-1">
                <span className="text-sm text-gray-600 w-4">{rating}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FFC107]"
                    style={{
                      width: `${100 - (5 - rating) * 20}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12">
                  {Math.round(100 - (5 - rating) * 20)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-600">Sort by:</span>
        <div className="relative">
          <button
            className="flex items-center gap-1 text-sm hover:text-gray-600"
            onClick={() => {
              // Toggle dropdown
            }}
          >
            {sortOptions.find((opt) => opt.id === selectedSort)?.label}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {[1, 2].map((review) => (
          <div key={review} className="border rounded-lg p-6">
            <div className="flex justify-between mb-4">
              <div className="flex gap-3">
                <img
                  src={`https://images.unsplash.com/photo-${
                    review === 1
                      ? "1472099645785-5658abf4ff4e"
                      : "1517841905240-472988babdf9"
                  }?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                  alt={`Reviewer ${review}`}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-semibold">John Doe</div>
                  <div className="text-sm text-gray-500">2 months ago</div>
                </div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 text-[#FFC107] fill-[#FFC107]"
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Amazing product! It has completely transformed how our team
              collaborates. The interface is intuitive and the features are
              exactly what we needed.
            </p>
            <div className="flex gap-4 text-sm">
              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful (23)</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
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

            {/* Replies */}
            {review === 1 && (
              <div className="mt-4 pl-8 border-l">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Reply author"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Jane Smith</span>
                        <span className="text-sm text-gray-500">
                          1 month ago
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        Glad you're enjoying the product! Let us know if you
                        need any help.
                      </p>
                      <div className="flex gap-4 text-sm mt-2">
                        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Helpful (5)</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                          <MessageSquare className="w-4 h-4" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {!showAllReplies && (
                  <button
                    onClick={() => setShowAllReplies(true)}
                    className="text-[#AF583B] text-sm mt-2 hover:underline"
                  >
                    Show more replies
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header Section */}
      <header className="relative bg-gradient-to-r from-[#AF583B]/10 to-[#198E49]/10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white">
                {<Image src={data?.logo} alt="Logo" width={32} height={32} />}
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
                          className="w-4 h-4 text-[#FFC107] fill-[#FFC107]"
                        />
                      ))}
                    </div>
                  </div>
                  <span>•</span>
                  <span>3K reviews</span>
                  <span>•</span>
                  <span>197 shoutouts</span>
                  <span>•</span>
                  <span>12K followers</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <Link
                href={
                  data?.website
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

      {/* Navigation Tabs */}
      <nav className="border-b sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 relative ${
                  activeTab === tab.id
                    ? "text-[#AF583B]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#AF583B]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div>
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Overview</h2>
                  <p className="text-gray-600 mb-6">{data?.description}</p>

                  {/* User Poll */}
                  <div className="bg-[#F5F5F5] rounded-lg p-6 mb-8">
                    <h3 className="font-semibold mb-4">Do you use this?</h3>
                    <div className="flex gap-4">
                      <button className="bg-[#AF583B] text-white px-4 py-2 rounded-lg hover:bg-[#AF583B]/90 transition-colors">
                        I use this
                      </button>
                      <button className="bg-[#198E49] text-white px-4 py-2 rounded-lg hover:bg-[#198E49]/90 transition-colors">
                        I use something else
                      </button>
                    </div>
                  </div>

                  {/* Product Screenshots */}
                  <div className="relative overflow-hidden rounded-lg mb-8">
                    <ImageSlider photos={data?.photos || []} />
                  </div>
                </section>

                {/* Product Highlights */}
                <section className="bg-[#F5F5F5] rounded-lg p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    Awards & Recognition
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <Star className="w-6 h-6 text-[#FFC107] mb-2" />
                      <h3 className="font-semibold mb-1">
                        Product of the Year
                      </h3>
                      <p className="text-sm text-gray-600">2023 Tech Awards</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <Heart className="w-6 h-6 text-red-400 mb-2" />
                      <h3 className="font-semibold mb-1">Community Choice</h3>
                      <p className="text-sm text-gray-600">
                        Developer's Pick 2023
                      </p>
                    </div>
                  </div>
                </section>

                {/* Recent Launches */}
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

                {/* Alternatives */}
                <section className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Alternatives</h2>
                    <button className="text-[#AF583B] hover:underline">
                      View all alternatives
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2].map((alt) => (
                      <div key={alt} className="border rounded-lg p-4">
                        <div className="flex gap-3 mb-2">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                          <div>
                            <h3 className="font-semibold">Alternative {alt}</h3>
                            <p className="text-sm text-gray-600">
                              Similar workspace solution
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Star className="w-4 h-4 text-[#FFC107]" />
                          <span className="text-sm text-gray-600">4.8/5</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Reviews Section moved to the end */}
                <ReviewsSection />
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <ReviewsSection />
              </div>
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
                    <span>Subscription</span>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Github className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                  <Twitter className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                  <Linkedin className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                </div>
              </div>

              <div className="border-t pt-6 mb-6">
                <h3 className="font-semibold mb-4">Makers</h3>
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Maker 1"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Maker 2"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                </div>
              </div>

              {/* Updated Sponsored Ad Card */}
              <div className="border rounded-lg p-4 mb-6">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs text-gray-500">Ad</span>
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=40&h=40&q=80"
                    alt="Efficient App"
                    className="w-10 h-10 rounded-lg"
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

              {/* Product Alternatives Section */}
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

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
}

export default App;
