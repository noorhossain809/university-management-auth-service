import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshResponseToken,
} from './auth.interface';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import config from '../../../config';
import bcrypt from 'bcrypt';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // check user exist
  // const user = new User();
  // const isExistUser = await user.isExistUser(id);

  const isExistUser = await User.isExistUser(id);

  if (!isExistUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  // password match
  if (
    isExistUser.password &&
    !(await User.isPasswordMatched(password, isExistUser.password))
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Password does not match');
  }

  // create access token && refresh token
  const { id: userId, role, needsPasswordChange } = isExistUser;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshResponseToken> => {
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
    console.log(verifiedToken);
  } catch (err) {
    // err
    throw new ApiError(StatusCodes.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { userId, role } = verifiedToken;
  // checking deleted user refresh token
  const isExistUser = await User.isExistUser(userId);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  // Generate new token
  const newAccessToken = jwtHelpers.createToken(
    { id: isExistUser.id, role: isExistUser.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
) => {
  const { oldPassword, newPassword } = payload;

  // // checking exist user
  // const isExistUser = await User.isExistUser(user?.userId);
  // console.log('isuser', isExistUser);

  // alternative way
  const isExistUser = await User.findOne({ id: user?.userId }).select(
    '+password'
  );

  if (!isExistUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  // checking old password
  if (
    isExistUser.password &&
    !(await User.isPasswordMatched(oldPassword, isExistUser.password))
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Old Password is incorrect');
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
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
