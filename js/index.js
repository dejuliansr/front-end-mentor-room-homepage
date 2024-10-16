const burgerIcon = document.getElementById('burger-icon');
const closeIcon = document.getElementById('close-icon');
const navMenu = document.getElementById('nav-menu');
const overlay = document.getElementById('overlay');

burgerIcon.addEventListener('click', () => {
  navMenu.classList.add('active');
  burgerIcon.style.display = 'none'; // Sembunyikan ikon burger
  closeIcon.style.display = 'block'; // Tampilkan ikon close
  overlay.style.display = 'block';
});

closeIcon.addEventListener('click', () => {
  navMenu.classList.remove('active');
  burgerIcon.style.display = 'block'; // Tampilkan ikon burger kembali
  closeIcon.style.display = 'none'; // Sembunyikan ikon close
  overlay.style.display = 'none';
});

const slides = [
  {
    imageMobile: './images/mobile-image-hero-1.jpg',
    imageDesktop: './images/desktop-image-hero-1.jpg',
    heading: 'Discover innovative ways to decorate',
    description: 'We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.'
  },
  {
    imageMobile: './images/mobile-image-hero-2.jpg',
    imageDesktop: './images/desktop-image-hero-2.jpg',
    heading: 'We are available all across the globe',
    description: 'With stores all over the world, it’s easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don’t hesitate to contact us today.'
  },
  {
    imageMobile: './images/mobile-image-hero-3.jpg',
    imageDesktop: './images/desktop-image-hero-3.jpg',
    heading: 'Manufactured with the best materials',
    description: 'Our modern furniture store provides a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.'
  }
];

// Inisialisasi slide index
let currentSlide = 0;

const imageContainer = document.querySelector('.image-container picture img');
const heading = document.querySelector('.text-container h2');
const description = document.querySelector('.text-container p');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');

// Fungsi untuk meng-update konten berdasarkan slide saat ini
function updateSlide(index) {
  const slide = slides[index];
  
  // Ganti gambar berdasarkan ukuran layar
  imageContainer.src = window.innerWidth <= 1156 ? slide.imageMobile : slide.imageDesktop;
  
  // Ganti teks
  heading.textContent = slide.heading;
  description.textContent = slide.description;
}

// Event listener untuk tombol prev
prevArrow.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide(currentSlide);
});

// Event listener untuk tombol next
nextArrow.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide(currentSlide);
});

// Update konten pertama kali saat halaman dimuat
window.addEventListener('load', () => {
  updateSlide(currentSlide);
});

// Update gambar ketika ukuran layar berubah
window.addEventListener('resize', () => {
  updateSlide(currentSlide);
});
