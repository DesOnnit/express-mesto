const router = require('express').Router();
const {
  getUsers, getUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/user');
const {
  userAboutValidation,
  avatarValidation,
  idValidation,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/:userId', idValidation, getUser);
router.get('/me', idValidation, getCurrentUser);
router.patch('/me', userAboutValidation, updateProfile);
router.patch('/me/avatar', avatarValidation, updateAvatar);

module.exports = router;
