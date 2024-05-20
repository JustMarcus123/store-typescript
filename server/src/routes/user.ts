import { Router, Request, Response, NextFunction } from 'express';
import { IUser, UserModel } from '../models/user';
import { UserErrors } from '../Error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

// new user registering
router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });

        if (user) {
            return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXIST });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, password: hashedPassword });
        await newUser.save();

        res.json({ message: "New user successfully registered" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ type: 'INTERNAL_SERVER_ERROR', error: err.message });
    }
});

// for user login 
router.post('/login', async(req:Request, res:Response)=>{
    const {username, password}= req.body;

    try {

        const user:IUser = await UserModel.findOne({username});

        if(!username){
            return res.status(400).json({type:UserErrors.NO_USER_FOUND})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(404).json({type:UserErrors.WRONG_CREDENTIALS})
        }
        
        const token = jwt.sign({id: user._id}, 'secret')

        res.json({token, userID:user._id})

    } catch (error) {
        res.status(500).json({type:error});

    }
});

//jwt authentication
export const verifyToken =(req:Request, res:Response, next:NextFunction)=>{
    const authHeader = req.headers.authentication;
    if(authHeader){
        jwt.verify(authHeader,"secret",(err)=>{
            if(err){
                return res.sendStatus(403);
            }

            next();
        });
    }
}

export { router as userRouter };
