const header = document.querySelector("[data-header]");

const setHeaderShadow = () => {
  if (!header) return;
  header.style.boxShadow = window.scrollY > 12 ? "0 10px 30px rgba(20, 20, 20, 0.08)" : "none";
};

setHeaderShadow();
window.addEventListener("scroll", setHeaderShadow, { passive: true });

const bagStage = document.querySelector("[data-bag-stage]");
const bagToggle = document.querySelector("[data-bag-toggle]");
const heroBagLinks = document.querySelectorAll("[data-open-bag]");
const bagButtons = document.querySelectorAll("[data-bag-tab]");
const bagPanels = document.querySelectorAll("[data-bag-panel]");

const openPortfolioTab = (selectedTab) => {
  bagButtons.forEach((item) => {
    const isActive = item.dataset.bagTab === selectedTab;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", String(isActive));
  });

  bagPanels.forEach((panel) => {
    panel.classList.toggle("is-hidden", panel.dataset.bagPanel !== selectedTab);
  });
};

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
  link.addEventListener("click", () => {
    if (!bagStage || !bagToggle) return;
    if (!bagStage.classList.contains("is-open")) {
      bagStage.classList.add("is-open");
      bagToggle.setAttribute("aria-expanded", "true");
      bagToggle.querySelector("span").textContent = "Choose an item";
    }
  });
});

document.querySelectorAll("[data-open-tab]").forEach((link) => {
  link.addEventListener("click", () => {
    openPortfolioTab(link.dataset.openTab);
  });
});

bagButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openPortfolioTab(button.dataset.bagTab);
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
