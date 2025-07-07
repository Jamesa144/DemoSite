let currentGallery = 1;
let currentIndex = 0;
let imageList = []; 

function loadGallery(num) {
  currentGallery = num;
  currentIndex = 0;
  imageList = [];

  const gallery = document.getElementById('gallery');
  gallery.className = 'gallery-window photo-grid';
  gallery.innerHTML = '';
  const maxToTry = 50;

  // Optional: descriptions for each gallery
  const descriptions = {
    1: {
      1: 'Granite type 1',
      2: 'Granite type 2',
      3: 'Granite type 3',
      4: 'Granite type 4',
      // Add more if available
    },
    2: {
      1: 'Kitchen 1',
      2: 'Kitchen 2',
      3: 'Kitchen 3',
      // etc.
    },
    3: {
      1: 'Bathroom 1',
      2: 'Bathroom 2',
      // etc.
    }
    // You can add more galleries if needed
  };

  for (let i = 1; i <= maxToTry; i++) {
    const imagePath = `images/gallery${num}/photo${i}.jpg`;

    const imgTest = new Image();
    imgTest.onload = function () {
      const imageIndex = imageList.length;
      imageList.push({
        src: imagePath,
        desc: (descriptions[num] && descriptions[num][i]) ? descriptions[num][i] : `Photo ${i} description here.`
      });

      const container = document.createElement('div');
      container.className = 'photo-container';

      const img = document.createElement('img');
      img.src = imagePath;
      img.alt = `Gallery ${num} - Photo ${i}`;
      img.onclick = () => openLightbox(imageIndex);

      const desc = document.createElement('div');
      desc.className = 'description';

      // Use provided description if it exists, else fallback
      if (descriptions[num] && descriptions[num][i]) {
        desc.textContent = descriptions[num][i];
      } else {
        desc.textContent = `Photo ${i} description here.`;
      }

      container.appendChild(img);
      container.appendChild(desc);
      gallery.appendChild(container);
    };

    imgTest.onerror = function () {
      // Break the loop once we hit a missing image
    };

    imgTest.src = imagePath;
  }
}


function loadAbout() {

  const gallery = document.getElementById('gallery');
  gallery.className = 'gallery-window';
  gallery.innerHTML = `
    <div class="about-container">
      <h2>About Us</h2>
      <p>
        Welcome here is a placeholder! This is a placeholder for your "About Us" content.
        You can use this space to describe your business, what you do, or anything else you want to tell your visitors about your business.
      </p>
    </div>
  `;
}
// lightbox functions

function openLightbox(index) {
  currentIndex = index;
  document.getElementById('lightbox').style.display = 'flex';
  updateLightboxImage();
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function nextImage() {
  currentIndex = (currentIndex + 1) % imageList.length;
  updateLightboxImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  const item = imageList[currentIndex];
  const lightboxImg = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');

  if (item) {
    lightboxImg.src = item.src;
    caption.textContent = item.desc || '';
  }
}


document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});


// mobile support viewing
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('lightbox').addEventListener('touchstart', function (e) {
  touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('lightbox').addEventListener('touchend', function (e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50; // pixels
  const deltaX = touchEndX - touchStartX;

  if (deltaX > swipeThreshold) {
    // Swipe right = previous
    prevImage();
  } else if (deltaX < -swipeThreshold) {
    // Swipe left = next
    nextImage();
  }
}

// header animnation

// Select both background layers
const bg1 = document.querySelector('.bg1');
const bg2 = document.querySelector('.bg2');

// Array of images to cycle through
const headerImages = [
  'images/header-bg1.jpg',
  'images/header-bg2.jpg',
  'images/header-bg3.jpg',
  'images/header-bg4.jpg',
  'images/header-bg5.jpg'
];

let currentImageIndex = 1; // Start on the 2nd image for the first swap
let isBg1Visible = true;

// Wait for the page to finish loading
document.addEventListener('DOMContentLoaded', () => {
  // Set the initial image on bg1 and make it visible
  bg1.style.backgroundImage = `url("${headerImages[0]}")`;
  bg1.classList.add('active');

  // Begin rotating images every 4 seconds
  setInterval(() => {
    const nextImage = headerImages[currentImageIndex];

    if (isBg1Visible) {
      bg2.style.backgroundImage = `url("${nextImage}")`;
      bg2.classList.add('active');
      bg1.classList.remove('active');
    } else {
      bg1.style.backgroundImage = `url("${nextImage}")`;
      bg1.classList.add('active');
      bg2.classList.remove('active');
    }

    isBg1Visible = !isBg1Visible;
    currentImageIndex = (currentImageIndex + 1) % headerImages.length;
  }, 4000);
});



// Load initial gallery on page load
window.onload = () => loadAbout();
