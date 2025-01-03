export default function globalException(err, req, res, next) {
  console.error(err);
  return res.status(500).json({
    message: "Internal Server Error",
  });
}
