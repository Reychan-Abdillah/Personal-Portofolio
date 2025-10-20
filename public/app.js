// ========== LENIS SMOOTH SCROLL ==========
const lenis = new Lenis({
  duration: 1.2,
  smooth: true,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ========== SEGMENTED CONTROL ==========
const segmented = document.querySelector(".segmented");
const buttons = document.querySelectorAll(".segmented-button");
const bgHover = document.querySelector(".bg-hover");
const bgActive = document.querySelector(".bg-active");

window.addEventListener("load", () => {
  // === Fungsi pindahkan hover ===
  function moveBg(targetBtn) {
    const parentRect = segmented.getBoundingClientRect();

    if (targetBtn) {
      const rect = targetBtn.getBoundingClientRect();
      const extra = 8;
      bgHover.style.width = rect.width + extra + "px";
      bgHover.style.transform = `translate(${rect.left - parentRect.left - extra / 2}px)`;
    } else {
      bgHover.style.width = segmented.offsetWidth + "px";
      bgHover.style.transform = `translate(0px, 0px)`;
    }
  }

  // === Fungsi pindahkan active ===
  function moveActive(targetBtn) {
    const parentRect = segmented.getBoundingClientRect();

    if (targetBtn) {
      const rect = targetBtn.getBoundingClientRect();
      bgActive.style.width = rect.width + "px";
      bgActive.style.transform = `translate(${rect.left - parentRect.left}px)`;
    }
  }

  // posisi awal active
  const activeBtn = document.querySelector(".segmented-button.active");
  moveActive(activeBtn);

  // Event hover & click
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => moveBg(btn));
    btn.addEventListener("mouseleave", () => moveBg(null));
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      moveActive(btn);

      // Scroll ke section terkait
      const targetId = btn.dataset.section;
      const targetSect = document.getElementById(targetId);
      if (targetSect) {
        lenis.scrollTo(targetSect, { offset: 0 });
      }
    });
  });

  // ========== BLOBBY EFFECT ==========
  const blob = document.getElementById("blob");
  const home = document.getElementById("home");

  let x = 0,
      y = 0;
  let targetX = 0,
      targetY = 0;

  home.addEventListener("pointermove", (e) => {
    const rect = home.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
  });

  function animateBlob() {
    x += (targetX - x) * 0.1;
    y += (targetY - y) * 0.1;

    blob.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;

    requestAnimationFrame(animateBlob);
  }

  animateBlob();

  // ========== INTERSECTION OBSERVER (update active button saat scroll) ==========
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const activeBtn = Array.from(buttons).find(
            (btn) => btn.textContent.trim().toLowerCase() === id
          );

          buttons.forEach((btn) => btn.classList.remove("active"));
          if (activeBtn) {
            activeBtn.classList.add("active");
            moveActive(activeBtn);
          }
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => observer.observe(section));
});



// test dulu 
const galaxy = document.getElementById('galaxy');

function createStars() {
  galaxy.innerHTML = ''; // hapus bintang lama
  const numStars = 200;  // jumlah partikel bintang
  const width = window.innerWidth;
  const height = window.innerHeight;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    // posisi acak
    star.style.top = Math.random() * height + 'px';
    star.style.left = Math.random() * width + 'px';

    // ukuran acak (1-3px)
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // delay animasi acak
    star.style.animationDelay = `${Math.random() * 5}s`;

    galaxy.appendChild(star);
  }
}

// buat bintang pertama kali
createStars();

// responsive: regenerasi bintang saat resize layar
window.addEventListener('resize', createStars);

console.log(galaxy); 
