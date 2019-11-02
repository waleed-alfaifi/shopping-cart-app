const { check, validationResult } = require('express-validator');

exports.signUpValidator = [
  check('name')
    .exists()
    .withMessage('Name is required.'),
  check('email')
    .exists()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Email is not valid.'),
  check('password')
    .exists()
    .withMessage('Password is required.'),
];

exports.signInValidator = [
  check('email')
    .exists()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Email is not valid.'),
  check('password')
    .exists()
    .withMessage('Password is required.'),
];

exports.addItemValidator = [
  check('itemId')
    .exists()
    .withMessage('itemId is required.'),
];

exports.removeItemValidator = [
  check('itemId')
    .exists()
    .withMessage('itemId is required.'),
  check('removeItem')
    .exists()
    .withMessage('removeItem is required.')
    .isBoolean()
    .withMessage('removeItem should be a boolean value.'),
];

exports.getErrorsMessages = req => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(err => err.msg);
    return messages;
  }

  return null;
};
