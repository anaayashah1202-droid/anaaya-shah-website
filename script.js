const header = document.querySelector("[data-header]");

const setHeaderShadow = () => {
  if (!header) return;
  header.style.boxShadow = window.scrollY > 12 ? "0 10px 30px rgba(20, 20, 20, 0.08)" : "none";
};

setHeaderShadow();
window.addEventListener("scroll", setHeaderShadow, { passive: true });

document.documentElement.classList.add("js-reveal");

const revealItems = document.querySelectorAll(
  ".section, .case-file, .visual-card, .pr-card, .youtube-card, .social-work-card, .editorial-card, .campaign-video-card, .campaign-note-card, .managed-grid a, .ugc-intro-card, .reel-phone"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

const bagStage = document.querySelector("[data-bag-stage]");
const bagToggle = document.querySelector("[data-bag-toggle]");
const heroBagLinks = document.querySelectorAll("[data-open-bag]");

if (bagStage && bagToggle) {
  bagToggle.addEventListener("click", () => {
    const isOpen = bagStage.classList.toggle("is-open");
    bagToggle.setAttribute("aria-expanded", String(isOpen));
    bagToggle.querySelector("span").textContent = isOpen ? "Choose an item" : "Open the bag";

    if (isOpen) {
      window.setTimeout(() => {
        bagStage.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  });
}

heroBagLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    if (!bagStage || !bagToggle) return;
    if (!bagStage.classList.contains("is-open")) {
      bagStage.classList.add("is-open");
      bagToggle.setAttribute("aria-expanded", "true");
      bagToggle.querySelector("span").textContent = "Choose an item";
    }

    bagStage.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

const reelFrame = document.querySelector("[data-reel-frame]");
const reelButtons = document.querySelectorAll("[data-reel-src]");
const reelLink = document.querySelector("[data-reel-link-out]");
const previewTrack = document.querySelector("[data-preview-track]");
const previewNext = document.querySelector("[data-carousel-next]");
const previewPrev = document.querySelector("[data-carousel-prev]");

reelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    reelButtons.forEach((item) => item.classList.toggle("is-active", item === button));

    if (reelFrame && button.dataset.reelSrc) {
      reelFrame.src = button.dataset.reelSrc;
    }

    if (reelLink && button.dataset.reelLink) {
      reelLink.href = button.dataset.reelLink;
      reelLink.textContent = `Open ${button.dataset.reelLabel || button.textContent.trim()}`;
    }
  });
});

const scrollPreviewTrack = (direction) => {
  if (!previewTrack) return;
  previewTrack.scrollBy({
    left: direction * Math.max(260, previewTrack.clientWidth * 0.72),
    behavior: "smooth",
  });
};

previewNext?.addEventListener("click", () => scrollPreviewTrack(1));
previewPrev?.addEventListener("click", () => scrollPreviewTrack(-1));
