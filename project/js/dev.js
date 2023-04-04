const images = document.querySelector('.images');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let counter = 0;

prevBtn.addEventListener('click', () => {
  if (counter <= 0) return;
  counter--;
  images.style.transform = `translateX(-${counter * 25}%)`;
});

nextBtn.addEventListener('click', () => {
  if (counter >= 3) return;
  counter++;
  images.style.transform = `translateX(-${counter * 25}%)`;
});