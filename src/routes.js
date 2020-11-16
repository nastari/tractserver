import { Router } from 'express';
import * as CompanyController from './controllers/Company';
import * as UnitController from './controllers/Unit';
import * as AssetController from './controllers/Asset';
import * as UserController from './controllers/User';
import * as AvatarFileController from './controllers/AvatarFile';

const routes = new Router();

routes.get('/', (_, res) => res.json({ message: 'All systems normal.' }));

// company

routes.post('/company', CompanyController.store);
routes.put('/company', CompanyController.update);
routes.get('/company', CompanyController.access);
// routes.delete('/company', CompanyController.delet);

// units

routes.post('/unit', UnitController.store);
routes.get('/units', UnitController.index);
routes.put('/unit', UnitController.store);
// routes.delete('/unit', UnitController.store);

// assets

routes.post('/asset', AssetController.store);
routes.get('/asset', AssetController.index);
routes.put('/asset', AssetController.update);
routes.delete('/asset', AssetController.delet);

// users

routes.post('/user', UserController.store);
routes.get('/user', UserController.index);
routes.put('/user', UserController.update);
routes.delete('/user', UserController.store);

// avatar image on asset
routes.post('/avatar', AvatarFileController.store);

export default routes;
