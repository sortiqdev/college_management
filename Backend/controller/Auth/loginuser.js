const Organization = require("../../models/Organization");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginuser = async (req, res) => {
  const { userid, password } = req.body;

  try {
    const existinguser = await Organization.findOne({ userid });

    if (!existinguser) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      existinguser.adminpassword
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        userid: existinguser.userid,
        role: "organization",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = loginuser;