export enum RouteNames {
  // base URL
  HOME = "/bouquet-shop/",
  
  //User routes
  SHOP = "shop",
  FAVORITE = "favorite",
  FEEDBACK = "feedback",
  ABOUTUS = "about-us",
  CHECKOUT = "orders",
  REMINDER = "reminder",
  FOR_BEGINNERS_QUERY = "?forBeginners=true",
  PET_SAFE_QUERY = "?isPetSafe=true",
  
  //admin routes
  ADMIN_DASHBOARD = "admin-dashboard",
  ADMIN_FEEDBACKS = "admin-feedbacks",
  ADMIN_PRODUCTS = "admin-products",
  ADMIN_ORDERS = "admin-orders",
  
  //auth routes
  LOGIN = "/bouquet-shop/login",
  SIGNUP = "/bouquet-shop/signup",
  RESET_PASSWORD = "/bouquet-shop/reset-password",
}