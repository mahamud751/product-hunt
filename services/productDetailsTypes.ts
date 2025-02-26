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
