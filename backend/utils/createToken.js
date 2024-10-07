import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT as an HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export const generateBusToken = (res, busId) => {
  const token = jwt.sign({ busId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  // console.log(`token => `, token);

  // Set JWT as an HTTP-Only Cookie
  res.cookie("bus_jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  // console.log(`token => `, token);
  return token;
};
