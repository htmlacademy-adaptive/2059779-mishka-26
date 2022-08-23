const navModalPromoButton = document.querySelector('.promo-card__button');
const navModal = document.querySelector('.modal');
const onModalButtonClick = function () {
    navModal.classList.remove('modal--close');
    navModalPromoButton.removeEventListener('click', onModalButtonClick)
    navModal.addEventListener('click', onModalBackgroundClick)
};

const onModalBackgroundClick = function (evt) {
    if (evt.target === navModal) {
      navModal.classList.add('modal--close');
      navModalPromoButton.addEventListener('click', onModalButtonClick)
      navModal.removeEventListener('click', onModalBackgroundClick)
    }
};

navModalPromoButton.addEventListener('click', onModalButtonClick)
