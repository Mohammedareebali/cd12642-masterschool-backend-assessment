//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require("express-async-handler");
//register
const register = asyncHandler(async (req, res) => {
    const { username, email, password } =  (req).query;
  
  
    try {
      // Check if user with given email exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists.' });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
  
      // Create new user
      const newUser = new User({
        username,
        email,
        password: hash
      });
  
      // Save new user
      await newUser.save();
  
      // Create and sign JWT token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
  
      res.status(201).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  //login 
  const login = asyncHandler(async (req, res) => {
    //used req.query for testing postman ohterwise use req.body
      const { email, password } = req.query;
     
    
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Email or password is incorrect' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Email or password is incorrect' });
      }
      
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  //logout
  const logout = asyncHandler(
    async (req, res) => {
        const token = req.headers.authorization.split(' ')[1]; // get the token from the authorization header
        const tokenExists = await TokenBlacklist.findOne({ token }); // check if the token is already blacklisted
      
        if (tokenExists) {
          return res.sendStatus(401); // token is already invalidated
        }
      
        // add the token to the blacklist
        const newToken = new TokenBlacklist({ token });
        await newToken.save();
      
        res.sendStatus(200); // token invalidated
      }
  )
  module.exports = {
    register,login,logout
  }