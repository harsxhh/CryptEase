import express from 'express'
const router = express.Router();
import { registerUser, loginUser, getUser ,SendUPIMoney} from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';


router.get('/', verifyToken, getUser)
router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.post('/sendupimoney', verifyToken, SendUPIMoney)

export default router;

