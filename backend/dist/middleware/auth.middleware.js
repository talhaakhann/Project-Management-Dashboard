import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const verifyJwt = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken) {
            throw new ApiError(401, "Unauthorized request");
        }
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
        req.user = user;
        next();
    }
    catch (error) {
        throw new ApiError(401, "Invalid access token");
    }
});
//# sourceMappingURL=auth.middleware.js.map