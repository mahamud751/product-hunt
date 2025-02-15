"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Alternative, Category, Subcategory } from "@/services/types";
import { DateTime } from "luxon";
import { features } from "process";

const getDateRange = (filter: "day" | "week" | "month") => {
  const timeZone = "Asia/Dhaka";

  const now = DateTime.now().setZone(timeZone);

  let startDate: DateTime;
  let endDate: DateTime;

  switch (filter) {
    case "day":
      startDate = now.startOf("day");
      endDate = now.endOf("day");
      break;

    case "week":
      startDate = now.startOf("week");
      endDate = now.endOf("week");
      break;

    case "month":
      startDate = now.startOf("month");
      endDate = now.endOf("month");
      break;

    default:
      throw new Error(
        "Invalid filter type. Choose 'day', 'yesterday', 'week', or 'month'."
      );
  }

  startDate = startDate.plus({ hours: 6 });
  endDate = endDate.plus({ hours: 6 });

  const startDateUTC = startDate.toUTC();
  const endDateUTC = endDate.toUTC();

  return {
    startDate: startDateUTC.toISO(),
    endDate: endDateUTC.toISO(),
  };
};

interface ProductData {
  name: string;
  tags: string;
  linekdin: string;
  weburl: string;
  suggestUrl: string;
  promoOffer: string;
  promoCode: string;
  videoLink: string;
  price: string;
  priceOption: string;
  slug: string;
  headline: string;
  description: string;
  logo: string;
  releaseDate: string;
  promoExpire: string;
  website: string;
  twitter: string;
  discord: string;
  images: string[];
  categoryId?: string;
  subcategoryId?: string;
  alternativeIds: string[];
  rank?: number;
  isMaker: boolean;
  photos: string[];
  makers: string[];
}

export const createProduct = async ({
  name,
  tags,
  linekdin,
  weburl,
  suggestUrl,
  promoOffer,
  promoCode,
  videoLink,
  price,
  slug,
  headline,
  description,
  logo,
  releaseDate,
  promoExpire,
  website,
  twitter,
  discord,
  images,
  categoryId,
  alternativeIds,
  priceOption,
  isMaker,
  makers,
  photos,
}: ProductData): Promise<any> => {
  try {
    const authenticatedUser = await auth();

    if (!authenticatedUser) {
      throw new Error("You must be signed in to create a product");
    }

    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      throw new Error("Category not found");
    }
    const alternatives = await db.alternative.findMany({
      where: {
        id: {
          in: alternativeIds, // Check if all provided alternativeIds exist
        },
      },
    });
    if (!alternatives) {
      throw new Error("Category not found");
    }

    const userId = authenticatedUser.user?.id;

    const product = await db.product.create({
      data: {
        name,
        tags,
        linekdin,
        weburl,
        suggestUrl,
        promoOffer,
        promoCode,
        videoLink,
        price,
        priceOption,
        rank: 0,
        slug,
        headline,
        description,
        logo,
        releaseDate,
        promoExpire,
        website,
        twitter,
        discord,
        isMaker,
        makers,
        photos,
        status: "PENDING",
        category: {
          connect: {
            id: categoryId,
          },
        },
        alternatives: {
          connect: alternativeIds.map((id) => ({ id })), // Connect multiple alternatives
        },

        images: {
          createMany: {
            data: images?.map((image) => ({ url: image })),
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getProducts = async (
  page: number,
  rowsPerPage: number,
  status?: "PENDING" | "ACTIVE" | "REJECTED",
  featured?: boolean
) => {
  const skip = page * rowsPerPage;
  const take = rowsPerPage;

  const where: any = {};

  if (status) {
    where.status = status;
  }
  if (featured !== undefined) {
    where.featured = featured;
  }

  const products = await db.product.findMany({
    skip,
    take,
    where,
  });

  const totalProducts = await db.product.count({ where });

  return { products, totalProducts };
};

export const getPromoProducts = async (categoryId?: string) => {
  const promoProducts = await db.product.findMany({
    where: {
      promoCode: {
        not: "",
      },
      categoryId: categoryId || undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      subcategory: true,
      alternatives: true,
    },
  });

  return promoProducts;
};

export const getFeaturedProducts = async () => {
  const promoProducts = await db.product.findMany({
    where: {
      featured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      subcategory: true,
      alternatives: true,
    },
  });

  return promoProducts;
};

export const updateProduct = async (
  productId: string,
  {
    name,
    slug,
    headline,
    description,
    logo,
    releaseDate,
    website,
    twitter,
    discord,
    images,
    isMaker,
    makers,
    photos,
  }: ProductData
) => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    throw new Error("You must be signed in to update a product");
  }

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      name,
      slug,
      headline,
      description,
      logo,
      releaseDate,
      website,
      twitter,
      discord,
      isMaker,
      makers,
      photos,
      images: {
        deleteMany: {
          productId,
        },
        createMany: {
          data: images?.map((image) => ({ url: image })),
        },
      },
      status: "PENDING",
    },
  });
  return product;
};
export const updateProductStatus = async (
  productId: string,
  status: "PENDING" | "ACTIVE" | "REJECTED"
) => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    throw new Error("You must be signed in to update a product status");
  }

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const updatedProduct = await db.product.update({
    where: {
      id: productId,
    },
    data: {
      status,
    },
  });

  return updatedProduct;
};

interface UpdateProductFlagsParams {
  verified?: boolean;
  top?: boolean;
  featured?: boolean;
}

export const updateProductFlags = async (
  productId: string,
  { verified, top, featured }: UpdateProductFlagsParams
) => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    throw new Error("You must be signed in to update product flags");
  }

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const updatedProduct = await db.product.update({
    where: {
      id: productId,
    },
    data: {
      verified,
      top,
      featured,
    },
  });

  return updatedProduct;
};

export const deleteProduct = async (productId: string) => {
  const authenticatedUser = await auth();

  if (
    !authenticatedUser ||
    !authenticatedUser.user ||
    !authenticatedUser.user.id
  ) {
    throw new Error("User ID is missing or invalid");
  }

  const userId = authenticatedUser.user.id;

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product || product.userId !== userId) {
    throw new Error("Product not found or not authorized");
  }

  await db.product.delete({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });
  return true;
};

export const getOwnerProducts = async () => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    return [];
  }

  const userId = authenticatedUser.user?.id;

  const products = await db.product.findMany({
    where: {
      userId,
    },
  });

  return products;
};

export const getProductById = async (productId: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: true,
        alternatives: true,
        images: true,
        comments: {
          include: {
            user: true,
          },
        },
        upvotes: {
          include: {
            user: true,
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPendingProducts = async () => {
  const products = await db.product.findMany({
    where: {
      status: "PENDING",
    },
    include: {
      category: true,
      images: true,
    },
  });

  return products;
};

export const activateProduct = async (productId: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        status: "ACTIVE",
      },
    });

    await db.notification.create({
      data: {
        userId: product.userId,
        body: `Your product ${product.name} has been activated`,
        type: "ACTIVATED",
        status: "UNREAD",
        profilePicture: product.logo,
        productId: product.id,
      },
    });

    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const rejectProduct = async (productId: string, reason: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found or not authorized");
    }

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        status: "REJECTED",
      },
    });

    await db.notification.create({
      data: {
        userId: product.userId,
        body: `Your product "${product.name}" has been rejected. Reason: ${reason}`,
        type: "REJECTED",
        status: "UNREAD",
        profilePicture: `${product.logo}`,
        productId: productId,
      },
    });
  } catch (error) {
    console.error("Error rejecting product:", error);
    throw error;
  }
};

export const getFilteredProducts = async (filter: "day" | "week" | "month") => {
  const { startDate, endDate } = getDateRange(filter);

  const products = await db.product.findMany({
    where: {
      status: "ACTIVE",
      OR: [
        {
          createdAt: {
            gte: startDate ? new Date(startDate) : undefined,
            lte: endDate ? new Date(endDate) : undefined,
          },
        },
        {
          updatedAt: {
            gte: startDate ? new Date(startDate) : undefined,
            lte: endDate ? new Date(endDate) : undefined,
          },
        },
      ],
    },
    include: {
      category: true,
      images: true,
      comments: {
        include: {
          user: true,
        },
      },
      upvotes: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      upvotes: {
        _count: "desc",
      },
    },
  });

  return products;
};

export const getActiveProducts = async () => {
  const products = await db.product.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      category: true,
      images: true,
      comments: {
        include: {
          user: true,
        },
      },
      upvotes: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      upvotes: {
        _count: "desc",
      },
    },
  });

  return products;
};

export const getTopUpvotedProducts = async (
  filter: "day" | "week" | "month"
) => {
  const products = await getFilteredProducts(filter);

  if (products.length === 0) return [];

  const maxUpvotes = Math.max(
    ...products.map((product) => product.upvotes.length)
  );

  const topUpvotedProducts = products.filter(
    (product) => product.upvotes.length === maxUpvotes
  );

  return topUpvotedProducts;
};

export const commentOnProduct = async (
  productId: string,
  commentText: string,
  rating: number
) => {
  try {
    const authenticatedUser = await auth();

    if (
      !authenticatedUser ||
      !authenticatedUser.user ||
      !authenticatedUser.user.id
    ) {
      throw new Error("User ID is missing or invalid");
    }

    const userId = authenticatedUser.user.id;

    const profilePicture = authenticatedUser?.user?.image || "";

    await db.comment.create({
      data: {
        createdAt: new Date(),
        productId,
        userId,
        rating,
        body: commentText,
        profilePicture: profilePicture,
      },
      include: {
        user: true,
      },
    });

    const productDetails = await db.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        userId: true,
        name: true,
      },
    });

    if (productDetails && productDetails.userId !== userId) {
      await db.notification.create({
        data: {
          userId: productDetails.userId,
          body: `Commented on your product "${productDetails.name}"`,
          profilePicture: profilePicture,
          productId: productId,
          type: "COMMENT",
          status: "UNREAD",
        },
      });
    }
  } catch (error) {
    console.error("Error commenting on product:", error);
    throw error;
  }
};

export const updateComment = async (
  commentId: string,
  updateData: { replies?: any }
) => {
  try {
    const existingComment = await db.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      throw new Error("Comment not found");
    }

    const updatedComment = await db.comment.update({
      where: { id: commentId },
      data: {
        ...updateData,
      },
    });

    return {
      message: "Comment updated successfully",
      updatedComment,
    };
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    await db.comment.delete({
      where: {
        id: commentId,
      },
    });
    return true;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export const upvoteProduct = async (productId: string) => {
  try {
    const authenticatedUser = await auth();

    if (
      !authenticatedUser ||
      !authenticatedUser.user ||
      !authenticatedUser.user.id
    ) {
      throw new Error("User ID is missing or invalid");
    }

    const userId = authenticatedUser.user.id;

    const upvote = await db.upvote.findFirst({
      where: {
        productId,
        userId,
      },
    });

    const profilePicture = authenticatedUser?.user?.image || "";

    if (upvote) {
      await db.upvote.delete({
        where: {
          id: upvote.id,
        },
      });
    } else {
      await db.upvote.create({
        data: {
          productId,
          userId,
        },
      });

      const productOwner = await db.product.findUnique({
        where: {
          id: productId,
        },
        select: {
          userId: true,
        },
      });

      if (productOwner && productOwner.userId !== userId) {
        await db.notification.create({
          data: {
            userId: productOwner.userId,
            body: `Upvoted your product`,
            profilePicture: profilePicture,
            productId: productId,
            type: "UPVOTE",
            status: "UNREAD",
          },
        });
      }
    }
    return true;
  } catch (error) {
    console.error("Error upvoting product:", error);
    throw error;
  }
};

export const getUpvotedProducts = async () => {
  try {
    const authenticatedUser = await auth();

    if (
      !authenticatedUser ||
      !authenticatedUser.user ||
      !authenticatedUser.user.id
    ) {
      throw new Error("User ID is missing or invalid");
    }

    const userId = authenticatedUser.user.id;

    const upvotedProducts = await db.upvote.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });

    return upvotedProducts.map((upvote) => upvote.product);
  } catch (error) {
    console.error("Error getting upvoted products:", error);
    return [];
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        slug,
      },
      include: {
        images: true,
        category: true,
        comments: {
          include: {
            user: true,
          },
        },
        upvotes: {
          include: {
            user: true,
          },
        },
      },
    });
    return product;
  } catch (error) {
    console.error("Error getting product by slug:", error);
    return null;
  }
};

export const createCategory = async ({
  name,
  url,
  title,
  description,
}: Category): Promise<any> => {
  try {
    const category = await db.category.create({
      data: {
        name,
        url,
        title,
        description,
        status: "ACTIVE",
      },
    });

    return category;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getActiveCategory = async (): Promise<any> => {
  const category = await db.category.findMany({
    include: {
      products: true,
      subcategories: true,
    },
  });

  return category;
};

export const getCategories = async (
  page: number,
  rowsPerPage: number,
  status?: "PENDING" | "ACTIVE" | "REJECTED"
) => {
  const skip = page * rowsPerPage;
  const take = rowsPerPage;

  const where: any = {};

  if (status) {
    where.status = status;
  }
  const categories = await db.category.findMany({
    skip,
    take,
    where,
    include: {
      products: true,
      subcategories: true,
    },
  });

  const totalCategories = await db.category.count({ where });

  return { categories, totalCategories };
};

export const updateCategoryStatus = async (
  categoryId: string,
  status: "PENDING" | "ACTIVE" | "REJECTED"
) => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    throw new Error("You must be signed in to update a category status");
  }

  const category = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const updatedCategory = await db.category.update({
    where: {
      id: categoryId,
    },
    data: {
      status,
    },
  });

  return updatedCategory;
};

export const createSubCategory = async ({
  name,
  url,
  title,
  description,
  categoryId,
}: Subcategory): Promise<any> => {
  try {
    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      throw new Error("Category not found");
    }
    const subcategory = await db.subcategory.create({
      data: {
        name,
        url,
        title,
        description,
        category: {
          connect: {
            id: categoryId,
          },
        },
        status: "ACTIVE",
      },
    });

    return subcategory;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getActiveSubCategory = async (): Promise<any> => {
  const subcategory = await db.subcategory.findMany({
    include: {
      products: true,
      category: true,
    },
  });

  return subcategory;
};

export const getSubCategories = async (
  page: number,
  rowsPerPage: number,
  status?: "PENDING" | "ACTIVE" | "REJECTED"
) => {
  const skip = page * rowsPerPage;
  const take = rowsPerPage;

  const where: any = {};

  if (status) {
    where.status = status;
  }
  const subcategory = await db.subcategory.findMany({
    skip,
    take,
    where,
  });

  const totalSubCategories = await db.subcategory.count({ where });

  return { subcategory, totalSubCategories };
};

export const updateSubCategoryStatus = async (
  subcategoryId: string,
  status: "PENDING" | "ACTIVE" | "REJECTED"
) => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    throw new Error("You must be signed in to update a subcategory status");
  }

  const subcategory = await db.subcategory.findUnique({
    where: {
      id: subcategoryId,
    },
  });

  if (!subcategory) {
    throw new Error("SubCategory not found");
  }

  const updatedCategory = await db.subcategory.update({
    where: {
      id: subcategoryId,
    },
    data: {
      status,
    },
  });

  return updatedCategory;
};

export const createAlternative = async ({
  name,
  url,
  title,
  logo,
  description,
}: Alternative): Promise<any> => {
  try {
    const alternative = await db.alternative.create({
      data: {
        name,
        url,
        title,
        logo,
        description,
        status: "ACTIVE",
      },
    });

    return alternative;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getActiveAlternative = async (): Promise<any> => {
  const alternative = await db.alternative.findMany({
    include: {
      products: true,
    },
  });

  return alternative;
};

export const getSingleAlternative = async (id: string): Promise<any> => {
  const alternative = await db.alternative.findUnique({
    where: {
      id,
    },
    include: {
      products: true,
    },
  });

  return alternative;
};

export const getAlternatives = async (
  page: number,
  rowsPerPage: number,
  status?: "PENDING" | "ACTIVE" | "REJECTED",
  searchQuery?: string,
  sortOrder?: string
) => {
  const skip = page * rowsPerPage;
  const take = rowsPerPage;

  const where: any = {};

  if (status) {
    where.status = status;
  }

  if (searchQuery) {
    where.name = {
      contains: searchQuery,
      mode: "insensitive",
    };
  }

  const orderBy: any = {};
  if (sortOrder) {
    switch (sortOrder) {
      case "Latest":
        orderBy.createdAt = "desc";
        break;
      case "NameAsc":
        orderBy.name = "asc";
        break;
      case "NameDesc":
        orderBy.name = "desc";
        break;
      case "Popularity":
        orderBy.views = "desc"; // Sorting by views if it's an Int
        break;
      default:
        orderBy.views = "desc"; // Default to sorting by views
        break;
    }
  }

  const alternatives = await db.alternative.findMany({
    skip,
    take,
    where,
    orderBy,
    include: {
      products: true,
    },
  });

  const totalAlternatives = await db.alternative.count({ where });

  return { alternatives, totalAlternatives };
};

export const getProductsByCategoryName = async (category: string) => {
  const products = await db.product.findMany({
    where: {
      status: "ACTIVE",
    },
  });
  return products;
};

export const getRankById = async (): Promise<
  {
    id: string;
    name: string;
    upvotes: { id: string }[];
    rank: number;
  }[]
> => {
  const rankedProducts = await db.product.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      id: true,
      name: true,
      upvotes: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      upvotes: {
        _count: "desc",
      },
    },
  });

  // Find the maximum number of upvotes among all products
  const maxUpvotes =
    rankedProducts.length > 0 ? rankedProducts[0].upvotes.length : 0;

  // Assign ranks to each product based on their number of upvotes
  const productsWithRanks = rankedProducts.map((product, index) => ({
    ...product,
    rank: product.upvotes.length === maxUpvotes ? 1 : index + 2,
  }));

  return productsWithRanks;
};

export const getNotifications = async () => {
  try {
    const authenticatedUser = await auth();

    if (
      !authenticatedUser ||
      !authenticatedUser.user ||
      !authenticatedUser.user.id
    ) {
      throw new Error("User ID is missing or invalid");
    }

    const userId = authenticatedUser.user.id;

    const notifications = await db.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (notifications.length === 0) {
      return null;
    }

    return notifications;
  } catch (error) {
    console.error("Error getting notifications:", error);
    return [];
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    const authenticatedUser = await auth();

    if (
      !authenticatedUser ||
      !authenticatedUser.user ||
      !authenticatedUser.user.id
    ) {
      throw new Error("User ID is missing or invalid");
    }

    const userId = authenticatedUser?.user.id;

    await db.notification.updateMany({
      where: {
        userId,
      },
      data: {
        status: "READ",
      },
    });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw error;
  }
};

export const searchProducts = async (query: string) => {
  const products = await db.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
      status: "ACTIVE",
    },
  });

  return products;
};

export const getProductsByUserId = async (userId: string) => {
  const products = await db.product.findMany({
    where: {
      userId,
    },
  });

  return products;
};

export const isUserPremium = async () => {
  const authenticatedUser = await auth();

  if (
    !authenticatedUser ||
    !authenticatedUser.user ||
    !authenticatedUser.user.id
  ) {
    throw new Error("User ID is missing or invalid");
  }

  const userId = authenticatedUser?.user?.id;

  // get the user

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.isPremium;
};

export const getRejectedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      status: "REJECTED",
    },
    include: {
      category: true,
      images: true,
    },
  });

  return products;
};

export const getUsers = async () => {
  const users = await db.user.findMany();

  return users;
};

export const getTotalUpvotes = async () => {
  const totalUpvotes = await db.upvote.count({
    where: {
      product: {
        status: "ACTIVE",
      },
    },
  });
  return totalUpvotes;
};

export const getAdminData = async () => {
  const totalProducts = await db.product.count();
  const totalUsers = await db.user.count();
  const totalUpvotes = await db.upvote.count();
  const totalComments = await db.comment.count();
  const totalCategories = await db.category.count();

  return {
    totalProducts,
    totalUsers,
    totalUpvotes,
    totalComments,
    totalCategories,
  };
};
