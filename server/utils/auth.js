import jwt from "jsonwebtoken"

const secret = 'mysecretsshhhhh';
const expiration = '24hr';

export function signToken({ username, email, _id }) {
  
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

export function authMiddleware({ req }) {
  // allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // separate "Bearer" from "<tokenvalue>"
  if (req.headers.authorization) {
    token = token
      .split(' ')
      .pop()
      .trim();
  }

  // if no token, return request object as is
  if (!token) {
    return req;
  }

  // decode and attach user data to request object
  const verifyToken = jwt.verify(token, secret, (err, vt) => {
    if (err) {
      console.log("Invalid token",err)
    }
    return vt;
  });
  req.user = verifyToken;
  return req;
};