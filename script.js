function moveNavIndicator(btn) {
  const indicator = document.getElementById("navIndicator");
  if (!indicator || !btn) return;
  indicator.style.left = btn.offsetLeft + "px";
  indicator.style.width = btn.offsetWidth + "px";
}

function setActiveNav(sectionId) {
  document.querySelectorAll(".nav-btn").forEach(function (btn) {
    btn.classList.remove("active");
  });
  const activeBtn = document.querySelector('.nav-btn[data-section="' + sectionId + '"]');
  if (activeBtn) {
    activeBtn.classList.add("active");
    moveNavIndicator(activeBtn);
  }
}

window.addEventListener("resize", function () {
  const active = document.querySelector(".nav-btn.active");
  if (active) moveNavIndicator(active);
});

document.addEventListener("click", function (e) {
  const el = e.target.closest("button, .nav-btn");
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
  ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
  el.appendChild(ripple);
  setTimeout(function () {
    ripple.remove();
  }, 550);
});

function openLightbox(src) {
  if (!src) return;
  document.getElementById("lightboxImg").src = src;
  document.getElementById("lightboxOverlay").classList.add("active");
}

function closeLightbox() {
  document.getElementById("lightboxOverlay").classList.remove("active");
  document.getElementById("lightboxImg").src = "";
}

document.addEventListener("click", function (e) {
  const clickedImg = e.target.closest(".image-frame img");
  if (clickedImg) openLightbox(clickedImg.src);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeLightbox();
});

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  items.forEach(function (el, index) {
    el.style.transitionDelay = (index % 6) * 0.08 + "s";
  });
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(function (el) {
    observer.observe(el);
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll(".section");
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActiveNav(entry.target.id);
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
  sections.forEach(function (section) {
    observer.observe(section);
  });
}

function initPortfolio() {
  const activeBtn = document.querySelector(".nav-btn.active") || document.querySelector(".nav-btn");
  if (activeBtn) moveNavIndicator(activeBtn);
  initReveal();
  initScrollSpy();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPortfolio);
} else {
  initPortfolio();
}