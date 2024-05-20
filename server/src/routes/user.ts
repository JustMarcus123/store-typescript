import { Router, Request, Response } from 'express';
import { UserModel } from '../models/user';
import { UserErrors } from '../Error';
import bcrypt from 'bcrypt';

const router = Router();

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

export { router as userRouter };
