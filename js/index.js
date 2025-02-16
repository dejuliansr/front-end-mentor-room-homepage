document.addEventListener("DOMContentLoaded", () => {
  const burgerIcon = document.getElementById('burger-icon');
  const closeIcon = document.getElementById('close-icon');
  const navMenu = document.getElementById('nav-menu');
  const overlay = document.getElementById('overlay');
  
  burgerIcon.addEventListener('click', () => {
    navMenu.classList.add('active');
    burgerIcon.style.display = 'none';
    closeIcon.style.display = 'block';
    overlay.style.display = 'block';
  });
  
  closeIcon.addEventListener('click', () => {
    navMenu.classList.remove('active');
    burgerIcon.style.display = 'block';
    closeIcon.style.display = 'none';
    overlay.style.display = 'none';
  });
  
  // Ambil data dari file JSON
  let slides = [];
  
  fetch('./product.json')
    .then(response => response.json())
    .then(data => {
      slides = data;
      updateSlide(currentSlide); // Memuat slide pertama setelah data diambil
    })
    .catch(error => {
      console.error("Error loading the slides:", error);
    });
  
  let currentSlide = 0;
  const imageContainer = document.querySelector('.image-container picture img');
  const heading = document.querySelector('.text-container h2');
  const description = document.querySelector('.text-container p');
  const prevArrow = document.querySelector('.prev-arrow');
  const nextArrow = document.querySelector('.next-arrow');
  
  // Fungsi untuk meng-update konten berdasarkan slide saat ini
  function updateSlide(index, direction = 'next') {
    if (slides.length === 0) return; // Pastikan data slide sudah dimuat
  
    const slide = slides[index];
  
    const textInClass = direction === 'next' ? 'slide-right-in' : 'slide-left-in';
    const textOutClass = direction === 'next' ? 'slide-left-out' : 'slide-right-out';
  
    const imgOutClass = 'blur-out';
    const imgInClass = 'blur-in';
  
    // Hapus class animasi sebelumnya
    imageContainer.classList.remove('blur-in', 'blur-out');
    heading.classList.remove('slide-left-in', 'slide-left-out', 'slide-right-in', 'slide-right-out');
    description.classList.remove('slide-left-in', 'slide-left-out', 'slide-right-in', 'slide-right-out');
  
    // Tambahkan animasi keluar
    imageContainer.classList.add(imgOutClass);
    heading.classList.add(textOutClass);
    description.classList.add(textOutClass);
  
    setTimeout(() => {
      imageContainer.src = window.innerWidth <= 1156 ? slide.imageMobile : slide.imageDesktop;
      heading.textContent = slide.heading;
      description.textContent = slide.description;
  
      // Hapus animasi keluar dan tambahkan animasi masuk
      imageContainer.classList.remove(imgOutClass);
      heading.classList.remove(textOutClass);
      description.classList.remove(textOutClass);
  
      imageContainer.classList.add(imgInClass);
      heading.classList.add(textInClass);
      description.classList.add(textInClass);
    }, 500); // Durasi sesuai dengan CSS transition
  }
  
  prevArrow.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide(currentSlide, 'prev');
  });

  nextArrow.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide(currentSlide, 'next');
  });
});
