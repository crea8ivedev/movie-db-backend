export default function authMiddleware(req, res, next) {
  if (req.isUnauthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}
