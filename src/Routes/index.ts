import { Router } from "express";
import MessagesRouter from "./Messages";
import UserRouter from "./Users"

const router = Router();

router.use('/messages', MessagesRouter);
router.use('/users', UserRouter);

export default router;