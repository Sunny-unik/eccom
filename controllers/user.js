const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email) return res.status(400).send({ message: "Email is required" });
      const payload =
        email === "admin@codesfortomorrow.com"
          ? { email, password: await bcrypt.hash("Admin123!@#", 10) }
          : null;
      if (!payload) return res.status(404).send({ message: "User not found" });

      if (await bcrypt.compare(password, payload.password)) {
        const accessToken = jwt.sign(
          JSON.parse(JSON.stringify(payload)),
          process.env.TOKEN_SECRET,
          { expiresIn: 86400 } // expires in 24 hours
        );
        const cookieOptions = {
          sameSite: "strict",
          path: "/",
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // expires in 24 hours
          httpOnly: true,
        };
        const data = { ...payload._doc, password: undefined };
        res
          .cookie("authToken", accessToken, cookieOptions)
          .send({ data, message: "Login Success" });
      } else res.status(401).send({ message: "Wrong Password" });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
