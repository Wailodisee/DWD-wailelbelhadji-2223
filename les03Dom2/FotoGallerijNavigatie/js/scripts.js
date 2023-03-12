const figBig = document.querySelector('#figBig');
const thumbLinks = document.querySelectorAll('.thumbs a');
const btnPrev = document.querySelector('#btnPrev');
const btnNext = document.querySelector('#btnNext');
let currentFoto = 0;
function showImage(lnk) {
  figBig.querySelector('img').src = lnk.href;
  figBig.querySelector('figcaption').innerHTML = lnk.querySelector('img').alt;
  document.querySelector('.thumbs .active').classList.remove('active');
  lnk.classList.add('active');
}
thumbLinks.forEach((lnk, index) => {
  lnk.addEventListener('click', function(e) {
    e.preventDefault();
    currentFoto = index;
    showImage(lnk);
  });
});
btnNext.addEventListener('click', function() {
   currentFoto++; 
  if (currentFoto >= thumbLinks.length) {
   currentFoto = 0;
  }
  showImage(thumbLinks[currentFoto]);
});
btnPrev.addEventListener('click', function() {
   currentFoto--;
  if (currentFoto < 0) {
   currentFoto = thumbLinks.length - 1;
  }
  showImage(thumbLinks[currentFoto]);
});
