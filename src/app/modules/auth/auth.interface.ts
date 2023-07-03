export type ILoginUser = {
  id: string;
  password: string;
  needsPassword: true | false;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken: string;
  needsPasswordChange: boolean;
};

export type IRefreshResponseToken = {
  accessToken: string;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
