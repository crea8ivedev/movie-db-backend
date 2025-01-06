export default function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.setHeader("WWW-Authenticate", 'Basic realm="API Docs Protected"');
    return res.status(401).send("Authorization required.");
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");

  const validUsername = process.env.API_DOCS_AUTH_USERNAME || "admin";
  const validPassword = process.env.API_DOCS_AUTH_PASSWORD || "admin";

  if (username === validUsername && password === validPassword) {
    return next();
  }

  res.setHeader("WWW-Authenticate", 'Basic realm="API Docs Protected"');
  return res.status(401).send("Invalid credentials.");
}
