/**
 * Veera Women's Tailor - Custom JavaScript
 */

// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Bootstrap components
  initBootstrapComponents();

  // Add smooth scrolling for navigation links
  addSmoothScrolling();

  // Add scroll event listener for navbar
  handleNavbarScroll();

  // Handle contact form submission
  setupContactForm();
});

/**
 * Initialize Bootstrap components like carousels
 */
function initBootstrapComponents() {
  // Hero section carousel configuration
  const heroCarousel = document.getElementById("heroCarousel");
  if (heroCarousel) {
    const carousel = new bootstrap.Carousel(heroCarousel, {
      interval: 3000,
      wrap: true,
      keyboard: true,
    });
  }

  // Testimonial carousel configuration
  const testimonialCarousel = document.getElementById("testimonialCarousel");
  if (testimonialCarousel) {
    const carousel = new bootstrap.Carousel(testimonialCarousel, {
      interval: 5000,
      wrap: true,
      keyboard: true,
    });
  }
}

/**
 * Add smooth scrolling behavior to navigation links
 */
function addSmoothScrolling() {
  const navLinks = document.querySelectorAll(
    "header a.nav-link, .footer-links a"
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Check if the link has a hash (internal link)
      const targetId = this.getAttribute("href");
      if (targetId.startsWith("#")) {
        e.preventDefault();

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Smooth scroll to the target
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Account for fixed header
            behavior: "smooth",
          });

          // Update active link
          navLinks.forEach((navLink) => navLink.classList.remove("active"));
          this.classList.add("active");

          // Close mobile menu if open
          const navbarCollapse = document.querySelector(".navbar-collapse");
          if (navbarCollapse.classList.contains("show")) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
          }
        }
      }
    });
  });
}

/**
 * Handle navbar appearance on scroll
 */
function handleNavbarScroll() {
  const navbar = document.querySelector("header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.style.padding = "5px 0";
      //   navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
    } else {
      navbar.style.padding = "15px 0";
      //   navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }

    // Update active menu item based on scroll position
    updateActiveNavLink();
  });
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header a.nav-link");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

/**
 * Handle contact form submission
 */
function setupContactForm() {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = contactForm.querySelector('input[type="text"]').value;
      const phone = contactForm.querySelector('input[type="tel"]').value;
      const service = contactForm.querySelector("select:nth-of-type(1)").value;
      const contactMethod = contactForm.querySelector(
        "select:nth-of-type(2)"
      ).value;
      const message = contactForm.querySelector("textarea").value;

      // Validate form
      if (!name || !phone || !service || !contactMethod) {
        showFormNotification("Please fill all required fields", "error");
        return;
      }

      // In a real implementation, you'd send this data to a server
      // For now, we'll just show a success message
      showFormNotification(
        `Thank you, ${name}! We'll contact you soon via ${contactMethod}.`,
        "success"
      );

      // Reset form
      contactForm.reset();
    });
  }
}

/**
 * Show notification after form submission
 */
function showFormNotification(message, type) {
  // Check if notification already exists and remove it
  const existingNotification = document.querySelector(".form-notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `alert ${
    type === "success" ? "alert-success" : "alert-danger"
  } form-notification`;
  notification.innerHTML = message;

  // Add to DOM
  const contactForm = document.querySelector(".contact-form");
  contactForm.prepend(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// WhatsApp quick contact functionality
const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
whatsappLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    // You can customize the pre-filled message if needed
    // const currentUrl = encodeURIComponent(window.location.href);
    // const message = encodeURIComponent('Hi Veera Tailor, I want to inquire about your services.');
    // this.href = `${this.href}?text=${message}`;
  });
});
