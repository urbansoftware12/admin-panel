// import DashboardIcon from "../public/sidebaricons/Dashboardicon.jsx";
import { AccountIcon } from "@/public/sidebaricons/AccountIcon";
import { BrandIcon } from "@/public/sidebaricons/BrandIcon";
import { CartIcon } from "@/public/sidebaricons/CartIcon";
import { CategoriesIcon } from "@/public/sidebaricons/CategoriesIcon";
import { CouponIcon } from "@/public/sidebaricons/CouponIcon";
import { DaimondIcon } from "@/public/sidebaricons/DaimondIcon";
import { Dashboardicon } from "@/public/sidebaricons/Dashboardicon";
import { DollarIcon } from "@/public/sidebaricons/DollarIcon";
import { ExitIcon } from "@/public/sidebaricons/ExitIcon";
import { PagesIcon } from "@/public/sidebaricons/PagesIcon";
import { PaymentIcon } from "@/public/sidebaricons/PaymentIcon";
import { ProductIcon } from "@/public/sidebaricons/ProductIcon";
import { ReviewsIcon } from "@/public/sidebaricons/ReviewsIcon";
import React from "react";

export const sidebarItems = [
  {
    label: "Dashboard",
    icon: <Dashboardicon />,
    navlink: "/",
  },
  {
    label: "Products",
    icon: <ProductIcon />,
    subrows: [
      {
        label: "All Products",
        navlink: "/products/allproducts",
      },
      {
        label: "Add New Product",
        navlink: "/products/addproduct",
      },
      {
        label: "Add Bundle",
        navlink: "/products/addbundle",
      }
    ],
  },
  {
    label: "Categories",
    icon: <CategoriesIcon />,
    subrows: [
      {
        label: "All Categories",
        navlink: "/productcategories"
      },
      {
        label: "Add New Category",
        navlink: "/productcategories",
      },
    ],
  },
  {
    label: "Orders",
    icon: <CartIcon />,
    navlink: "/orders",
  },
  {
    label: "Transactions",
    icon: <DollarIcon />,
    subrows: [
      {
        label: "All Transactions",
        navlink: "/transactions/transaction",
      },
      {
        label: "Invoice",
        navlink: "/transactions/invoice",
      },
      {
        label: "Add New Invoice",
        navlink: "/",
      },
    ],
  },
  {
    label: "Users",
    icon: <ProductIcon />,
    subrows: [
      {
        label: "All users",
        navlink: "/user/userlist",
      },
      {
        label: "User tasks",
        navlink: "/user/tasks",
      },
      {
        label: "Add New User",
        navlink: "/user/add-user",
      },
      {
        label: "Change Password",
        navlink: "/",
      },
      {
        label: "Authentication",
        navlink: "/",
      },
      {
        label: "Security Settings",
        navlink: "/",
      },
      {
        label: "Notifications",
        navlink: "/",
      },
    ],
  },
  {
    label: "Vendors",
    icon: <ProductIcon />,
  },
  {
    label: "Account",
    icon: <AccountIcon />,
    subrows: [
      {
        label: "General Settings",
        navlink: "/settings/general/",
      },
      {
        label: "Account Settings",
        navlink: "/settings/account",
      },
      {
        label: "Inventory Managment",
        navlink: "/settings/inventory",
      },
    ],
  },
  {
    label: "Payment Methods",
    icon: <PaymentIcon />,
    subrows: [
      {
        label: "All Payment Methods",
        navlink: "/",
      },
      {
        label: "Add New Payment",
        navlink: "/",
      },
    ],
  },
  {
    label: "Coupon",
    icon: <CouponIcon />,
    subrows: [
      {
        label: "All Coupons",
        navlink: "/coupons",
      },
      {
        label: "Add New Coupon ",
        navlink: "/coupons/create-coupon",
      },
    ],
  },
  {
    label: "Shipping Settings",
    icon: <ProductIcon />,
    subrows: [
      {
        label: "All Shipping Zone",
        navlink: "/shippingsettings/shipping",
      },
      {
        label: "Add Shipping Zone",
        navlink: "/shippingsettings/addzone",
      }
    ],
  },
  {
    label: "Reviews",
    icon: <ReviewsIcon />,
    // navlink: "/",
  },
  {
    label: "Brands",
    icon: <BrandIcon />,
    // navlink: "/",
  },
  {
    label: "Authentication",
    icon: <ExitIcon />,
    // navlink: "/",

  },
  {
    label: "Icons",
    icon: <DaimondIcon />,
    // navlink: "/",

  },
  {
    label: "Other Pages",
    icon: <PagesIcon />,
    // navlink: "/",

  },
  {
    label: "Profile (temp)",
    icon: <DaimondIcon />,
    subrows: [
      {
        label: "Profile",

        navlink: "/profile",
      },
    ]
  },

];

export const SearchQueryData = [
  {
    label: "Dashboard",
    navlink: "/dashboard",
  },
  {
    label: "Profile",
    navlink: "/profile",
  },
  {
    label: "All Products",
    navlink: "/products/allproducts",
  },
  {
    label: "Add New Product",
    navlink: "/products/addproduct",
  },
  {
    label: "Add Bundle",
    navlink: "/products/addbundle",
  },
  {
    label: "Attributes",
    navlink: "/",
  },
  {
    label: "All Categories",
    navlink: "/productcategories"
  },
  {
    label: "Add Category",
    navlink: "/productcategories",
  },
  {
    label: "All Orders",
    navlink: "/orders/neworder",
  },
  {
    label: "orderhistory",
    navlink: "/orders/orderhistory",
  },
  {
    label: "All Transactions",
    navlink: "/transactions/transaction",
  },
  {
    label: "Invoice",
    navlink: "/transactions/invoice",
  },
  {
    label: "Addnew",
    navlink: "/",
  },
  {
    label: "All users",
    navlink: "/user/userlist",
  },
  {
    label: "Add New User",
    navlink: "/user/add-user",
  },
  {
    label: "Change Password",
    navlink: "/",
  },
  {
    label: "Authentication",
    navlink: "/",
  },
  {
    label: "Security Settings",
    navlink: "/",
  },
  {
    label: "Notifications",
    navlink: "/",
  },
  {
    label: "Vendors",
    navlink: "",
  },
  {
    label: "General Settings",
    navlink: "/settings/general/",
  },
  {
    label: "Account Settings",
    navlink: "/settings/account",
  },
  {
    label: "Inventory Managment",
    navlink: "/settings/inventory",
  },
  {
    label: "All Payment Methods",
    navlink: "/",
  },
  {
    label: "Add New Payment",
    navlink: "/",
  },
  {
    label: "All Coupon",
    navlink: "/coupon/allcoupon",
  },
  {
    label: "Add New Coupon ",
    navlink: "/",
  },
  {
    label: "All Shipping Zone",
    navlink: "/shippingsettings/shipping",
  },
  {
    label: "Add Shipping Zone",
    navlink: "/shippingsettings/addzone",
  },
  {
    label: "Reviews",
    navlink: "",
  },
  {
    label: "Brands",
    navlink: "",
  },
  {
    label: "Authentication",
    navlink: "",
  },
  {
    label: "Icons",
    navlink: "",
  },
  {
    label: "Other Pages",
    navlink: "",
  }
];