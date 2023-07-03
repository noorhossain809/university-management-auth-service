"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = payload;
    // check user exist
    // const user = new User();
    // const isExistUser = await user.isExistUser(id);
    const isExistUser = yield user_model_1.User.isExistUser(id);
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User does not exist');
    }
    // password match
    if (isExistUser.password &&
        !(yield user_model_1.User.isPasswordMatched(password, isExistUser.password))) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Password does not match');
    }
    // create access token && refresh token
    const { id: userId, role, needsPasswordChange } = isExistUser;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_secret_in);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
        console.log(verifiedToken);
    }
    catch (err) {
        // err
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userId, role } = verifiedToken;
    // checking deleted user refresh token
    const isExistUser = yield user_model_1.User.isExistUser(userId);
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User does not exist');
    }
    // Generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({ id: isExistUser.id, role: isExistUser.role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_secret_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    // // checking exist user
    // const isExistUser = await User.isExistUser(user?.userId);
    // console.log('isuser', isExistUser);
    // alternative way
    const isExistUser = yield user_model_1.User.findOne({ id: user === null || user === void 0 ? void 0 : user.userId }).select('+password');
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User does not exist');
    }
    // checking old password
    if (isExistUser.password &&
        !(yield user_model_1.User.isPasswordMatched(oldPassword, isExistUser.password))) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Old Password is incorrect');
    }
    //  // hash password before saving
    //   const newHashPassword = await bcrypt.hash(
    //     newPassword,
    //     Number(config.default_salt_rounds)
    //   );
    //   const updatedData = {
    //     password: newHashPassword,
    //     needsPasswordChange: false,
    //     passwordChangeAt: new Date(),
    //   };
    //   // updated password
    //   await User.findOneAndUpdate({ id: user?.userId }, updatedData);
    // alternative way
    isExistUser.password = newPassword;
    isExistUser.needsPasswordChange = false;
    // updating using save()
    isExistUser.save();
});
exports.AuthService = {
    loginUser,
    refreshToken,
    changePassword,
};
