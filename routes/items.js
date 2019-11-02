const express = require('express');
const validators = require('../handlers/validators');
const controller = require('../controllers/itemController');
const { loggedIn } = require('../middlewares/auth');

const router = express.Router();

router.get('/', controller.getAllItems);
router.post('/add', validators.addItemValidator, loggedIn, controller.addItem);
router.post(
  '/remove',
  validators.removeItemValidator,
  loggedIn,
  controller.removeItem
);

module.exports = router;
