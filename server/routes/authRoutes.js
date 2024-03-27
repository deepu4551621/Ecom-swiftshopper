const express = require('express');
const router = express.Router();
const cors = require('cors');
const  {Login, Logout}  = require('./controlers/authController')
const authenticateUser  = require('../middlewares/authMiddleware')
const allowOrigins=['https://swiftshopper-b78ae.web.app',
'http://localhost:3000',
'https://swiftshopper-b78ae.firebaseapp.com' ]
router.use(cors({
    origin: allowOrigins,
    credentials:true
}));
router.post('/login', Login);
router.post('/logout', Logout);
router.get('/',authenticateUser, (req, res)=>{
    res.json({message:"user authenticated successfully"})
} );
module.exports = router;
