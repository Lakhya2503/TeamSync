import jwt from "jsonwebtoken";
import ENV from "./ENV";

export const createAccessToken = (user: {
  id: number;
  email: string;
  username: string;
}) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    ENV.ACCESS_TOKEN_SECRET,
    {
      expiresIn: ENV.ACCESS_TOKEN_EXPIRY,
    },
  );
};

export const createRefreshToken = (id: string | number) => {
  return jwt.sign({ id }, ENV.REFRESH_TOKEN_SECRET, {
    expiresIn: ENV.REFRESH_TOKEN_EXPIRY,
  });
};
