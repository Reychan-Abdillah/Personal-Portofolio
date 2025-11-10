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
  home.classList.add("opacity-100");

  const testaja = document.getElementById("name-content");
  const h1 = testaja.querySelectorAll("h1");
  const h1Name = h1[0].textContent;
  const h1Span = h1[1].textContent;

  h1[0].textContent = "";
  h1[1].textContent = "";
  h1Name.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.classList.add("opacity-0")
    h1[0].appendChild(span);
    setTimeout(() => {
      span.classList.add("visible1");
    }, i * 300);
  });

  h1Span.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.classList.add("opacity-0");
    h1[1].appendChild(span);
    setTimeout(() => {
      setTimeout(() => {
        span.classList.add("visible-out");
      }, i * 300);
    });
  });
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

  // console.log(asli)

  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("show");
    }, i * 200);
  });

  const fadeLeft = document.querySelectorAll("#icons ion-icon");
  setTimeout(() => {
    fadeLeft.forEach((e, i) => {
      setTimeout(() => {
        e.classList.add("show");
      }, i * 200);
    });

    const fadeDown = document.querySelectorAll(".fade-down");
    fadeDown.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add("show");
      }, i * 200);
    });
  }, 400);

  const btn = document.querySelector(".btn-pop");

  btn.classList.remove("hidden");
  btn.classList.add("show");

  const imgBnks = document.getElementById("img-bungkus");

  imgBnks.classList.remove("-translate-y-20", "rotate-12");
}, 4700);

const targetLayer = document.querySelectorAll(
  ".fade-in2, .fade-down2, .fade-opacity2, .fade-opacity3, .bar"
);
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("fade-in2")) {
        const inAnim = Array.from(targetLayer).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add("show-anim");
          observer.unobserve(entry.target);
        }, inAnim * 300);
      }
      if (entry.target.classList.contains("fade-down2")) {
        entry.target.classList.add("show-anim-down");
        observer.unobserve(entry.target);
      }

      if (entry.target.classList.contains("fade-opacity2")) {
        entry.target.classList.add("show-anim-opacity");
        observer.unobserve(entry.target);
      }

       if (entry.target.classList.contains("fade-opacity3")) {
        entry.target.classList.add("show-anim-opacity");
        observer.unobserve(entry.target);
      }

      if (entry.target.classList.contains("bar")) {
        const bar = entry.target

          const percent = bar.parentElement.previousElementSibling.querySelector(".percent");
          const target = parseInt(percent.textContent);
          let progress = 0;

          percent.textContent = "0%";
          bar.style.width = "0%";

          const interval = setInterval(() => {
            if (progress >= target) clearInterval(interval);
            else {
              progress++;
              bar.style.width = progress + "%";
              percent.textContent = progress + "%";
            }
            console.log(progress);
          }, 25);
          observer.unobserve(bar);
      
      }
    }
  });
};

const observer = new IntersectionObserver(callback, { threshold: 0.4 });
targetLayer.forEach((el) => observer.observe(el));

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
