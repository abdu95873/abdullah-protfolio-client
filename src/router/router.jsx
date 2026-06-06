import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Error404 from "../pages/ErrorSection/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: Component } = await import("../pages/Home/Home/Home");
          return { Component };
        },
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    errorElement: <Error404 />,
    children: [
      {
        path: "login",
        lazy: async () => {
          const { default: Component } = await import("../pages/Authentication/Login/Login");
          return { Component };
        },
      },
      {
        path: "register",
        lazy: async () => {
          const { default: Component } = await import("../pages/Authentication/Register/Register");
          return { Component };
        },
      },
      {
        path: "forgotPassword",
        lazy: async () => {
          const { default: Component } = await import("../pages/Authentication/ForgotPassword/ForgotPassword");
          return { Component };
        },
      },
      {
        path: "forgotPassword/enterCode",
        lazy: async () => {
          const { default: Component } = await import("../pages/Authentication/ForgotPassword/EnterCode");
          return { Component };
        },
      },
      {
        path: "forgotPassword/resetPassword",
        lazy: async () => {
          const { default: Component } = await import("../pages/Authentication/ForgotPassword/ResetPassword");
          return { Component };
        },
      },
    ],
  },
  {
    path: "/dashboard",
    lazy: async () => {
      const { default: Component } = await import("../pages/Dashboard/DashboardRoot");
      return { Component };
    },
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: Component } = await import("../pages/Dashboard/DashboardHome/DashboardHome");
          return { Component };
        },
      },
      {
        path: "banner",
        lazy: async () => {
          const { default: Component } = await import("../pages/Dashboard/EditBanner/EditBanner");
          return { Component };
        },
      },
      {
        path: "about",
        lazy: async () => {
          const { default: Component } = await import("../pages/Dashboard/EditAbout/EditAbout");
          return { Component };
        },
      },
      {
        path: "services",
        lazy: async () => {
          const { default: Component } = await import("../pages/Dashboard/EditServices/EditServices");
          return { Component };
        },
      },
      {
        path: "experience",
        lazy: async () => {
          const { default: Component } = await import("../pages/Dashboard/EditExperience/EditExperience");
          return { Component };
        },
      },
      {
        path: "projects",
        lazy: async () => {
          const { default: Component } = await import("../pages/Dashboard/EditProjects/EditProjects");
          return { Component };
        },
      },
      {
        path: "contact",
        lazy: async () => {
          const { default: Component } = await import("../pages/Dashboard/EditContact/EditContact");
          return { Component };
        },
      },
    ],
  },
  {
    path: "*",
    Component: Error404,
  },
]);

export default router;
