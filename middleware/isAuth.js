import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }
    const token = authHeader.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    res.status(500).json({ message: "Invalid or expired token" });
  }
};
export default isAuth;
