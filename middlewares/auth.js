const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).send("Session cookie not found");
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    req.decoded = { email: decode.email };
    next();
  } catch (error) /* istanbul ignore next */ {
    res.clearCookie("authToken").status(401).send(error);
    return;
  }
};
