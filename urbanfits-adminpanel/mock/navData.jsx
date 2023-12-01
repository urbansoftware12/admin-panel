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
import { Vendoricon } from "@/public/sidebaricons/Vendoricon";
import React from "react";

export const sidebarItems = [

  {
    id: 1,
    label: "Dashboard",
    icon: <Dashboardicon />,
    navlink: "/",
  },
  {
    id: 2,
    label: "Products",
    icon: <ProductIcon />,
    expanded: false,
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
    id: 3,
    label: "Categories",
    icon: <CategoriesIcon />,
    expanded: false,
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
    id: 4,
    label: "Orders",
    icon: <CartIcon />,
    expanded: false,
    subrows: [
      {
        label: "All Orders",
        navlink: "/orders/neworder",
      },
      {
        label: "orderhistory",
        navlink: "/orders/orderhistory",
      },
    ],
  },
  {
    id: 5,
    label: "Transactions",
    icon: <DollarIcon />,
    expanded: false,
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
    id: 6,
    label: "Users",
    icon: <ProductIcon />,
    expanded: false,
    subrows: [
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
    ],
  },
  {
    id: 7,
    label: "Vendors",
    icon: <ProductIcon />,
    expanded: false,
  },
  {
    id: 8,
    label: "Account",
    icon: <AccountIcon />,
    expanded: false,
    subrows: [
      {
        label: "General Settings",
        navlink: "/accounts/generalsetting",
      },
      {
        label: "Account Settings",
        navlink: "/accounts/accountsetting",
      },
      {
        label: "Inventory Managment",
        navlink: "/accounts/inventorymanagement",
      },
    ],
  },
  {
    id: 9,
    label: "Payment Methods",
    icon: <PaymentIcon />,
    expanded: false,
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
    id: 10,
    label: "Coupon",
    icon: <CouponIcon />,
    expanded: false,
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
    id: 11,
    label: "Shipping Settings",
    icon: <ProductIcon />,
    expanded: false,
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
    id: 12,
    label: "Reviews",
    icon: <ReviewsIcon />,
    // navlink: "/",
    expanded: false,
  },
  {
    id: 13,
    label: "Brands",
    icon: <BrandIcon />,
    // navlink: "/",
    expanded: false,
  },
  {
    id: 14,
    label: "Authentication",
    icon: <ExitIcon />,
    // navlink: "/",
    expanded: false,

  },
  {
    id: 15,
    label: "Icons",
    icon: <DaimondIcon />,
    // navlink: "/",
    expanded: false,

  },
  {
    id: 16,
    label: "Other Pages",
    icon: <PagesIcon />,
    // navlink: "/",
    expanded: false,

  },
  {
    id: 17,
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
    navlink: "/accounts/generalsetting",
  },
  {
    label: "Account Settings",
    navlink: "/accounts/accountsetting",
  },
  {
    label: "Inventory Managment",
    navlink: "/accounts/inventorymanagement",
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