let navMain = document.querySelector('.main-header__navigation');
let navToggle = document.querySelector('.toggle__button');

navMain.classList.add('main-header__navigation--close');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-header__navigation--close')) {
    navMain.classList.remove('main-header__navigation--close');
    navMain.classList.add('main-header__navigation--open');
  } else {
    navMain.classList.add('main-header__navigation--close');
    navMain.classList.remove('main-header__navigation--open');
  }
});
