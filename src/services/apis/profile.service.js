import { postRequest } from "../apiClient"
import { API_ROUTES } from "../../constants/apiRoutes"

export const fetchUserProfile = (payload) => {
    postRequest(API_ROUTES.USER_PROFILE, payload)
};
