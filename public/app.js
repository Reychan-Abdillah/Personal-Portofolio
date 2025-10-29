// ===============================
// LENIS SMOOTH SCROLL
// ===============================
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

// ===============================
// SEGMENTED NAVIGATION
// ===============================
const segmented = document.querySelector(".segmented");
const buttons = document.querySelectorAll(".segmented-button");
const bgHover = document.querySelector(".bg-hover");
const bgActive = document.querySelector(".bg-active");

window.addEventListener("load", () => {
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

  function moveActive(targetBtn) {
    const parentRect = segmented.getBoundingClientRect();
    if (targetBtn) {
      const rect = targetBtn.getBoundingClientRect();
      bgActive.style.width = rect.width + "px";
      bgActive.style.transform = `translate(${rect.left - parentRect.left}px)`;
    }
  }

  const activeBtn = document.querySelector(".segmented-button.active");
  moveActive(activeBtn);

  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => moveBg(btn));
    btn.addEventListener("mouseleave", () => moveBg(null));
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      moveActive(btn);

      const targetId = btn.dataset.section;
      const targetSect = document.getElementById(targetId);
      if (targetSect) {
        lenis.scrollTo(targetSect, { offset: 0 });
      }
    });
  });

  // ===============================
  // BLOB ANIMATION
  // ===============================
 const blob = document.getElementById("blob");
const home = document.getElementById("home");

let x = 0, y = 0;
let targetX = 0, targetY = 0;
let timeout; // buat nyimpan timer hilangnya blob

home.addEventListener("pointermove", (e) => {
  const rect = home.getBoundingClientRect();
  targetX = e.clientX - rect.left;
  targetY = e.clientY - rect.top;

  // kalau mouse gerak, blob muncul lagi
  blob.style.opacity = 1;

  // reset timer setiap mouse gerak
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    blob.style.opacity = 0; // blob hilang setelah beberapa detik
  }, 500); // hilang setelah 1 detik tanpa gerakan
});

function animateBlob() {
  x += (targetX - x) * 0.1;
  y += (targetY - y) * 0.1;
  blob.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateBlob);
}
animateBlob();

  // ===============================
  // AUTO ACTIVE SEGMENTED (COMPATIBLE DENGAN LENIS)
  // ===============================
  const sections = document.querySelectorAll("section[id], div[id");

  lenis.on("scroll", () => {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const id = section.id;
      const inView = rect.top < window.innerHeight * 0.2 && rect.bottom > window.innerHeight * 0;

      if (inView) {
        const activeBtn = Array.from(buttons).find(
          (btn) => btn.dataset.section === id
        );

        buttons.forEach((btn) => btn.classList.remove("active"));
        if (activeBtn) {
          activeBtn.classList.add("active");
          moveActive(activeBtn);
        }
      }
    });
  });
});

// ===============================
// STARS EFFECT
// ===============================
const starContain = document.getElementById("stars");
const stars = 200;

for (let i = 1; i < stars; i++) {
  const star = document.createElement("div");
  star.classList.add("stars");
  star.style.top = Math.random() * 100 + "%";
  star.style.left = Math.random() * 100 + "%";

  const size = Math.random() * 2 + 1;
  star.style.width = size + "px";
  star.style.height = size + "px";
  star.style.animationDelay = Math.random() * 2 + "s";
  starContain.appendChild(star);
}



document.ge

// ===============================
// SMOKE EFFECT
// ===============================
const sections = document.querySelectorAll("#about-section, #tech-items, #home, #projects");

sections.forEach(section => {
  section.addEventListener("mousemove", (e) => {
    const smoke = document.createElement("div");
    smoke.classList.add("smoke");

    const size = Math.random() * 40 + 10;
    smoke.style.width = size + "px";
    smoke.style.height = size + "px";
    smoke.style.left = e.pageX + "px";
    smoke.style.top = e.pageY + "px";

    document.body.appendChild(smoke);

    setTimeout(() => {
      smoke.remove();
    }, 7000);
  });
});

// ===============================
// RUNNING STRIP
// ===============================
const strip = document.getElementById("tech-strip");
let pos = 0;
let speed = 1;

function run() {
  pos -= speed;
  strip.style.transform = `translate(${pos}px)`;
  requestAnimationFrame(run);
}
run();

// ===============================
// TYPESCRIPT GOYANG
// ===============================
const ts = document.getElementById("type-script");
function goyang() {
  ts.classList.add("goyang");
  setTimeout(() => {
    ts.classList.remove("goyang");
  }, 2000);
}
setInterval(goyang, 3500);
goyang();
