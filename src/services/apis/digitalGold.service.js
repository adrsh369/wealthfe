import { postRequest } from "../apiClient"
import { API_ROUTES } from "../../constants/apiRoutes"

export const createGoldOrder = (payload) => {
    return postRequest(API_ROUTES.CREATE_GOLD_ORDER, payload)
};
export const createGoldOrderVerify = (payload) => {
    return postRequest(API_ROUTES.CREATE_GOLD_ORDER_VERIFY, payload)
};
