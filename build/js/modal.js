const navModalPromoButton=document.querySelector(".promo-card__button"),navModal=document.querySelector(".modal"),onModalButtonClick=function(){navModal.classList.remove("modal--close"),navModalPromoButton.removeEventListener("click",onModalButtonClick),navModal.addEventListener("click",onModalBackgroundClick)},onModalBackgroundClick=function(o){o.target===navModal&&(navModal.classList.add("modal--close"),navModalPromoButton.addEventListener("click",onModalButtonClick),navModal.removeEventListener("click",onModalBackgroundClick))};navModalPromoButton.addEventListener("click",onModalButtonClick);