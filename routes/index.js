import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const router = Router();

router.get('/status', async (req, res) => AppController.getStatus(req, res));

router.get('/stats', async (req, res) => AppController.getStats(req, res));

router.post('/users', async (req, res) => UsersController.postNew(req, res));

router.get('/connect', async (req, res) => AuthController.getConnect(req, res));

router.get('disconnect', async (req, res) => AuthController.getDisconnect(req, res));

router.get('/users/me', async (req, res) => UsersController.getMe(req, res));

router.post('/files', async (req, res) => FilesController.postUpload(req, res));

router.get('/files/:id', async (req, res) => FilesController.getShow(req, res));

router.get('/files', async (req, res) => FilesController.getIndex(req, res));

router.put('/files/:id/publish', async (req, res) => FilesController.putPublish(req, res));

router.put('/files/:id/unpublish', async (req, res) => FilesController.putUnpublish(req, res));

router.get('/files/:id/data', async (req, res) => FilesController.getFile(req, res));

export default router;
