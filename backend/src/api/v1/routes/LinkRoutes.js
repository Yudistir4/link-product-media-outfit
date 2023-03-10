const {
  convertSingleLink,
} = require('../controllers/LinkController/convertSingleLink');
const { createLink } = require('../controllers/LinkController/createLink');
const { deleteLink } = require('../controllers/LinkController/deleteLink');
const { getLinks } = require('../controllers/LinkController/getLinks');
const { updateLink } = require('../controllers/LinkController/updateLink');
const { verify } = require('../middlewares/verify');

const router = require('express').Router();
router.use(verify);
router.get('/', getLinks);
router.post('/', createLink);
router.post('/convert', convertSingleLink);
router.put('/:id', updateLink);
router.delete('/:id', deleteLink);

module.exports = router;
