let navMain = document.querySelector('.main-header__navigation');
let navToggle = document.querySelector('.main-header__toggle');
let navButton = document.querySelector('.toggle__button');

navMain.classList.add('main-header__navigation--close');
navToggle.classList.add('main-header__toggle--open');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-header__navigation--close')) {
    navButton.classList.add('toggle__button--close')
    navMain.classList.remove('main-header__navigation--close');
    navMain.classList.add('main-header__navigation--open');
  } else {
    navButton.classList.remove('toggle__button--close')
    navMain.classList.add('main-header__navigation--close');
    navMain.classList.remove('main-header__navigation--open');
  }
});
