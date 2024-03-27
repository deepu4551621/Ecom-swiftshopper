const User = require('../../Modal/user')

const Login = async (req, res) => {
  const { id } = req.body;

  try {
    // Fetch user data from id
    const userDataResponse = await fetch(`https://dummyjson.com/users/${id}`);
    const userData = await userDataResponse.json();

    // Extract username and password from user data
    const { username, password } = userData;

    // Make the login API request
    const loginResponse = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    // Check if login was successful
    if (loginResponse.ok) {
      const authData = await loginResponse.json();
      // console.log("authData:", authData);
      
      // Save userData in the User model
      const exist= User.findById({id});
      // console.log('userId', exist)
      const user = new User(authData);
      await user.save();
      // user.collection('users').sav;

      // Send token and user data to the frontend
      res.json({ token: authData.token, userData });
    } else {
      res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
};
const Logout= async(req,res)=>{
 const {token}=req.body;
 console.log('token', token)
 if(token){
  const user = await User.findOne({token}).
  console.log('user:', user.json())
 }
 
}
module.exports = { Login, Logout };
