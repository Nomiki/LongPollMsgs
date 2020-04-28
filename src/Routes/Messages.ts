import { Router, Request, Response } from "express";
import { OK, BAD_REQUEST, CREATED, NOT_FOUND } from "http-status-codes";
import { MessageDao } from "../daos/Message/MessageDao.mock";
import { UserDao } from "../daos/User/UserDao.mock";
import { EventEmitter } from "events";
import { MessageStatus } from "../entities/MessageStatus";
import Stopwatch from "statman-stopwatch";

const router = Router();
const messageDao = new MessageDao();
const userDao = new UserDao();
const messageBus = new EventEmitter();

messageBus.setMaxListeners(20);

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
  messageBus.emit(addedMessage.to, addedMessage);
  return res.status(CREATED).json(addedMessage);
});

/**
 * Get *all* messages of a user, doesn't mark them as sent.
 * @route GET /messages/all/{ofUser}
 * @group Messages
 * @param {string} ofUser.path.required - the user name of the desired user
 * @returns {MessageList.model} 200 - Messages list for a user
 */
router.get("/all/:ofUser", async (req: Request, res: Response) => {
  const user = req.params.ofUser;
  const messages = await messageDao.getOfUser(user);
  return res.status(OK).json({ messages });
});

/**
 * Get new messages for a user and mark them as "Sent" using a long polling method.
 * The timeout is determined by the user details, defaulted to 20 seconds
 * @route GET /messages/new/{ofUser}
 * @group Messages
 * @param {string} ofUser.path.required - the user name of the desired user
 * @returns {MessageList.model} 200 - Messages list for a user, all marked as "sent"
 * @returns {Error} 404 - No new messages
 */
router.get("/new/:ofUser", async (req: Request, res: Response) => {
  const stopwatch = new Stopwatch(true);
  const username = req.params.ofUser;
  const user = await userDao.getOne(username);
  const pollTimeoutSeconds = user ? user.pollTimeoutSeconds : 20;
  const messages = await getAndMarkNewMessages(username);

  if (messages.length > 0) {
    return res.status(OK).json({ messages });
  } else {
    let eventInvoked = false;
    const messageListener = async (data: any) => {
      const newMessages = await getAndMarkNewMessages(username);
      eventInvoked = true;
      res.status(OK).json({ newMessages }).end();
    };

    await messageBus.once(username, messageListener);
    setTimeout(() => {
      if (!eventInvoked) {
        messageBus.removeListener(username, messageListener);
        res.status(NOT_FOUND).json({ error: "No new messages" }).end();
      }
    }, pollTimeoutSeconds * 1000 - stopwatch.read(0));
  }
});

const getAndMarkNewMessages = async (name: string) => {
  const newMessages = await messageDao.getOfUser(name, MessageStatus.new);
  for (const message of newMessages) {
    message.status = MessageStatus.sent;
    await messageDao.update(message);
  }

  return newMessages;
};

export default router;
