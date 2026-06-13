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
const bagObjects = document.querySelectorAll("[data-popup-tab]");
const bagButtons = document.querySelectorAll("[data-bag-tab]");
const bagPanels = document.querySelectorAll("[data-bag-panel]");
const portfolioPopup = document.querySelector("[data-portfolio-popup]");
const popupCloseButtons = document.querySelectorAll("[data-popup-close]");
const popupTabs = document.querySelectorAll("[data-modal-tab]");
const popupPanels = document.querySelectorAll("[data-modal-panel]");
const popupJumpLinks = document.querySelectorAll("[data-popup-jump]");

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

const openPopupTab = (selectedTab) => {
  popupTabs.forEach((item) => {
    const isActive = item.dataset.modalTab === selectedTab;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", String(isActive));
  });

  popupPanels.forEach((panel) => {
    panel.classList.toggle("is-hidden", panel.dataset.modalPanel !== selectedTab);
  });
};

const openPortfolioPopup = (selectedTab) => {
  if (!portfolioPopup) return;
  openPopupTab(selectedTab);
  portfolioPopup.classList.remove("is-hidden");
  document.body.classList.add("has-popup");
};

const closePortfolioPopup = () => {
  if (!portfolioPopup) return;
  portfolioPopup.classList.add("is-hidden");
  document.body.classList.remove("has-popup");
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

bagObjects.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openPortfolioPopup(link.dataset.popupTab);
  });
});

popupTabs.forEach((button) => {
  button.addEventListener("click", () => {
    openPopupTab(button.dataset.modalTab);
  });
});

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", closePortfolioPopup);
});

popupJumpLinks.forEach((link) => {
  link.addEventListener("click", closePortfolioPopup);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePortfolioPopup();
  }
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
