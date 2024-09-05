import dbClient from '../utils/db';
import HTTPError from '../utils/httpErrors';
import redisClient from '../utils/redis';


class AppController {
  
  static async getStatus(req, res) {
    try {
      return res.status(200).json({ "redis": redisClient.isAlive(), "db": dbClient.isAlive() });
    } 
    catch (error){
      return HTTPError.internalServerError(res);
    }
  }

  static async getStats(req, res) {
    try {
      return res.status(200)
                .json({ "users": await dbClient.nbUsers(), "files": await dbClient.nbFiles() });
    }
    catch (error) {
      console.log(`Error occurring here: ${error.message}`);
      return HTTPError.internalServerError(res);
    }
  }
}

export default AppController;
