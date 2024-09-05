import { Routes } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const routes = Routes();

routes.get('/status', async (req, res) => AppController.getStatus(req, res));

routes.get('/stat', async (req, res) => AppController.getStats(req, res));

routes.post('/users', async (req, res) => UsersController.postNew(req, res));

routes.get('/connect', async (req, res) => AuthController.getConnect(req, res));

routes.get('disconnect', async (req, res) => AuthController.getDisconnect(req, res));

routes.get('/users/me', async (req, res) => UsersController.getMe(req, res));

routes.post('/files', async (req, res) => FilesController.postUpload(req, res));

routes.get('/files/:id', async (req, res) => FilesController.getShow(req, res));

routes.get('/files', async (req, res) => FilesController.getIndex(req, res));

routes.put('/files/:id/publish', async (req, res) => FilesController.putPublish(req, res));

routes.put('/files/:id/unpublish', async (req, res) => FilesController.putUnpublish(req, res));

routes.get('/files/:id/data', async (req, res) => FilesController.getFile(req, res));

export default routes;
