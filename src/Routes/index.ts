import { Router } from "express";
import MessagesRouter from "./Messages";

const router = Router();

router.use('/messages', MessagesRouter);

export default router;