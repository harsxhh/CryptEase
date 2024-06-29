import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decodedToken=jwt.verify(token,process.env.TOKEN_SECRET)
        req.user=decodedToken;
        next();
      }
      catch(err){
          return res.status(500).send(err.message);
      }
}
