document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");

      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });

  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        const currentLink = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove("active"));
          if (currentLink) currentLink.classList.add("active");
        }
      });
    },
    {
      threshold: 0.45,
      rootMargin: "-80px 0px -35% 0px"
    }
  );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  const revealElements = document.querySelectorAll(".skill-card, .project-card, .about-content, .contact-content");

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(el => {
    el.classList.add("hidden");
    revealObserver.observe(el);
  });
});
