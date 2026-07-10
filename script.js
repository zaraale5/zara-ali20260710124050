// Mobile nav toggle
document.querySelector('.nav-toggle').addEventListener('click', function() {
  var navLinks = document.querySelector('.nav-links');
  var expanded = this.getAttribute('aria-expanded') === 'true';
  navLinks.classList.toggle('open');
  this.setAttribute('aria-expanded', !expanded);
});

// Smooth scroll for all nav links
document.querySelectorAll('.nav-links a').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var href = link.getAttribute('href');
    if(href.startsWith('#')) {
      var target = document.querySelector(href);
      if(target) {
        e.preventDefault();
        var y = target.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({ top: y, behavior: 'smooth' });
        // Close mobile menu
        document.querySelector('.nav-links').classList.remove('open');
        document.querySelector('.nav-toggle').setAttribute('aria-expanded', false);
      }
    }
  });
});

// IntersectionObserver for scroll-triggered section fade-in
if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.section-fade-in').forEach(function(section) {
    observer.observe(section);
  });
  var hero = document.querySelector('.animate-on-load');
  if (hero) setTimeout(function() { hero.classList.add('visible'); }, 100);
} else {
  // Fallback for unsupported browsers
  document.querySelectorAll('.section-fade-in, .animate-on-load').forEach(function(el) {
    el.classList.add('visible');
  });
}

// Accessible focus state for keyboard navigation
document.body.addEventListener('keyup', function(e) {
  if (e.key === 'Tab') document.body.classList.add('user-is-tabbing');
});

// Add visible skipnav focus if keyboard tabbing
document.querySelector('.skip-nav').addEventListener('focus', function() {
  this.style.transform = 'translateY(0)';
});
document.querySelector('.skip-nav').addEventListener('blur', function() {
  this.style.transform = 'translateY(-150%)';
});

// How-To details accessibility tweak: close others when one opens
document.querySelectorAll('.howto-list details').forEach(function(dtl) {
  dtl.addEventListener('toggle', function() {
    if (dtl.open) {
      document.querySelectorAll('.howto-list details').forEach(function(other) {
        if (other !== dtl) other.open = false;
      });
    }
  });
});
