const {
  hashPassword,
  generateToken,
  comparePassword,
} = require("../utils/util");
const { validateUserData, emailFormatValid } = require("../utils/validators");

const User = require("../models/user");

class AuthController {
  //signup user

  signup = async (req, res, next) => {
    const { email, password } = req.body;
    // return res.status(400).json({ message: "Arguments not provided" });

    if (!email || !password) {
      return res.status(400).json({ message: "Arguments not provided" });
    }
    const [validatedData, err] = validateUserData({
      email,
      password,
    });

    if (err && err.length > 0) {
      return res
        .status(400)
        .json({ errors: err, message: "Data validation error" });
    }
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(409)
          .json({ message: "User with email already exists" });
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);

      const newUser = new User({
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });
      const userNew = await newUser.save();

      const userToken = generateToken({ _id: userNew._id.toString() });
      res.json({ userToken });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  //login user

  login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Arguments not provided" });
    }

    if (emailFormatValid(email)) {
      return res.status(400).json({ errors: ["email format invalid"] });
    }
    try {
      // Find the provider in the database
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      // Compare the password with the stored hash
      const passwordMatch = await comparePassword(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials pass" });
      }

      const userToken = generateToken({ _id: user._id.toString() });
      res.status(201).json({
        userToken,
        user: {
          email: user.email,
          _id: user._id,
          cart: user.cart,
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
module.exports = new AuthController();
