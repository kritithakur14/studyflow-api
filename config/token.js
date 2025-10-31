import jwt from "jsonwebtoken";

const genToken =  (userId) => {
  try {
    let token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log("token generation error", error);
  }
};
export default genToken;


//priya - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTA0MmM5NTEwYjc3YzViNjVmZTAwNDgiLCJpYXQiOjE3NjE4ODI2MjksImV4cCI6MTc2MjQ4NzQyOX0.yARwQ_ymIg89-7w4vF0r6WcH0pBsjE5joMU4Y307qoM 