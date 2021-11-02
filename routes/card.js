const router = require('express').Router();
const {
  getCards, createCard, deleteCard, dislikeCard, likeCard,
} = require('../controllers/card');
const {
  cardValidation,
  idCardValidation,
} = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', cardValidation, createCard);
router.delete('/:cardId', idCardValidation, deleteCard);
router.put('/:cardId/likes', idCardValidation, likeCard);
router.delete('/:cardId/likes', idCardValidation, dislikeCard);

module.exports = router;
