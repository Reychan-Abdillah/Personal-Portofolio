  const home = document.getElementById("home");
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

window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const textLoad = document.getElementById("text-load");
  const letter = textLoad.textContent.split("");
  textLoad.textContent = "";

  letter.forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.classList.add("opacity-0", "inline-block");
    textLoad.appendChild(span);
  });

  const spans = textLoad.querySelectorAll("span");

  spans.forEach((char, i) => {
    setTimeout(() => {
      char.classList.add("animate-in");
    }, i * 80);
  });

  setTimeout(() => {
    spans.forEach((char, i) => {
      setTimeout(() => {
        const reverse = spans.length - 1 - i;
        spans[reverse].classList.remove("animate-in");
        spans[reverse].classList.add("animate-out");
      }, i * 80);
    });
  }, 2000);

  setTimeout(() => {
    loadingScreen.style.transition = "transform 0.8s ease-in-out";
    loadingScreen.style.transform = "translateY(-100%)";

    starContain.classList.remove("opacity-0");
    starContain.classList.add("opacity-100");
    document.body.classList.remove("loading");
  }, 4000);

  setTimeout(() => {
    const target = document.getElementById("textDescription");
    const char = "01010101##+_+!@????????????AbQDYFGXXxxXXww<><>!!!!!!][";
    const originalText = target.textContent.trim();

    function randomText() {
      return char[Math.floor(Math.random() * char.length)];
    }

    let index = 0;
    function changeText() {
      const scrambled = originalText
        .split("")
        .map((v, i) => {
          if (i < index || v === " " || v === "\n") {
            return v;
          }
          return randomText();
        })
        .join("");

      target.textContent = scrambled;
      index++;

      if (index > originalText.length) {
        clearInterval(interval);
      }
    }
    const interval = setInterval(changeText, 20); //end

    const name = document.getElementById("name");
    const spanName = document.getElementById("span-name");

    const splitName = name.textContent.split("");
    name.textContent = "";
    spanName.textContent = "";

    
    
    splitName.forEach((char, i) => {
      const span1 = document.createElement("span");
      const span2 = document.createElement("span");
      home.classList.add("opacity-100")
      span1.textContent = char;
      span1.style.animationDelay = `${i * 0.2}s`;
      span1.classList.add("visible");

      span2.textContent = char;
      span2.style.animationDelay = `${i * 0.2}s`;
      span2.classList.add("visible-out");

      name.appendChild(span1);
      spanName.appendChild(span2);
    });
  }, 4500);

  const segmented = document.querySelector(".segmented");
  const buttons = document.querySelectorAll(".segmented-button");
  const bgHover = document.querySelector(".bg-hover");
  const bgActive = document.querySelector(".bg-active");

  function moveBg(targetBtn) {
    if (!segmented || !bgHover) return;
    const parentRect = segmented.getBoundingClientRect();
    if (targetBtn) {
      const rect = targetBtn.getBoundingClientRect();
      const extra = 8;
      bgHover.style.width = rect.width + extra + "px";
      bgHover.style.transform = `translate(${
        rect.left - parentRect.left - extra / 2
      }px)`;
    } else {
      bgHover.style.width = segmented.offsetWidth + "px";
      bgHover.style.transform = "translate(0px, 0px)";
    }
  }

  function moveActive(targetBtn) {
    if (!segmented || !bgActive || !targetBtn) return;
    const parentRect = segmented.getBoundingClientRect();
    const rect = targetBtn.getBoundingClientRect();
    bgActive.style.width = rect.width + "px";
    bgActive.style.transform = `translate(${rect.left - parentRect.left}px)`;
  }

  setTimeout(() => {
    const scrollSections = document.querySelectorAll("section[id]");
    scrollSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const id = section.id;
      const inView = rect.top < window.innerHeight * 0.5 && rect.bottom > 0;
      if (inView) {
        const activeBtn = Array.from(buttons).find(
          (btn) => btn.dataset.section === id
        );
        if (activeBtn) {
          buttons.forEach((b) => b.classList.remove("active"));
          activeBtn.classList.add("active");
          moveActive(activeBtn);
        }
      }
    });
  }, 100);

  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => moveBg(btn));
    btn.addEventListener("mouseleave", () => moveBg(null));
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      moveActive(btn);
      const targetId = btn.dataset.section;
      const targetSect = document.getElementById(targetId);
      if (targetSect) lenis.scrollTo(targetSect, { offset: 0 });
    });
  });
// test
  const blob = document.getElementById("blob");


  if (blob && home) {
    let x = 0,
      y = 0,
      targetX = 0,
      targetY = 0,
      timeout;

    home.addEventListener("pointermove", (e) => {
      const rect = home.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      blob.style.opacity = 1;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        blob.style.opacity = 0;
      }, 500);
    });

    function animateBlob() {
      x += (targetX - x) * 0.1;
      y += (targetY - y) * 0.1;
      blob.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateBlob);
    }

    animateBlob();
  }

  const scrollSections = document.querySelectorAll("section[id]");
  if (lenis && scrollSections.length > 0 && buttons.length > 0) {
    lenis.on("scroll", () => {
      scrollSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const id = section.id;
        const inView =
          rect.top < window.innerHeight * 0.4 &&
          rect.bottom > window.innerHeight * 0.15;
        if (inView) {
          const activeBtn = Array.from(buttons).find(
            (btn) => btn.dataset.section === id
          );
          if (activeBtn) {
            buttons.forEach((btn) => btn.classList.remove("active"));
            activeBtn.classList.add("active");
            moveActive(activeBtn);
          }
        }
      });
    });
  }
});

const starContain = document.getElementById("stars");
if (starContain) {
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
}

const smokeSections = document.querySelectorAll(
  "#about-section, #tech-items, #home, #projects"
);
if (smokeSections.length > 0) {
  let lastSmoke = 0;
  const SMOKE_COOLDOWN = 50;

  smokeSections.forEach((section) => {
    section.addEventListener("mousemove", (e) => {
      const now = Date.now();
      if (now - lastSmoke < SMOKE_COOLDOWN) return;
      lastSmoke = now;

      const smoke = document.createElement("div");
      smoke.classList.add("smoke");

      const size = Math.random() * 40 + 10;
      smoke.style.width = size + "px";
      smoke.style.height = size + "px";
      smoke.style.left = e.clientX + "px";
      smoke.style.top = e.clientY + "px";

      document.body.appendChild(smoke);

      setTimeout(() => {
        if (smoke.parentNode) smoke.remove();
      }, 7000);
    });
  });
}

const strip = document.getElementById("tech-strip");
if (strip) {
  let pos = 0;
  const speed = 1;

  function run() {
    pos -= speed;
    strip.style.transform = `translate(${pos}px)`;
    requestAnimationFrame(run);
  }

  run();
}

const ts = document.getElementById("type-script");
if (ts) {
  function goyang() {
    ts.classList.add("goyang");
    setTimeout(() => ts.classList.remove("goyang"), 2000);
  }
  setInterval(goyang, 3500);
  goyang();
}

const navBtn = document.getElementById("nav-btn");
const closeBtn = document.getElementById("close-btn");
const navMenu = document.getElementById("nav-menu");

navBtn.addEventListener("click", () => {
  navMenu.classList.toggle("translate-x-full");
  navBtn.classList.toggle("hidden");
  closeBtn.classList.toggle("hidden");
});

closeBtn.addEventListener("click", () => {
  navMenu.classList.add("translate-x-full");
  navBtn.classList.remove("hidden");
  closeBtn.classList.add("hidden");
});

const form = document.getElementById("contact-form");
const statusMsg = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusMsg.classList.remove("hidden");
  statusMsg.textContent = "Sending message...";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
    });

    const result = await response.json();
    if (result.status === "success") {
      statusMsg.textContent = "Message sent successfully!";
      form.reset();
    } else {
      statusMsg.textContent = "Something went wrong. Please try again.";
    }
  } catch (error) {
    statusMsg.textContent = "Error sending message!";
    console.error(error);
  }
});
