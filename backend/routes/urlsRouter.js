import express from 'express';
// import { checkRequestValidity } from '../middleware/timeValidation.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { getAllUrls, createShortUrl, getShortUrl } from '../controllers/urlsController.js';

const router = express.Router();

//TODO: *** Protected - only authorized user (add requireAuth middleware)
// After we instantiate the router we want to protect all routs below: 
router.use(requireAuth); 
// if this pass, it will call next() inside the requireAuth and will continue code execution below, one of the routes.

// Add Routes to the Router: 
//* GET all urls (original and shortened) (path: '/api/shorturls')
router.get('/', getAllUrls);

//* POST Create shortened url (path: '/api/shorturls')
router.post('/', createShortUrl);

//* GET the shortened url (path: '/api/shorturls/:urlId') - the user is redirected to the external original url
router.post('/:urlId', getShortUrl);


export { router as urlsRouter };