const router = require('express').Router();
const {
  getCards, createCard, deleteCard, dislikeCard, likeCard,
} = require('../controllers/card');
const {
  cardValidation,
  idValidation,
} = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', cardValidation, createCard);
router.delete('/:cardId', idValidation, deleteCard);
router.put('/:cardId/likes', idValidation, likeCard);
router.delete('/:cardId/likes', idValidation, dislikeCard);

module.exports = router;
