let navModalPromoButton = document.querySelector('.promo-card__button');
let navModal = document.querySelector('.modal');


navModalPromoButton.onclick = function() {
    navModal.classList.remove('modal--close');
};
