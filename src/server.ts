console.log("server");
import express from "express";
import {Server, createServer} from "http";
import mongoose from "mongoose";
import * as usersController from "./controller/users";
import * as boardsController from "./controller/boards";
import * as addressController from "./controller/address"
import * as logOutController from "./controller/logout"
import bodyParser from "body-parser";
import authMiddleware from './middlewares/auth';
import cors from 'cors'
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.set("toJSON",{
    virtuals:true,
    transform:(_, converted)=>{
        delete converted._id
    }
//     transform: (_, converted._id)=>{
//         delete converted._id
//     }
});
app.get('/', (req,res)=>{
   res.send("Api is Up");
});
// register controller
app.post('/api/users', usersController.register);
app.post('/api/users/login', usersController.login);
app.get('/api/user', authMiddleware,usersController.currentUser);
app.get('/api/boards', authMiddleware,boardsController.getBoards);
app.post('/api/boards', authMiddleware,boardsController.createBoard);
app.get('/api/address', authMiddleware,addressController.getUserAddress);
app.post('/api/address', authMiddleware,addressController.createUsreAddess);
app.get('/api/LogoutUser', authMiddleware,logOutController.LogoutUser);


io.on('connectin',()=>{
    console.log("socket io")
});

mongoose.connect('mongodb://localhost:27017/loans-ui').then(()=>{
    console.log("connect to data base");
    httpServer.listen(4001,()=>{
        console.log("Api is listening on port 4001");
    });
})

