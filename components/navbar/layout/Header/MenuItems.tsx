import {
  Article,
  MoveToInbox as InboxIcon,
  Category as CategoryIcon,
  DryCleaning as DryCleaningIcon,
  PhotoLibraryOutlined as PhotoLibraryOutlinedIcon,
  ManageAccounts,
  AddBusiness,
  School,
  LiveHelp,
  Pages,
  ReviewsOutlined,
  ShoppingBasketOutlined,
  Lock,
  Store,
  Sell,
  Redeem,
  Notifications,
} from "@mui/icons-material";

interface MenuItem {
  text: string;
  icon: React.ReactElement;
  path: string;
  requiredPermission?: string;
  submenus: { text: string; path: string; requiredPermission?: string }[];
}

export const commonMenuItems: MenuItem[] = [
  {
    text: "Dashboard",
    icon: <InboxIcon className="text-green-500" />,
    path: "/admin",
    submenus: [],
  },
];

export const adminMenuItems: MenuItem[] = [
  // {
  //   text: "Order",
  //   icon: <ShoppingBasketOutlined className="text-purple-500" />,
  //   path: "/order-list",

  //   submenus: [],
  // },
  // {
  //   text: "Users",
  //   icon: <ManageAccounts className="text-blue-600" />,
  //   path: "/users",
  //   submenus: [
  //     {
  //       text: "Add Users",
  //       path: "/add-user",
  //     },
  //     {
  //       text: "User List",
  //       path: "/user-list",
  //     },
  //   ],
  // },

  {
    text: "Product",
    icon: <DryCleaningIcon className="text-red-500" />,
    path: "/admin/products",

    submenus: [
      {
        text: "Product List",
        path: "/admin/products",
      },
    ],
  },

  // {
  //   text: "Category",
  //   icon: <CategoryIcon className="text-yellow-500" />,
  //   path: "/category",

  //   submenus: [
  //     {
  //       text: "Add Category",
  //       path: "/add-category",
  //     },
  //     {
  //       text: "Category List",
  //       path: "/category-list",
  //     },
  //     {
  //       text: "Add SubCategory",
  //       path: "/add-subCategory",
  //     },
  //     {
  //       text: "Subcategory List",
  //       path: "/subCategory-list",
  //     },
  //   ],
  // },
  // {
  //   text: "Variant",
  //   icon: <Sell className="text-blue-600" />,
  //   path: "/variant",

  //   submenus: [
  //     {
  //       text: "Add Variant",
  //       path: "/add-variant",
  //     },
  //     {
  //       text: "Variant List",
  //       path: "/variant-list",
  //     },
  //   ],
  // },

  // {
  //   text: "Blog",
  //   icon: <Article className="text-teal-500" />,
  //   path: "/blogs",

  //   submenus: [
  //     {
  //       text: "Add Blog",
  //       path: "/add-blog",
  //     },
  //     {
  //       text: "Blog List",
  //       path: "/blog-list",
  //     },
  //   ],
  // },
  // {
  //   text: "Faq",
  //   icon: <LiveHelp className="text-red-400 " />,
  //   path: "/faq",

  //   submenus: [
  //     {
  //       text: "Add Faq",
  //       path: "/add-faq",
  //     },
  //     {
  //       text: "Faq List",
  //       path: "/faq-list",
  //     },
  //   ],
  // },
  // {
  //   text: "Review",
  //   icon: <ReviewsOutlined className="text-blue-500" />,
  //   path: "/review-list",

  //   submenus: [],
  // },
  // {
  //   text: "Notification",
  //   icon: <Notifications className="text-purple-500" />,
  //   path: "/notification-list",

  //   submenus: [],
  // },
  // {
  //   text: "Dynamic",
  //   icon: <Pages className="text-sky-800 " />,
  //   path: "/dynamic",

  //   submenus: [
  //     {
  //       text: "Add Dynamic",
  //       path: "/add-dynamic",
  //     },
  //     {
  //       text: "Dynamic List",
  //       path: "/dynamic-list",
  //     },
  //   ],
  // },
];
