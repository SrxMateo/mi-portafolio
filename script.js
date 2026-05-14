document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section, header.hero');
  const animatedItems = document.querySelectorAll(
    '.about-content, .skill-card, .project-card, .contact-content'
  );

  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href");

      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);

        if (target) {
          event.preventDefault();
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });

  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        if (!id) return;

        const currentLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (!currentLink) return;

        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove("active"));
          currentLink.classList.add("active");
        }
      });
    },
    {
      threshold: 0.45,
      rootMargin: "-80px 0px -35% 0px"
    }
  );

  sections.forEach(section => {
    navObserver.observe(section);
  });

  animatedItems.forEach(item => {
    item.classList.add("hidden");
  });

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

  animatedItems.forEach(item => {
    revealObserver.observe(item);
  });
});
