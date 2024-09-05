import { ObjectId } from 'mongodb';
import { hashPassword } from '../utils/auth';
import dbClient from '../utils/db';
import HTTPError from '../utils/httpErrors';
import redisClient from '../utils/redis';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return HTTPError.badRequest(res, 'Missing email');
    }

    if (!password) {
      return HTTPError.badRequest(res, 'Missing password');
    }

    const dbUser = await dbClient.db.collection('users').findOne({ email });
    if (dbUser) {
      return HTTPError.badRequest(res, 'Already exist');
    }

    try {
      const hashedPwd = hashPassword(password);
      const newUser = await dbClient.db.collection('users')
        .insertOne({ email, password: hashedPwd });

      return res.status(201).json({ id: newUser.insertedId, email });
    } catch (error) {
      return HTTPError.internalServerError(res, 'An error occurred while creating new user');
    }
  }

  /* gets a user */
  static async getUserData(req) {
    const token = req.headers['x-token'];
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      throw new Error('Unauthorized');
    }

    const user = await dbClient.db.collection('users').findOne({ _id: ObjectId(userId) });
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  /* get user based on token used */
  static async getMe(req, res) {
    try {
      const user = await UsersController.getUserData(req);
      return res.status(200).json({ id: user._id, email: user.email });
    } catch (error) {
      return HTTPError.unauthorized(res);
    }
  }
}

export default UsersController;
