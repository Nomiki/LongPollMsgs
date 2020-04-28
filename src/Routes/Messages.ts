import { Router, Request, Response } from "express";
import { OK, BAD_REQUEST, CREATED, NOT_FOUND } from "http-status-codes";
import { MessageDao } from "../daos/Message/MessageDao.mock";
import { MessageStatus } from "../entities/MessageStatus";

const router = Router();
const messageDao = new MessageDao();

/**
 * @typedef Message
 * @property {string} from.required - user who sends the message
 * @property {string} to.required - user to send the message to
 * @property {string} message.required - message
 */

/**
 * @typedef MessageList
 * @property {Array.<Message>} messages.required - messages
 */

/**
 * Returns message by ID
 * @route GET /messages/{id}
 * @group Messages
 * @param {string} id.path.required - the message ID
 * @returns {Message} 200 - the message json
 * @returns {Error} 404 - message with @id wasn't found
 * @returns {Error}  default - Unexpected error
 */
router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const message = await messageDao.getOne(id);
  if (message) {
    return res.status(OK).json(message);
  } else {
    return res.status(NOT_FOUND).end();
  }
});

/**
 * Create a new message
 * @route POST /messages
 * @group Messages
 * @param {Message.model} body.body.required
 * @returns {Message} 204 - Created message
 * @returns {Error} 400 - Missing body
 */
router.post("/", async (req: Request, res: Response) => {
  const message = req.body;

  if (!message || !message.from || !message.to) {
    return res.status(BAD_REQUEST).json({
      error: "Missing parameters",
    });
  }

  const addedMessage = await messageDao.add(message);
  return res.status(CREATED).json(addedMessage);
});

/**
 * Get all messages of a user
 * @route GET /messages/all/{ofUser}
 * @group Messages
 * @param {string} ofUser.path.required - the user name of the desired user
 * @returns {MessageList} 200 - Messages list for a user
 */
router.get("/all/:ofUser", async (req: Request, res: Response) => {
  const user = req.params.ofUser;
  const messages = await messageDao.getOfUser(user);
  return res.status(OK).json({ messages });
});



export default router;
