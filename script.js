const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

const setHeaderShadow = () => {
  if (!header) return;
  header.style.boxShadow = window.scrollY > 12 ? "0 10px 30px rgba(20, 20, 20, 0.08)" : "none";
};

setHeaderShadow();
window.addEventListener("scroll", setHeaderShadow, { passive: true });

document.documentElement.classList.add("js-reveal");

const revealItems = document.querySelectorAll(
  ".section, .marquee-strip, .case-file, .visual-card, .pr-card, .youtube-card, .social-work-card, .editorial-card, .campaign-video-card, .campaign-note-card, .managed-grid a, .ugc-intro-card, .reel-phone, .featured-card, .work-row, .experience-item"
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
const bagPreviewLinks = document.querySelectorAll("[data-bag-preview]");
const bagDrawer = document.querySelector("[data-bag-drawer]");
const drawerMedia = document.querySelector("[data-drawer-media]");
const drawerKicker = document.querySelector("[data-drawer-kicker]");
const drawerTitle = document.querySelector("[data-drawer-title]");
const drawerCopy = document.querySelector("[data-drawer-copy]");
const drawerActions = document.querySelector("[data-drawer-actions]");
const drawerCloseButtons = document.querySelectorAll("[data-drawer-close]");

const drawerContent = {
  mockups: {
    kicker: "Visual work",
    title: "Beauty collaboration mockups",
    copy: "Campaign-style visuals for Rhode x Haus Labs and Huda Beauty x NARS, focused on product pairing, launch aesthetics, and brand fit.",
    media: '<img src="assets/work-samples/rhode-haus-labs-visuals.jpg" alt="Rhode x Haus Labs campaign mockup" />',
    actions: [{ label: "View mockups", href: "#mockup-visuals" }],
  },
  collabs: {
    kicker: "Creator partnerships",
    title: "Brand collaborations",
    copy: "Fashion, beauty, lifestyle, and hospitality collaborations with direct post links and platform-native storytelling.",
    media: '<div class="drawer-doc-icon">Collabs</div>',
    actions: [{ label: "View accounts", href: "#brand-collaborations" }],
  },
  social: {
    kicker: "Social media",
    title: "Creator content",
    copy: "Instagram and TikTok content built around hooks, pacing, editing, styling, beauty, fashion, and audience fit.",
    media: '<img src="assets/personal/anaaya-blue-lifestyle.png" alt="Anaaya Shah creator portrait" />',
    actions: [
      { label: "Instagram", href: "https://www.instagram.com/anaaya.shah/?hl=en" },
      { label: "TikTok", href: "https://www.tiktok.com/@beautywanaaya" },
    ],
  },
  pr: {
    kicker: "PR materials",
    title: "Media-ready documents",
    copy: "Infographic, media backgrounder, media pitch, media list, and writing samples for clear communications work.",
    media: '<div class="drawer-doc-icon">PR Kit</div>',
    actions: [
      { label: "Open infographic", href: "assets/media-materials/boilermaker-golf-complex-infographic.pdf" },
      { label: "Open pitch", href: "assets/media-materials/media-pitch.pdf" },
    ],
  },
  video: {
    kicker: "Video work",
    title: "Product video concepts",
    copy: "Short-form product storytelling built around hooks, detail shots, styling, pacing, and conversion-friendly framing.",
    media: '<iframe src="https://www.youtube.com/embed/tJezH4-1aKE" title="Kindly product video campaign" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    actions: [
      { label: "Kindly video", href: "https://youtu.be/tJezH4-1aKE?si=sBs0DrtvwAaPhPjH" },
      { label: "AH&E Jewels video", href: "https://youtu.be/ClEIrnJ8KRI?si=zdH4sM6XNusCTA_R" },
    ],
  },
  contact: {
    kicker: "Resume + contact",
    title: "Let’s work together",
    copy: "Open to social media, PR, influencer marketing, brand marketing, content marketing, and digital marketing roles.",
    media: '<div class="drawer-doc-icon">AS</div>',
    actions: [
      { label: "Download resume", href: "assets/anaaya-shah-resume.pdf", download: "Anaaya-Shah-Resume.pdf" },
      { label: "Contact", href: "#contact" },
    ],
  },
};

const toggleMobileNav = (forceOpen) => {
  if (!nav || !navToggle) return;
  const willOpen = typeof forceOpen === "boolean" ? forceOpen : !nav.classList.contains("is-open");
  nav.classList.toggle("is-open", willOpen);
  navToggle.classList.toggle("is-open", willOpen);
  navToggle.setAttribute("aria-expanded", String(willOpen));
  document.body.classList.toggle("menu-open", willOpen);
};

navToggle?.addEventListener("click", () => toggleMobileNav());

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => toggleMobileNav(false));
});

const closeDrawer = () => {
  if (!bagDrawer) return;
  bagDrawer.classList.remove("is-open");
  bagDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("has-drawer");
};

const openDrawer = (key) => {
  const content = drawerContent[key];
  if (!content || !bagDrawer || !drawerMedia || !drawerKicker || !drawerTitle || !drawerCopy || !drawerActions) return;

  drawerMedia.innerHTML = content.media;
  drawerKicker.textContent = content.kicker;
  drawerTitle.textContent = content.title;
  drawerCopy.textContent = content.copy;
  drawerActions.innerHTML = content.actions
    .map((action) => {
      const target = action.href.startsWith("#") ? "" : ' target="_blank" rel="noreferrer"';
      const download = action.download ? ` download="${action.download}"` : "";
      return `<a href="${action.href}"${target}${download}>${action.label}</a>`;
    })
    .join("");

  bagDrawer.classList.add("is-open");
  bagDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-drawer");
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

bagPreviewLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openDrawer(link.dataset.bagPreview);
  });
});

drawerCloseButtons.forEach((button) => {
  button.addEventListener("click", closeDrawer);
});

drawerActions?.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (link?.getAttribute("href")?.startsWith("#")) {
    closeDrawer();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDrawer();
    toggleMobileNav(false);
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

const experienceItems = document.querySelectorAll(".experience-item");

experienceItems.forEach((item) => {
  const trigger = item.querySelector(".experience-trigger");

  trigger?.addEventListener("click", () => {
    const willOpen = !item.classList.contains("is-open");
    if (!willOpen) return;

    experienceItems.forEach((entry) => {
      entry.classList.remove("is-open");
      entry.querySelector(".experience-trigger")?.setAttribute("aria-expanded", "false");
    });

    if (willOpen) {
      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});

const hero = document.querySelector(".editorial-hero");
const parallaxTiles = document.querySelectorAll("[data-parallax]");

if (hero && parallaxTiles.length && window.matchMedia("(pointer: fine)").matches) {
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    parallaxTiles.forEach((tile, index) => {
      const strength = 14 + index * 4;
      const rotate = (index % 2 === 0 ? -1 : 1) * (6 + x * 5);
      tile.style.transform = `translate(${x * strength}px, ${y * strength}px) rotate(${rotate}deg)`;
    });
  });

  hero.addEventListener("pointerleave", () => {
    parallaxTiles.forEach((tile) => {
      tile.style.transform = "";
    });
  });
}

const cursorBubble = document.querySelector("[data-cursor-bubble]");

if (cursorBubble && window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener(
    "pointermove",
    (event) => {
      cursorBubble.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursorBubble.style.setProperty("--cursor-y", `${event.clientY}px`);
    },
    { passive: true }
  );

  document.querySelectorAll("[data-cursor-label]").forEach((item) => {
    item.addEventListener("pointerenter", () => {
      cursorBubble.textContent = item.dataset.cursorLabel || "View";
      cursorBubble.classList.add("is-visible");
    });

    item.addEventListener("pointerleave", () => {
      cursorBubble.classList.remove("is-visible");
    });
  });
}

const magneticTargets = document.querySelectorAll(".button, .header-action, .phone-cta, .drawer-actions a");

if (window.matchMedia("(pointer: fine)").matches) {
  magneticTargets.forEach((target) => {
    target.addEventListener("pointermove", (event) => {
      const rect = target.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      target.style.transform = `translate(${x * 8}px, ${y * 6}px)`;
    });

    target.addEventListener("pointerleave", () => {
      target.style.transform = "";
    });
  });
}
