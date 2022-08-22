let navMain = document.querySelector('.main-navigation');
let navToggle = document.querySelector('.toggle');
let navButton = document.querySelector('.toggle__button');

navMain.classList.add('main-navigation--close');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-navigation--close')) {
    navButton.classList.add('toggle__button--close')
    navMain.classList.remove('main-navigation--close');
    navMain.classList.add('main-navigation--open');
  } else {
    navButton.classList.remove('toggle__button--close')
    navMain.classList.add('main-navigation--close');
    navMain.classList.remove('main-navigation--open');
  }
});
