document.addEventListener("DOMContentLoaded", () => {
  // Modal open/close
  const openBtn = document.getElementById("contact-open");
  const modal = document.getElementById("contact-modal");
  const closeBtn = document.getElementById("contact-close");
  const overlay = document.getElementById("contact-overlay");
  const form = document.getElementById("contact-form");

  function openModal() {
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector("input, textarea").focus();
  }
  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    openBtn.focus();
  }

  const contactPopover = document.getElementById("contact-popover");
  function togglePopover() {
    if (!contactPopover) return;
    const hidden = contactPopover.getAttribute("aria-hidden") === "true";
    // Toggle to opposite state
    contactPopover.setAttribute("aria-hidden", String(!hidden));
    // If it was hidden, set display block; otherwise hide
    contactPopover.style.display = hidden ? "block" : "none";
    // If we opened it (was hidden), focus the first action
    if (hidden) {
      const firstAction = contactPopover.querySelector("a");
      if (firstAction) firstAction.focus();
    }
  }
  openBtn && openBtn.addEventListener("click", togglePopover);
  const emailNowBtn = document.getElementById("contact-email");
  if (emailNowBtn) {
    const mailHref =
      emailNowBtn.getAttribute("data-mailto") ||
      "mailto:ahotonatanda98@gmail.com?subject=Hello%20Adedoyin";
    emailNowBtn.addEventListener("click", (ev) => {
      window.location.href = mailHref;
    });
    emailNowBtn.addEventListener("auxclick", (ev) => {
      if (ev.button === 1) window.location.href = mailHref;
    });
    emailNowBtn.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        window.location.href = mailHref;
      }
    });
  }
  closeBtn && closeBtn.addEventListener("click", closeModal);
  overlay && overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      if (contactPopover) {
        contactPopover.setAttribute("aria-hidden", "true");
        contactPopover.style.display = "none";
      }
    }
  });

  form &&
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      // Simulate send
      const name = data.get("name");
      form.reset();
      closeModal();
      alert(`Thanks, ${name || "there"} — your message was sent (simulated).`);
    });

  // Smooth scroll for nav links
  document.querySelectorAll('.site-nav a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(a.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });

  // No skill bars: keep markup clean (skill bars removed)

  // Close popover on outside click
  document.addEventListener("click", (e) => {
    if (!contactPopover) return;
    if (contactPopover.getAttribute("aria-hidden") === "true") return;
    if (!contactPopover.contains(e.target) && e.target !== openBtn) {
      contactPopover.setAttribute("aria-hidden", "true");
      contactPopover.style.display = "none";
    }
  });

  // Reveal sections on scroll
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const rObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            rObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    reveals.forEach((s) => rObs.observe(s));
  } else {
    reveals.forEach((s) => s.classList.add("active"));
  }
});
