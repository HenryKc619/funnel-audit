(function () {
  "use strict";

  // ========================================
  // Initialize AOS (outside DOMContentLoaded)
  // ========================================
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });

    window.addEventListener("load", function () {
      AOS.refresh();
    });
  }

  // ========================================
  // Main Initialization
  // ========================================
  document.addEventListener("DOMContentLoaded", function () {
    initLoader();
    initStickyHeader();
    initHeroSwiper();
    initTestimonialsSwiper();
    initIsotope();
    initLightbox();
    initCountdown();
    initCounterUp();
    initScrollDown();
    initPricingHover();
    initSearchToggle();
    initScrollToTop();
    initJarallax();
    initPreventDefault();
  });

  // ========================================
  // Loader
  // ========================================
  function initLoader() {
    var preloader = document.getElementById("preloader");
    if (!preloader) return;

    window.addEventListener("load", function () {
      preloader.style.transition = "opacity 1s ease";
      preloader.style.opacity = "0";
      setTimeout(function () {
        preloader.style.display = "none";
      }, 1000);
    });
  }

  // ========================================
  // Sticky Header
  // ========================================
  function initStickyHeader() {
    var header = document.querySelector(".header-area");
    if (!header) return;

    function handleScroll() {
      if (window.scrollY > 0) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on load
  }

  // ========================================
  // Hero Swiper
  // ========================================
  function initHeroSwiper() {
    var heroEl = document.querySelector(".welcome-slides");
    if (!heroEl || typeof Swiper === "undefined") return;

    var heroSwiper = new Swiper(".welcome-slides", {
      slidesPerView: 1,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".welcome-slides .swiper-button-next",
        prevEl: ".welcome-slides .swiper-button-prev",
      },
      on: {
        init: function () {
          // Trigger animation on first slide
          var activeSlide = this.slides[this.activeIndex];
          triggerSlideAnimations(activeSlide);
        },
        slideChangeTransitionStart: function () {
          // Reset animations on all slides
          this.slides.forEach(function (slide) {
            var animatedEls = slide.querySelectorAll("[data-animation]");
            animatedEls.forEach(function (el) {
              var animName = el.getAttribute("data-animation");
              el.classList.remove("animated", animName);
              el.style.opacity = "0";
            });
          });
        },
        slideChangeTransitionEnd: function () {
          // Trigger animations on active slide
          var activeSlide = this.slides[this.activeIndex];
          triggerSlideAnimations(activeSlide);
        },
      },
    });

    function triggerSlideAnimations(slide) {
      var animatedEls = slide.querySelectorAll("[data-animation]");
      animatedEls.forEach(function (el) {
        var animName = el.getAttribute("data-animation");
        var delay = el.getAttribute("data-delay") || "0ms";
        el.style.animationDelay = delay;
        el.classList.add("animated", animName);
        el.style.opacity = "1";
      });
    }
  }

  // ========================================
  // Testimonials Swiper
  // ========================================
  function initTestimonialsSwiper() {
    var clientEl = document.querySelector(".client-area.swiper");
    if (!clientEl || typeof Swiper === "undefined") return;

    new Swiper(".client-area", {
      slidesPerView: 2,
      spaceBetween: 40,
      loop: true,
      autoplay: {
        delay: 7000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".client-area .swiper-button-next",
        prevEl: ".client-area .swiper-button-prev",
      },
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 15 },
        576: { slidesPerView: 1, spaceBetween: 15 },
        992: { slidesPerView: 2, spaceBetween: 15 },
        1200: { slidesPerView: 2, spaceBetween: 15 },
      },
    });
  }

  // ========================================
  // Isotope Gallery
  // ========================================
  function initIsotope() {
    var grid = document.querySelector(".confer-portfolio");
    if (!grid || typeof Isotope === "undefined") return;

    // Wait for images to load
    if (typeof imagesLoaded !== "undefined") {
      imagesLoaded(grid, function () {
        initIsotopeGrid();
      });
    } else {
      initIsotopeGrid();
    }

    function initIsotopeGrid() {
      var iso = new Isotope(grid, {
        itemSelector: ".single_gallery_item",
        percentPosition: true,
        masonry: {
          columnWidth: ".single_gallery_item",
        },
      });

      var filterBtns = document.querySelectorAll(".portfolio-menu button");
      filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var filterValue = this.getAttribute("data-filter");
          iso.arrange({ filter: filterValue });
          filterBtns.forEach(function (b) {
            b.classList.remove("active");
          });
          this.classList.add("active");
        });
      });
    }
  }

  // ========================================
  // GLightbox
  // ========================================
  function initLightbox() {
    if (typeof GLightbox === "undefined") return;

    // Video lightbox
    GLightbox({
      selector: ".video-play-btn",
      touchNavigation: true,
      loop: false,
    });

    // Image gallery lightbox
    GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
    });

    // Footer gallery
    GLightbox({
      selector: ".single-gallery-item",
      touchNavigation: true,
      loop: true,
    });
  }

  // ========================================
  // Countdown Timer
  // ========================================
  function initCountdown() {
    var clockEl = document.getElementById("clock");
    if (!clockEl) return;

    // =====================================================
    // COUNTDOWN CONFIGURATION
    // =====================================================
    // Demo Mode: Set to true for template preview (always counts down)
    // Production: Set to false and specify your event date below
    var demoMode = true;

    // For production, set your event date here (format: 'YYYY/MM/DD HH:MM:SS')
    // Example: var eventDate = '2032/01/14 09:00:00';
    var eventDate = "2032/01/14 09:00:00";

    // Demo mode: Always 100 days from now (timer never expires)
    var targetDate;
    if (demoMode) {
      targetDate = new Date().getTime() + 100 * 24 * 60 * 60 * 1000;
    } else {
      targetDate = new Date(eventDate).getTime();
    }
    // =====================================================

    function updateCountdown() {
      var now = new Date().getTime();
      var distance;

      if (demoMode) {
        // In demo mode, recalculate to always be 100 days ahead
        distance = 100 * 24 * 60 * 60 * 1000 - (now % (1000 * 60 * 60 * 24));
      } else {
        distance = targetDate - now;
      }

      if (!demoMode && distance < 0) {
        clockEl.innerHTML = '<div class="countdown-ended">Event Started!</div>';
        return;
      }

      var months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
      var days = Math.floor(
        (distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
      );
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      clockEl.innerHTML =
        "<div>" +
        months +
        " <span>Months</span></div>" +
        "<div>" +
        days +
        " <span>Days</span></div>" +
        "<div>" +
        hours +
        " <span>Hours</span></div>" +
        "<div>" +
        minutes +
        " <span>Minutes</span></div>" +
        "<div>" +
        seconds +
        " <span>Seconds</span></div>";
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ========================================
  // Counter Up (Intersection Observer)
  // ========================================
  function initCounterUp() {
    var counters = document.querySelectorAll(".counter");
    if (!counters.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var counter = entry.target;
            var target =
              parseInt(counter.textContent) ||
              parseInt(counter.getAttribute("data-count")) ||
              0;
            if (target > 0) {
              animateCounter(counter, target);
            }
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });

    function animateCounter(el, target) {
      var current = 0;
      var increment = target / 100;
      var timer = setInterval(function () {
        current += increment;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 20);
    }
  }

  // ========================================
  // Scroll Down Button
  // ========================================
  function initScrollDown() {
    var scrollBtn = document.getElementById("scrollDown");
    if (!scrollBtn) return;

    scrollBtn.addEventListener("click", function () {
      var about = document.getElementById("about");
      if (about) {
        var offsetTop = about.offsetTop - 75;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  }

  // ========================================
  // Pricing Table Hover
  // ========================================
  function initPricingHover() {
    var pricingTables = document.querySelectorAll(
      ".single-ticket-pricing-table"
    );
    if (!pricingTables.length) return;

    pricingTables.forEach(function (table) {
      table.addEventListener("mouseenter", function () {
        pricingTables.forEach(function (t) {
          t.classList.remove("active");
        });
        this.classList.add("active");
      });
    });
  }

  // ========================================
  // Search Toggle
  // ========================================
  function initSearchToggle() {
    var searchBtn = document.querySelector(".search-btn");
    var searchForm = document.querySelector(".search-form");
    if (!searchBtn || !searchForm) return;

    searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      searchForm.classList.toggle("search-form-active");
    });
  }

  // ========================================
  // Scroll To Top
  // ========================================
  function initScrollToTop() {
    // Create scroll up button
    var scrollUpBtn = document.createElement("a");
    scrollUpBtn.id = "scrollUp";
    scrollUpBtn.href = "#top";
    scrollUpBtn.innerHTML = '<i class="fas fa-angle-up"></i>';
    scrollUpBtn.style.display = "none";
    document.body.appendChild(scrollUpBtn);

    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        scrollUpBtn.style.display = "block";
      } else {
        scrollUpBtn.style.display = "none";
      }
    });

    scrollUpBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ========================================
  // Jarallax Parallax
  // ========================================
  function initJarallax() {
    if (typeof jarallax === "undefined") return;

    jarallax(document.querySelectorAll(".jarallax"), {
      speed: 0.5,
    });
  }

  // ========================================
  // Prevent Default on # links
  // ========================================
  function initPreventDefault() {
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
      });
    });
  }
})();
