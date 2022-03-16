import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  console.log(`Body: ${JSON.stringify(req.body)}`);

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }

      req.user = user;
      console.log(user);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export default authenticateJWT;
