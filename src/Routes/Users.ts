import { Router, Request, Response } from "express";
import { UserDao } from "../daos/User/UserDao.mock";
import { OK, NOT_FOUND, CREATED } from "http-status-codes";

const router = Router();
const userDao = new UserDao();

/**
 * @typedef User
 * @property {string} name.required - user name
 * @property {number} pollTimeoutSeconds - long poll timeout seconds
 */

/**
 * Returns user by name
 * @route GET /users/{name}
 * @group Users
 * @param {string} name.path.required - the user name
 * @returns {User} 200 - the user json
 * @returns {Error} 404 - user with @name wasn't found
 * @returns {Error} default - Unexpected error
 */
router.get("/:name", async (req: Request, res: Response) => {
  const name = req.params.name;
  const user = await userDao.getOne(name);
  if (user) {
    return res.status(OK).json(user);
  } else {
    return res.status(NOT_FOUND).end();
  }
});


/**
 * Sets the poll timeout of a user, if the user doesn't exist, it will create a new user entry for it.
 * @route PUT /users/{name}/pollTimeout/{timeoutSeconds}
 * @group Users
 * @param {string} name.path.required - the user name
 * @param {number} timeoutSeconds.path.required - the desired timeout
 * @returns {User} 200 - the updated user json
 * @returns {User} 204 - if a new user detected, the created user
 * @returns {Error} default - Unexpected error
 */
router.put("/:name/pollTimeout/:timeoutSeconds", async (req: Request, res: Response) => {
    const name = req.params.name;
    const timeoutSeconds = parseInt(req.params.timeoutSeconds, 10);
    const user = await userDao.getOne(name);
    if (user) {
        user.pollTimeoutSeconds = timeoutSeconds;
        const updatedUser = await userDao.update(user);
        return res.status(OK).json(updatedUser);
    } else {
        const newUser = await userDao.add({name, pollTimeoutSeconds: timeoutSeconds});
        return res.status(CREATED).json(newUser);
    }
});

export default router;