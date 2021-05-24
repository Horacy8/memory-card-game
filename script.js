if (document.readyState === 'loading') {
   document.addEventListener('DOMContentLoaded', redy())
} else {
   redy()
}

function redy() {
   let overlays = Array.from(document.getElementsByClassName('overlay-text'));
   let cards = Array.from(document.getElementsByClassName('card'));

   overlays.forEach(overlay => {
      overlay.addEventListener('click', () => {
         overlay.classList.remove('visible');
      })
   })
}