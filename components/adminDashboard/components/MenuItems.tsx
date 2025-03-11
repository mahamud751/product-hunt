import {
  LucideIcon,
  LayoutDashboard,
  Users,
  Package,
  DollarSign,
  ThumbsUp,
  MessageSquare,
  Gift,
  Megaphone,
  BookOpen,
  MessageSquareDashed,
  Share2,
  Award,
  Briefcase,
  SettingsIcon,
} from "lucide-react";
import Products from "./Products/ProductsList"; // Adjust path as needed

interface SubMenuItem {
  label: string;
  path: string;
  component?: React.ReactNode;
  date?: string;
}

interface MenuItem {
  path: string;
  icon: LucideIcon;
  label: string;
  color: string;
  subItems: SubMenuItem[];
}

const MenuItems: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    color: "#AF583B",
    subItems: [],
    path: "/",
  },
  {
    icon: Users,
    label: "Users",
    color: "#1F1F1F",
    subItems: [
      {
        label: "User List",
        path: "/users/user-list",
        component: <div>User List Management</div>,
      },
      {
        label: "Roles",
        path: "/users/roles",
        component: <div>Roles Management</div>,
      },
    ],
    path: "", // Has submenus, so no path
  },
  {
    icon: Package,
    label: "Products",
    color: "#1F1F1F",
    subItems: [
      {
        label: "Products",
        path: "/adminDashboard/products",
        component: <Products />,
      },
      {
        label: "Categories",
        path: "/adminDashboard/categories",
        component: <div>Categories Management</div>,
      },
      {
        label: "Alternatives",
        path: "/products/alternatives",
        component: <div>Alternatives Management</div>,
      },
      {
        label: "Pending",
        path: "/adminDashboard/pendingProducts",
        component: <div>Pending Approvals Management</div>,
      },
      {
        label: "SEO",
        path: "/products/seo",
        component: <div>SEO & Metadata Management</div>,
      },
      {
        label: "Analytics",
        path: "/products/analytics",
        component: <div>Analytics Management</div>,
      },
    ],
    path: "", // Has submenus, so no path
  },
  {
    icon: DollarSign,
    label: "Revenue",
    color: "#1F1F1F",
    subItems: [
      {
        label: "Orders",
        path: "/revenue/orders",
        component: <div>Orders Management</div>,
      },
      {
        label: "Subscriptions",
        path: "/revenue/subscriptions",
        component: <div>Subscriptions Management</div>,
      },
      {
        label: "Transactions",
        path: "/revenue/transactions",
        component: <div>Transactions Management</div>,
      },
    ],
    path: "", // Has submenus, so no path
  },
  {
    icon: ThumbsUp,
    label: "Upvotes",
    color: "#1F1F1F",
    subItems: [],
    path: "/upvotes", // No submenus, so it keeps its path
  },
  {
    icon: MessageSquare,
    label: "Reviews",
    color: "#1F1F1F",
    subItems: [],
    path: "/reviews", // No submenus, so it keeps its path
  },
  {
    icon: Gift,
    label: "Deals",
    color: "#1F1F1F",
    subItems: [],
    path: "/deals", // No submenus, so it keeps its path
  },
  {
    icon: Megaphone,
    label: "Ads",
    color: "#1F1F1F",
    subItems: [],
    path: "/ads", // No submenus, so it keeps its path
  },
  {
    icon: BookOpen,
    label: "Blog",
    color: "#1F1F1F",
    subItems: [],
    path: "/blog", // No submenus, so it keeps its path
  },
  {
    icon: MessageSquareDashed,
    label: "Forum",
    color: "#1F1F1F",
    subItems: [],
    path: "/forum", // No submenus, so it keeps its path
  },
  {
    icon: Share2,
    label: "Affiliates",
    color: "#1F1F1F",
    subItems: [],
    path: "/affiliates", // No submenus, so it keeps its path
  },
  {
    icon: Award,
    label: "Rewards",
    color: "#1F1F1F",
    subItems: [],
    path: "/rewards", // No submenus, so it keeps its path
  },
  {
    icon: Briefcase,
    label: "Services",
    color: "#1F1F1F",
    subItems: [],
    path: "/services", // No submenus, so it keeps its path
  },
  {
    icon: SettingsIcon,
    label: "Settings",
    color: "#1F1F1F",
    subItems: [],
    path: "/settings", // No submenus, so it keeps its path
  },
];

export default MenuItems;
