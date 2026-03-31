const bcrypt = require("bcrypt");

// register user
async function registerUser(req, res) {
  const { email, password } = req.body;
  const db = getDb();
  //check if user exists
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "user already exists" });
  }
  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  //save user
  await db.collection("users").insertOne({ email, password: hashedPassword });
  res.status(201).json({ message: "User registered successfully" });
}

//LOGIN
async function loginUser(req, res) {
  const { email, password } = req.body;
  const db = getDb();
  const user = await db.collection("users").findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found!" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  res.json({
    message: "Login successful",
    redirect: "/dashboard",
  });
}

module.exports = { registerUser, loginUser };
