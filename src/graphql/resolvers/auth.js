const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user.model");

exports.authResolver = {
  loginUser: async (args) => {
    let argData = args.loginInput;
    //find staff in the database
    const user = await User.findOne({ email: argData.email });
    //check if the user exists
    if (user) {
      //create token
      const token = jwt.sign(
        {
          _id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        },
        `${process.env.JWT_SECRET}`,
        {
          expiresIn: "4h"
        }
      );
      const tokenExpiration = 4;
      //verify password
      const checkPassword = bcrypt.compareSync(argData.password, user.password);
      //if password is verified
      if (checkPassword) {
        return {
          _id: user._id.toString(),
          email: user.email,
          role: user.role,
          token: token,
          tokenExpiration: tokenExpiration
        };
      } else {
        throw new Error(`Email or Password is Incorrect!`);
      }
    } else {
      throw new Error(`Account does not exist!`);
    }
  },
  createAccount: async (args) => {
    const hashPassword = bcrypt.hashSync(args.userInput.password, 10);
    //create customer object
    let user = new User({
      firstName: args.userInput.firstName,
      lastName: args.userInput.lastName,
      role: args.userInput.role,
      email: args.userInput.email,
      password: hashPassword
    });

    try {
      //save user to database
      let result = await user.save();
      return { ...result._doc, password: null };
    } catch (err) {
      return err;
    }
  }
};
