// authUser middleware protects routes.

// It checks if the request has a valid token in cookies.

// If valid → attaches userId to request and lets it continue.

// If invalid/missing → blocks the request with "Not Authorized".

// import jwt from "jsonwebtoken";

// const authUser = async(req,res,next)=>{
//     const {token} = req.cookies;

//     if (!token) {
//         return res.json({success:false,message:'Not Authorized'})
//     }
//     try {
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
//         if (tokenDecode.id) {
//             req.body.userId = tokenDecode.id;
//          }
//          else{
//             return res.json({succes:false,message:'Not Authorized'});
//          }
//          next();
//      } catch (error) {
//         res.json({success:false,message:error.message});
//     }
// }
// export default authUser

import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) { 
      // safer place to store
      req.userId = tokenDecode.id;
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
