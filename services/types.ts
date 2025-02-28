// Enums
export enum Status {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  REJECTED = "REJECTED",
}

export enum NotificationStatus {
  UNREAD = "UNREAD",
  READ = "READ",
}

export enum NotificationType {
  UPVOTE = "UPVOTE",
  COMMENT = "COMMENT",
  ACTIVATED = "ACTIVATED",
  REJECTED = "REJECTED",
}

// Interfaces
export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  user: User;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;
}

export interface User {
  id: string;
  image: string;
  name: string;
  email: string;
  emailVerified?: Date;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
  accounts: Account[];
  comments: Comment[];
  notifications: Notification[];
  products: Product[];
  sessions: Session[];
  upvotes: Upvote[];
}

export interface UpdateUserProfileParams {
  image?: string;
  name?: string;
  username: string;
  headline?: string;
  about?: string;
  socialLinks?: { platform: string; url: string }[];
  interests?: string[];
  skills?: string[];
  experiences?: {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
    type: "Self-employed" | "Full-time"; // Added employment type
    location: string; // Added location
    workType: "Remote" | "On-site"; // Added work type
    technologies: string[]; // Added technologies/skills array
    files?: { name: string; url: string }[]; // File metadata (unchanged)
  }[];
  education?: {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    files?: { name: string; url: string }[]; // File metadata (unchanged)
  }[];
}

export interface Category {
  id?: string;
  name: string;
  status?: Status;
  url: string;
  title: string;
  description: string;
  products?: Product[];
  subcategories?: Subcategory[];
}

export type Subcategory = {
  id?: string;
  name: string;
  url: string;
  title: string;
  description: string;
  status?: Status;
  categoryId?: string;
  category?: Category;
  products?: Product[];
};

export interface Alternative {
  id?: string;
  name: string;
  status?: Status;
  url: string;
  title: string;
  logo: string;
  views?: Number;
  description: string;
  products?: Product[];
}

export interface Product {
  id: string;
  name?: string;
  slug?: string;
  headline?: string;
  rank?: number;
  banner?: string;

  description: string;
  logo?: string;
  releaseDate?: string;
  website?: string;
  twitter?: string;
  discord?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  status: Status;
  categoryId: string;
  alternatives?: string;
  alternativeId?: string;
  subcategoryId?: string;
  subcategory?: Subcategory;
  linekdin?: string;
  verified?: boolean;
  featured?: boolean;
  top?: boolean;
  priceOption: string;
  price: string;

  promoCode?: string;
  promoExpire?: string;
  promoOffer?: string;
  suggestUrl?: string;
  tags?: string[];
  videoLink?: string;
  weburl?: string;
  comments: Comment[];
  images: Image[];
  notification: Notification[];
  category: Category;
  user: User;
  upvotes: Upvote[];
  isMaker: boolean;
  makers: string[];
  photos: string[];
}

export interface ProductData {
  name: string;
  tags: string[];
  banner: string;
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

export interface Image {
  id: string;
  productId: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
}

export interface Upvote {
  id: string;
  productId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  user: User;
}

export interface Comment {
  id: string;
  profilePicture: string;
  productId: string;
  userId: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  replies?: any; // Use a more specific type if `replies` has a defined structure
  product: Product;
  user: User;
  rating: number;
}

export interface Notification {
  id: string;
  userId: string;
  body: string;
  profilePicture: string;
  productId: string;
  commentId?: string;
  type: NotificationType;
  status: NotificationStatus;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  user: User;
}

export interface Blog {
  id?: string;
  name: string | null;
  readtime: string | null;
  headline: string | null;
  desc: string | null;
  photos: string[];
  contents?: {
    title: string;
    description: string;
    photos: string[];
  }[];
  userId: string;
  user?: User;
  status?: "PENDING" | "ACTIVE" | "REJECTED";
  createdAt?: Date;
}

// Optional: Type for `replies` in `Comment`
export interface Reply {
  id: string;
  userId: string;
  body: string;
  createdAt: Date;
}

// Update `Comment` interface to use `Reply` type
export interface CommentWithReplies extends Comment {
  replies?: Reply[];
}
