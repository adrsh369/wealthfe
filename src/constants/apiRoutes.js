export const API_ROUTES = {
  USER_EXIST_CHECK: "/api/users/check-email",
  USER_LOGIN: "/api/auth/login",
  USER_Register: "/api/auth/register",
  USER_PROFILE: "/api/users/getprofile",

  GOLD_INVESTED_SUMMARY: "/api/gold/invested-summary",
  GOLD_ORDER_DETAILS: "/api/gold/orders",

  CREATE_GOLD_ORDER: "/api/payments/create-order",
  CREATE_GOLD_ORDER_VERIFY: "/api/payments/verify",

  SELL_GOLD_VALIDATE: "/api/sellgold/validatesellgold",
  INITIATE_SELL_GOLD: "/api/sellgold/sellgold",

  FETCH_SELL_LIVE_PRICE: "/api/gold/sell-price",
  FETCH_GOLD_LIVE_PRICE: "/api/gold/live-price",
}
