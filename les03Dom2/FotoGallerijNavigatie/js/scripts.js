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
thumbLinks.forEach((lnk, ix) => {
  lnk.addEventListener('click', function(e) {
    e.preventDefault();
    currentFoto = ix;
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
document.addEventListener('keydown', function(el) {
  if (el.key == 'ArrowRight') {
    el.preventDefault();
    currentFoto = currentFoto < thumbLinks.length - 1 ? currentFoto + 1 : 0;
    showImage(thumbLinks[currentFoto]);
  }
  else if (el.key == 'ArrowLeft') {
    el.preventDefault();
    currentFoto = currentFoto > 0 ? currentFoto - 1 : thumbLinks.length - 1;
    showImage(thumbLinks[currentFoto]);
  }
  else if (el.ctrlKey && el.key.match(thumbLinks.index)) {
    el.preventDefault();
    const indexes = parseInt(el.key) - 1;
    if (indexes >= 0 && indexes < thumbLinks.length) {
      currentFoto = indexes;
      showImage(thumbLinks[currentFoto]);
    }
  }
});