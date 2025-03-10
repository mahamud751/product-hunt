"use client";
import React, { useState, useEffect, useCallback } from "react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Users,
  Award,
  Flame,
  Twitter,
  Linkedin,
  Star,
  ThumbsUp,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ArrowUp,
  Search,
  MoreHorizontal,
  Diamond,
  PartyPopper,
  Plus,
  Globe,
  Github,
} from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/services/types";
import {
  getUser,
  getUserActivityLogs,
  toggleReviewHelpful,
} from "@/lib/server-actions";

interface AvatarProps {
  user: any;
  activityLogs: any;
}

type Tab =
  | "about"
  | "activity"
  | "upvotes"
  | "collections"
  | "knowledge"
  | "reviews"
  | "products";

const Profile: React.FC<AvatarProps> = ({
  user: initialUser,
  activityLogs: initialActivityLogs,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [showAllExp, setShowAllExp] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFullBio, setShowFullBio] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [activityLogs, setActivityLogs] = useState(initialActivityLogs);

  const authenticatedUserId = initialUser?.id || "";

  const refetch = useCallback(async () => {
    if (!authenticatedUserId) return;
    try {
      const updatedUser = await getUser(authenticatedUserId);
      const updatedLogs = await getUserActivityLogs(authenticatedUserId);
      setUser(updatedUser);
      setActivityLogs(updatedLogs);
    } catch (error) {
      console.error("Error refetching data:", error);
    }
  }, [authenticatedUserId]);

  useEffect(() => {
    setUser(initialUser);
    setActivityLogs(initialActivityLogs);
  }, [initialUser, initialActivityLogs]);

  console.log("user", user);
  console.log("activityLogs", activityLogs);

  const formattedDate = format(new Date(user?.createdAt), "MMMM do, yyyy");

  const tabs: { id: Tab; label: string }[] = [
    { id: "about", label: "About" },
    { id: "activity", label: "Activity" },
    { id: "products", label: "Products" },
    { id: "upvotes", label: "Upvotes" },
    { id: "collections", label: "Collections" },
    { id: "knowledge", label: "Knowledge" },
    { id: "reviews", label: "Reviews" },
  ];

  const platformIcons = {
    linkedin: <Linkedin size={20} />,
    twitter: <Twitter size={20} />,
    github: <Github size={20} />,
    website: <Globe size={20} />,
  };

  const getFilePreview = (file: { name: string; url: string }) => {
    return file.url;
  };

  const getFileName = (file: { name: string; url: string }) => {
    return file.name;
  };

  const isImageFile = (file: { name: string; url: string }) => {
    const name = getFileName(file);
    return /\.(jpg|jpeg|png|gif)$/i.test(name);
  };

  const topSkills = [
    "Search Engine Optimization (SEO)",
    "Pay Per Click (PPC)",
    "Online Marketing",
    "Media Buying",
    "Google Ads",
    "Content Strategy",
    "Social Media Marketing",
  ];

  const badges = [
    {
      id: 1,
      name: "Pixel perfection",
      icon: Star,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      name: "Gemologist",
      icon: Diamond,
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 3,
      name: "Top 5 Launch",
      icon: Award,
      color: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      id: 4,
      name: "Tastemaker",
      icon: Flame,
      color: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  const upvotedProducts = [
    {
      id: 1,
      name: "Grok 3",
      tagline: "The world's smartest AI\" — Elon Musk",
      logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=48&h=48&q=80",
      upvotes: 251,
      tags: ["Twitter", "Artificial Intelligence", "Bots"],
    },
    {
      id: 2,
      name: "Yess",
      tagline: "AI client research & sales cheat sheet for your next meeting",
      logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=48&h=48&q=80",
      upvotes: 291,
      tags: ["Sales", "SaaS", "Artificial Intelligence"],
    },
    {
      id: 3,
      name: "Fiverr Go",
      tagline: "Where human talent & AI unite to spark limitless creativity",
      logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=48&h=48&q=80",
      upvotes: 578,
      tags: ["Freelance", "Artificial Intelligence"],
    },
    {
      id: 4,
      name: "CommentEasy",
      tagline: "Point, draw & explain on images",
      logo: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=48&h=48&q=80",
      upvotes: 149,
      tags: ["Solo maker", "Productivity", "Notes"],
    },
  ];

  const filteredUpvotes = upvotedProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const totalUpvotes = upvotedProducts.reduce(
    (sum, product) => sum + product.upvotes,
    0
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={clsx(
              "fill-current",
              i < rating ? "text-yellow-400" : "text-gray-300"
            )}
          />
        ))}
      </div>
    );
  };

  const isHelpfulByUser = (review: any) =>
    review.helpfulUsers?.some((h: any) => h.userId === authenticatedUserId) ||
    false;

  const handleToggleHelpful = async (reviewId: string) => {
    try {
      await toggleReviewHelpful(reviewId);
      await refetch(); // Refetch user data and activity logs after toggling
    } catch (error) {
      console.error("Error toggling review helpful:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-8">
            <Image
              src={user?.image || "/default-avatar.png"}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              width={200}
              height={200}
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#1F1F1F]">
                {user?.name || "Anonymous"}
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                {user?.headline || ""}
              </p>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>2.4k Followers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={18} />
                  <span>1.2k Points</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame size={18} />
                  <span>45 Day Streak</span>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#AF583B] text-white rounded-lg hover:bg-[#8F4731] transition-colors">
              Follow
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 bg-white shadow-sm z-10 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "relative py-4 px-2 text-base font-medium transition-colors",
                  activeTab === tab.id
                    ? "text-[#AF583B]"
                    : "text-gray-600 hover:text-gray-800"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-[#AF583B] rounded-t" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === "about" && (
          <div className="space-y-8">
            {/* About Section */}
            <section className="bg-white rounded-2xl border p-6">
              <h2 className="text-2xl font-bold mb-6">About</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line">
                  {showFullBio
                    ? user?.about
                    : user?.about?.slice(0, 150) +
                      (user?.about?.length > 150 ? "..." : "")}
                </p>
                {user?.about?.length > 150 && (
                  <button
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="text-[#AF583B] hover:text-[#8F4731] font-medium mt-2"
                  >
                    {showFullBio ? "Show less" : "...see more"}
                  </button>
                )}
              </div>
            </section>

            {/* Links Section */}
            <section className="bg-white rounded-2xl border p-6">
              <h2 className="text-xl font-bold mb-4">Links</h2>
              <div className="flex gap-4">
                {user?.socialLinks?.map((link: any, index: number) =>
                  link.url ? (
                    <Link
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {
                        platformIcons[
                          link.platform as keyof typeof platformIcons
                        ]
                      }
                    </Link>
                  ) : null
                )}
              </div>
            </section>

            {/* Interests Section */}
            <section className="bg-white rounded-2xl border p-6">
              <h2 className="text-xl font-bold mb-4">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {user?.interests?.map((interest: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </section>

            {/* Badges Section */}
            <section className="bg-white rounded-2xl border p-6">
              <h2 className="text-xl font-bold mb-4">Badges</h2>
              <div className="grid grid-cols-4 gap-4">
                {badges.map((badge) => (
                  <div key={badge.id} className="flex items-center gap-2">
                    <div className={clsx("p-2 rounded-lg", badge.color)}>
                      <badge.icon size={20} className={badge.iconColor} />
                    </div>
                    <span className="font-medium">{badge.name}</span>
                  </div>
                ))}
              </div>
              <button className="text-[#AF583B] hover:text-[#8F4731] font-medium mt-4">
                View all badges
              </button>
            </section>

            {/* Top Skills Section */}
            <section className="bg-white rounded-2xl border p-6">
              <div className="flex items-center gap-2 mb-6">
                <Diamond size={24} className="text-[#AF583B]" />
                <h2 className="text-xl font-bold">Top skills</h2>
                <ChevronRight size={20} className="ml-auto text-gray-400" />
              </div>
              <div className="flex flex-wrap gap-2">
                {user?.skills?.map((skill: string, index: number) => (
                  <span key={index} className="text-gray-600">
                    {skill}
                    {index < topSkills.length - 1 ? " • " : ""}
                  </span>
                ))}
              </div>
            </section>

            {/* Experience Section */}
            <section className="bg-white rounded-2xl border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Experience</h2>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Plus size={20} className="text-gray-600" />
                </button>
              </div>
              <div className="space-y-6">
                {user?.experiences
                  ?.slice(0, showAllExp ? user.experiences.length : 1)
                  .map((exp: any) => {
                    const startDate = formatDate(exp.startDate);
                    const endDate = formatDate(exp.endDate);
                    return (
                      <div key={exp.id} className="flex gap-4">
                        <div className="flex items-center">
                          {exp.files && exp.files.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {exp.files.map(
                                (
                                  file: { name: string; url: string },
                                  fileIndex: number
                                ) => (
                                  <div
                                    key={fileIndex}
                                    className="relative flex flex-col items-center"
                                  >
                                    {isImageFile(file) ? (
                                      <Image
                                        src={getFilePreview(file)}
                                        alt={getFileName(file)}
                                        className="w-12 h-12 rounded-lg"
                                        width={200}
                                        height={200}
                                      />
                                    ) : (
                                      <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-lg">
                                        <span className="text-xs text-gray-600 truncate max-w-[48px]">
                                          {getFileName(file)}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <Image
                              src={
                                "https://i.ibb.co.com/XZ5ggT15/istockphoto-1147544807-612x612.jpg"
                              }
                              alt={exp.company}
                              className="w-12 h-12 rounded-lg"
                              width={200}
                              height={200}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{exp.role}</h3>
                          <div className="flex items-center gap-2 text-gray-600">
                            <span>{exp.company}</span>
                            <span>•</span>
                            <span>{exp.type}</span>
                          </div>
                          <div className="flex items-center gap-4 text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock size={16} />
                              {startDate === endDate
                                ? startDate
                                : `${startDate} - ${endDate}`}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={16} />
                              {exp.location} • {exp.workType}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-2">
                            {exp.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {exp?.technologies?.map(
                              (tech: string, index: number) => (
                                <span key={index} className="badge">
                                  {tech}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {user?.experiences?.length > 1 && (
                  <button
                    onClick={() => setShowAllExp(!showAllExp)}
                    className="text-[#AF583B] hover:text-[#8F4731] font-medium"
                  >
                    {showAllExp
                      ? `Show less`
                      : `Show all ${user.experiences.length} experiences`}
                  </button>
                )}
              </div>
            </section>

            {/* Education Section */}
            <section className="bg-white rounded-2xl border p-6">
              <h2 className="text-xl font-bold mb-6">Education</h2>
              <div className="space-y-6">
                {user?.education
                  ?.slice(0, showAll ? user.education.length : 1)
                  .map((edu: any) => {
                    const startYear = new Date(edu.startDate).getFullYear();
                    const endYear = edu.endDate
                      ? new Date(edu.endDate).getFullYear()
                      : "Present";
                    return (
                      <div key={edu.id} className="flex gap-4">
                        <div className="flex items-center">
                          {edu.files && edu.files.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {edu.files.map(
                                (
                                  file: { name: string; url: string },
                                  fileIndex: number
                                ) => (
                                  <div
                                    key={fileIndex}
                                    className="relative flex flex-col items-center"
                                  >
                                    {isImageFile(file) ? (
                                      <Image
                                        src={getFilePreview(file)}
                                        alt={getFileName(file)}
                                        className="w-12 h-12 rounded-lg"
                                        width={200}
                                        height={200}
                                      />
                                    ) : (
                                      <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-lg">
                                        <span className="text-xs text-gray-600 truncate max-w-[48px]">
                                          {getFileName(file)}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <Image
                              src={
                                "https://i.ibb.co.com/XZ5ggT15/istockphoto-1147544807-612x612.jpg"
                              }
                              alt={edu.institution || "Education"}
                              className="w-12 h-12 rounded-lg"
                              height={200}
                              width={200}
                            />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg">
                              {edu?.institution}
                            </h3>
                            <CheckCircle2
                              size={16}
                              className="text-[#198E49]"
                            />
                          </div>
                          <p className="text-gray-800">{edu?.degree}</p>
                          <p className="text-gray-600">{`${startYear} - ${endYear}`}</p>
                        </div>
                      </div>
                    );
                  })}

                {user?.education?.length > 1 && (
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-[#AF583B] hover:text-[#8F4731] font-medium"
                  >
                    {showAll
                      ? `Show less`
                      : `Show all ${user.education.length} educations`}
                  </button>
                )}
              </div>
            </section>

            {/* Joined Section */}
            <section className="bg-white rounded-2xl border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <PartyPopper size={24} className="text-[#AF583B]" />
                  <span className="font-medium">Joined Product Hunt</span>
                </div>
                <span className="text-gray-600">{formattedDate}</span>
              </div>
            </section>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="grid gap-6">
            <div className="card">
              <div className="flex items-start gap-4">
                <Image
                  src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=48&h=48&q=80"
                  alt="Product"
                  className="w-12 h-12 rounded-lg"
                  width={200}
                  height={200}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">AI Writing Assistant</h3>
                  <p className="text-gray-600">
                    Launched a new AI-powered writing tool
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp size={16} />
                  <span>245</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="space-y-4">
            {user?.products?.map((product: Product) => (
              <div key={product.id} className="card hover:bg-white">
                <div className="flex items-start gap-4">
                  <Image
                    src={product?.logo || ""}
                    alt={product?.name ?? ""}
                    className="w-12 h-12 rounded-lg"
                    height={200}
                    width={200}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {product?.name}
                        </h3>
                        <p className="text-gray-600">{product.headline}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {product?.tags?.map((tag) => (
                            <span key={tag} className="text-sm text-gray-500">
                              • {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <ArrowUp size={20} className="text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "upvotes" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {totalUpvotes.toLocaleString()} Upvotes
              </h2>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-[280px] focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredUpvotes.map((product) => (
                <div key={product.id} className="card hover:bg-white">
                  <div className="flex items-start gap-4">
                    <Image
                      src={product.logo}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg"
                      height={200}
                      width={200}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-gray-600">{product.tagline}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {product.tags.map((tag) => (
                              <span key={tag} className="text-sm text-gray-500">
                                • {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ArrowUp size={20} className="text-gray-500" />
                          </button>
                          <span className="text-sm font-medium">
                            {product.upvotes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {user?.reviews.map((review: any) => (
              <div key={review.id} className="card hover:bg-white">
                <div className="space-y-4">
                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    <Image
                      src={review?.user?.image || "/default-avatar.png"}
                      alt={review?.user?.name || "Anonymous"}
                      className="w-12 h-12 rounded-full"
                      width={200}
                      height={200}
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {review?.user?.name || "Anonymous"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        left a review •{" "}
                        {formatDistanceToNow(new Date(review?.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Rating and Review */}
                  <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                    <Image
                      src={review?.product?.logo || "/default-product.png"}
                      alt={review?.product?.name || "Product"}
                      className="w-12 h-12 rounded-lg"
                      width={200}
                      height={200}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900">
                            {review?.product?.name || "Unknown Product"}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {review?.product?.description || "No description"}
                          </p>
                        </div>
                        <StarRating rating={review?.rating || 0} />
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="text-gray-600">
                    {review?.body || "No content"}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => handleToggleHelpful(review.id)}
                      className={clsx(
                        "flex items-center gap-2",
                        isHelpfulByUser(review)
                          ? "text-green-500"
                          : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      <ThumbsUp
                        size={16}
                        className={
                          isHelpfulByUser(review) ? "fill-green-500" : ""
                        }
                      />
                      <span className="text-sm">
                        Helpful ({review?.helpful || 0})
                      </span>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreHorizontal size={16} className="text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "knowledge" && (
          <div className="grid grid-cols-3 gap-6">
            <article className="card">
              <Image
                src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=400&q=80"
                alt="Article"
                className="w-full h-48 object-cover rounded-lg mb-4"
                height={400}
                width={800}
              />
              <h3 className="font-bold text-xl mb-2">
                The Future of SaaS in 2025
              </h3>
              <p className="text-gray-600 mb-4">
                Exploring upcoming trends in the SaaS industry...
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Mar 15, 2024</span>
                <span>5 min read</span>
              </div>
            </article>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
