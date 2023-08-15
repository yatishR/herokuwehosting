// import { NextFunction } from "express";
import { Request ,Response,NextFunction} from "express"
import { ExpressRequestInterface } from "../types/request.interface";
import Blacklist  from '../model/user.logout'

// export async function Logout(req:ExpressRequestInterface,res:Response,next:NextFunction) {
//     try {
//       const authHeader = req.headers['token']; // get the session cookie from request header
//       if (!req.user) {
//         return res.sendStatus(204);
//       }
//       //return res.sendStatus(204); // No content
//       const cookie = authHeader.split('=')[1]; // If there is, split the cookie string to get the actual jwt token
//       const accessToken = cookie.split(';')[0];
//       const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
//       // if true, send a no content response.
//       if (checkIfBlacklisted) return res.sendStatus(204);
//       // otherwise blacklist token
//       const newBlacklist = new Blacklist({
//         token: accessToken,
//       });
//       await newBlacklist.save();
//       // Also clear request cookie on client
//       res.setHeader('Clear-Site-Data', '"cookies", "storage"');
//       res.status(200).json({ message: 'You are logged out!' });
//     } 
//     catch (err) {
//     //   res.status(500).json({
//     //     status: 'error',
//     //     message: 'Internal Server Error',
//     //   });
//     }
//     res.end();
//   }


export const LogoutUser = async(req:ExpressRequestInterface,res:Response,next:NextFunction)=>{
    try{
        const authHeader = req.headers['cookie']; 
        if(!authHeader)
            return res.sendStatus(401);
        
        const cookie = authHeader.split('=')[1];
        const accessToken = cookie.split(';')[0];
        const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
      // if true, send a no content response.
      if (checkIfBlacklisted) return res.sendStatus(204);
      // otherwise blacklist token
      const newBlacklist = new Blacklist({
        token: accessToken,
      });
      await newBlacklist.save();
      // Also clear request cookie on client
      res.setHeader('Clear-Site-Data', '"cookies", "storage"');
      res.status(200).json({ message: 'You are logged out!' });

    //  const newBoard = new BoardModel({
    //     title:req.body.title,
    //     userId:req.user.id
    //  });
    //  const savedBoard = await newBoard.save();
    //  res.send(savedBoard);
    }
    catch (err){
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
    })
  }
  res.end();
}
