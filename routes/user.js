const router = require('express').Router();
const {
  getUsers, getUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/user');
const {
  userAboutValidation,
  avatarValidation,
  idUserValidation,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', idUserValidation, getUser);
router.patch('/me', userAboutValidation, updateProfile);
router.patch('/me/avatar', avatarValidation, updateAvatar);

module.exports = router;
