import jwt from "jsonwebtoken";
import ENV from "./ENV.ts";
import database from "../db/index.ts";
import { fetchRefreshToken } from "../helper/helper.ts";

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

export const createRefreshToken = async (id: number) => {
  const refreshToken = jwt.sign({ id }, ENV.REFRESH_TOKEN_SECRET, {
    expiresIn: ENV.REFRESH_TOKEN_EXPIRY,
  });

  const fetchToken = await fetchRefreshToken(id);

  let query;

  if (fetchToken) {
    query = await database.query(
      `UPDATE refreshtoken
       SET refreshtokenhash = $1
       WHERE user_id = $2
       RETURNING *`,
      [refreshToken, id],
    );
  } else {
    query = await database.query(
      `INSERT INTO refreshtoken (user_id, refreshtokenhash)
       VALUES ($1, $2)
       RETURNING *`,
      [id, refreshToken],
    );
  }

  return query.rows[0].refreshtokenhash;
};
