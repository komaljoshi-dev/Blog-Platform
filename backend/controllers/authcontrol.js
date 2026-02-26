import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const register = async (req,res,next) => {
    
    try{
      const {username ,email ,password} = req.body;
      
        //check if all fields are filled
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields required' });
        }
        
        //check password strength
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
          return res.status(400).json({ message: 'Password must contain at least one letter and one number' });
        }

        //check password length
        if (password.length < 6) {
          return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        //check if user already exists
        const existingUser = await User.findOne({  $or: [{ email }, { username }] });
          if (existingUser) return res.status(400).json({ message : 'User already exists'});
        
        //hashing password
        const hashedPassword = await bcrypt.hash(password,10);
               
        // Create user
        const newUser = new User({ username, email, password: hashedPassword});
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' }); // No token in response
    }
    catch(err){
        next(err);
    }
}

// Login (Token is generated here)
export const login = async (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    const { email, password } = req.body;

    // Check if fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
        const err = new Error('Invalid credentials');
        err.statusCode = 400;
        throw err;
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const err = new Error('Invalid credentials');
        err.statusCode = 400;
        throw err;
    }
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id},
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
        message: 'Login successful',
        token,
        user: {id: user._id,
            username: user.username,
            email: user.email} 
        });
  } 
  catch (err) {
    next(err);  
    }
};

//get current user
//this controller is used to get the data of user currently logged in the browser
export const getCurrentUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

//token =eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTlkNGUxNWUxNzI1NGE0YzRlNTQwOTIiLCJpYXQiOjE3NzE5MTY5MDcsImV4cCI6MTc3MTkyMDUwN30.rRGXeL34HtBJ_mFBmnGk3sDW2navdXK_pZNyjU1-T8I