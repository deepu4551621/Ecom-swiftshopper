
const authenticateUser = async (req,res,next)=>{
  try {
    const token = req.headers.authorization
    //  console.log("middleware", token)
    const response =  await fetch('https://dummyjson.com/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        if(response.ok){
          const userData = await response.json();
          // console.log('userData->', userData)
          res.json({success:true, userData});
        }
        
      next();
  } catch (error) {
    res.json({serverAuth: error})
  }
}
module.exports =authenticateUser;