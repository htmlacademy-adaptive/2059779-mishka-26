const navMain = document.querySelector('.main-header__navigation');
const navToggle = document.querySelector('.main-header__toggle');
const navToggleButton = document.querySelector('.toggle');
const navButton = document.querySelector('.toggle__button');

navMain.classList.add('main-header__navigation--close');
navToggle.classList.add('main-header__toggle--open');

const onMenuButtonClick = function () {
  navButton.classList.toggle('toggle__button--close')
  navToggleButton.classList.toggle('toggle--close')
  navMain.classList.toggle('main-header__navigation--close');
  navMain.classList.toggle('main-header__navigation--open');
}

navToggle.addEventListener('click', onMenuButtonClick);
