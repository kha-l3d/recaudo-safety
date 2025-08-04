// Hamburger Menu Toggle Function
function toggleMenu() {
  const menu = document.getElementById("side-menu");
  const overlay = document.getElementById("overlay");
  const icon = document.getElementById("hamburger");

  menu.classList.toggle("open");
  overlay.classList.toggle("show");

  if (menu.classList.contains("open")) {
    icon.textContent = "✖";
  } else {
    icon.textContent = "☰";
  }
}

// Close menu when clicking on side menu links
document.addEventListener('DOMContentLoaded', function() {
  const sideMenuLinks = document.querySelectorAll('.side-menu a');
  sideMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      toggleMenu();
    });
  });
});

// Fade-in Animation beim Scrollen
const fadeEls = document.querySelectorAll('main section, .team');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Fade-in Animation für Bilder
const fadeImgEls = document.querySelectorAll('.about-img, .team-content img, .service-item img');
fadeImgEls.forEach(img => {
  img.classList.add('fade-in-img');
  observer.observe(img);
});

// Fade-in Animation für Kontaktboxen
const contactBoxes = document.querySelectorAll('.fade-in-contact');
const contactObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });
contactBoxes.forEach(box => contactObserver.observe(box));

// Fade-in Animation für Wissenswertes-Sektion
const fadeSection = document.querySelector('.fade-in-section');
if (fadeSection) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });
  sectionObserver.observe(fadeSection);
}

// Slide-in Animation für Bilder und Text in Sektionen (abwechselnd)
function animateSectionSlides() {
  // About/Team: abwechselnd links/rechts
  const aboutSections = document.querySelectorAll('.about-content, .team-content');
  aboutSections.forEach((section, idx) => {
    const img = section.querySelector('img');
    const textDiv = section.querySelector('div');
    if (img) {
      img.classList.add(idx % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
    }
    if (textDiv) {
      textDiv.classList.add(idx % 2 === 0 ? 'slide-in-right' : 'slide-in-left');
    }
  });
  // Service-Cards: von unten
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => card.classList.add('slide-in-up'));
  // Observer für alle
  const animatedEls = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });
  animatedEls.forEach(el => observer.observe(el));
}
animateSectionSlides();

// Navigation Highlight beim Scrollen
const navLinks = document.querySelectorAll('.nav-links a, .nav-big .links a, .side-menu a');
const sections = [
  document.getElementById('home'),
  document.getElementById('about'),
  document.getElementById('leistungen'),
  document.getElementById('contact')
];

function updateActiveNavLink() {
  let current = '';
  const scrollPosition = window.pageYOffset + 100; // Offset for better detection
  
  sections.forEach(section => {
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Optional: Smooth scroll for nav links
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// Impressum/Datenschutz Modal Logic
const openImpressumBtn = document.getElementById('open-impressum-modal');
const closeImpressumBtn = document.getElementById('close-impressum-modal');
const impressumModal = document.getElementById('impressum');
const openDatenschutzBtn = document.getElementById('open-datenschutz-modal');
const closeDatenschutzBtn = document.getElementById('close-datenschutz-modal');
const datenschutzModal = document.getElementById('datenschutz');

if (openImpressumBtn && impressumModal) {
  openImpressumBtn.addEventListener('click', function(e) {
    e.preventDefault();
    impressumModal.style.display = 'block';
    impressumModal.scrollIntoView({ behavior: 'smooth' });
  });
}
if (closeImpressumBtn && impressumModal) {
  closeImpressumBtn.addEventListener('click', function() {
    impressumModal.style.display = 'none';
  });
}
if (openDatenschutzBtn && datenschutzModal) {
  openDatenschutzBtn.addEventListener('click', function(e) {
    e.preventDefault();
    datenschutzModal.style.display = 'block';
    datenschutzModal.scrollIntoView({ behavior: 'smooth' });
  });
}
if (closeDatenschutzBtn && datenschutzModal) {
  closeDatenschutzBtn.addEventListener('click', function() {
    datenschutzModal.style.display = 'none';
  });
}

// Kontaktformular Validierung und Feedback
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // إزالة رسائل الخطأ السابقة
    const existingMessages = contactForm.parentElement.querySelectorAll('.error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // دالة للتحقق من صحة البريد الإلكتروني
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    // دالة للتحقق من صحة رقم الهاتف
    function isValidPhone(phone) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
      return phoneRegex.test(phone);
    }
    
    // Einfache Validierung
    let valid = true;
    const requiredFields = contactForm.querySelectorAll('[required]');
    const datenschutzCheckbox = document.getElementById('datenschutz');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('telefon');
    
    // التحقق من الحقول المطلوبة
    requiredFields.forEach(field => {
      if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
        field.style.borderColor = '#e53935';
        valid = false;
        
        // رسالة خاصة لـ checkbox الخصوصية
        if (field.type === 'checkbox' && field.id === 'datenschutz') {
          const errorMsg = document.createElement('div');
          errorMsg.className = 'error-message';
          errorMsg.textContent = '⚠️ Bitte stimmen Sie der Verarbeitung Ihrer Daten zu, um fortzufahren.';
          errorMsg.style.cssText = `
            background: #fff3cd;
            color: #856404;
            border: 1px solid #ffeaa7;
            padding: 0.8rem 1rem;
            border-radius: 6px;
            margin: 0.5rem 0;
            font-size: 0.95rem;
            font-weight: 500;
          `;
          field.parentElement.appendChild(errorMsg);
        }
      } else {
        field.style.borderColor = '';
      }
    });
    
    // التحقق من صحة البريد الإلكتروني
    if (emailField && emailField.value.trim()) {
      if (!isValidEmail(emailField.value.trim())) {
        emailField.style.borderColor = '#e53935';
        valid = false;
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = '⚠️ Bitte geben Sie eine gültige E-Mail-Adresse ein.';
        errorMsg.style.cssText = `
          background: #fff3cd;
          color: #856404;
          border: 1px solid #ffeaa7;
          padding: 0.8rem 1rem;
          border-radius: 6px;
          margin: 0.5rem 0;
          font-size: 0.95rem;
          font-weight: 500;
        `;
        emailField.parentElement.appendChild(errorMsg);
      } else {
        emailField.style.borderColor = '';
      }
    }
    
    // التحقق من صحة رقم الهاتف (إذا تم إدخاله)
    if (phoneField && phoneField.value.trim()) {
      if (!isValidPhone(phoneField.value.trim())) {
        phoneField.style.borderColor = '#e53935';
        valid = false;
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = '⚠️ Bitte geben Sie eine gültige Telefonnummer ein.';
        errorMsg.style.cssText = `
          background: #fff3cd;
          color: #856404;
          border: 1px solid #ffeaa7;
          padding: 0.8rem 1rem;
          border-radius: 6px;
          margin: 0.5rem 0;
          font-size: 0.95rem;
          font-weight: 500;
        `;
        phoneField.parentElement.appendChild(errorMsg);
      } else {
        phoneField.style.borderColor = '';
      }
    }
    
    if (!valid) {
      // تمرير إلى أعلى لرؤية رسالة الخطأ
      contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // إظهار رسالة التحميل
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Wird gesendet...';
    submitBtn.disabled = true;

    // إرسال البيانات لـ Web3Forms
    const formData = new FormData(contactForm);
    
    fetch(contactForm.action, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // إعادة تعيين الزر
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      // إظهار رسالة النجاح أو الخطأ
      const messageDiv = document.createElement('div');
      if (data.success) {
        messageDiv.textContent = 'Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich.';
        messageDiv.style.background = '#e2b857';
        messageDiv.style.color = '#1a397b';
        contactForm.reset();
      } else {
        messageDiv.textContent = 'Es gab ein Problem beim Senden der Nachricht. Bitte versuchen Sie es später erneut.';
        messageDiv.style.background = '#e53935';
        messageDiv.style.color = 'white';
      }
      messageDiv.style.padding = '1.2rem';
      messageDiv.style.borderRadius = '8px';
      messageDiv.style.margin = '1.2rem 0';
      
      contactForm.parentElement.insertBefore(messageDiv, contactForm);
      
      setTimeout(() => {
        messageDiv.remove();
      }, 6000);
    })
    .catch(() => {
      // إعادة تعيين الزر
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      // إظهار رسالة خطأ
      const errorMsg = document.createElement('div');
      errorMsg.textContent = 'Es gab ein Problem beim Senden der Nachricht. Bitte versuchen Sie es später erneut.';
      errorMsg.style.background = '#e53935';
      errorMsg.style.color = 'white';
      errorMsg.style.padding = '1.2rem';
      errorMsg.style.borderRadius = '8px';
      errorMsg.style.margin = '1.2rem 0';
      
      contactForm.parentElement.insertBefore(errorMsg, contactForm);
      
      setTimeout(() => {
        errorMsg.remove();
      }, 6000);
    });
  });
}

// إزالة رسائل الخطأ عند تصحيح البيانات
document.addEventListener('DOMContentLoaded', function() {
  const datenschutzCheckbox = document.getElementById('datenschutz');
  const emailField = document.getElementById('email');
  const phoneField = document.getElementById('telefon');
  
  // إزالة رسالة الخطأ عند تحديد checkbox الخصوصية
  if (datenschutzCheckbox) {
    datenschutzCheckbox.addEventListener('change', function() {
      if (this.checked) {
        const errorMessage = this.parentElement.querySelector('.error-message');
        if (errorMessage) {
          errorMessage.remove();
        }
        this.style.borderColor = '';
      }
    });
  }
  
  // إزالة رسالة الخطأ عند تصحيح البريد الإلكتروني
  if (emailField) {
    emailField.addEventListener('input', function() {
      const errorMessage = this.parentElement.querySelector('.error-message');
      if (errorMessage) {
        errorMessage.remove();
      }
      this.style.borderColor = '';
    });
  }
  
  // إزالة رسالة الخطأ عند تصحيح رقم الهاتف
  if (phoneField) {
    phoneField.addEventListener('input', function() {
      const errorMessage = this.parentElement.querySelector('.error-message');
      if (errorMessage) {
        errorMessage.remove();
      }
      this.style.borderColor = '';
    });
  }
});

// Impressum Card Umschalten mit Fade-out
const impressumCardBtn = document.getElementById('impressum-card-btn');
const impressumCardContent = document.getElementById('impressum-card-content');
if (impressumCardBtn && impressumCardContent) {
  impressumCardBtn.addEventListener('click', function() {
    impressumCardContent.innerHTML = `
      <div class="impressum-card-info">
        <button id="impressum-card-close" title="Schließen">&times;</button>
        <h3>Mehr Informationen</h3>
        <p>Recaudo&Safety UG (Haftungsbeschränkt)<br>
        Berliner Str.38, 10715 Berlin<br>
        Tel: 0176/22362263<br>
        E-Mail: info@recaudo-safety.de<br>
        Geschäftsführer: Alahmad Ramadan<br>
        Handelsregister: HRB 260918 B<br>
        Amtsgericht Berlin – Charlottenburg<br>
        Steuer-ID-Nr.: DE366054449</p>
      </div>
    `;
    setTimeout(() => {
      const closeBtn = document.getElementById('impressum-card-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          const infoDiv = closeBtn.parentElement;
          if (infoDiv) {
            infoDiv.classList.add('fade-out');
            setTimeout(() => {
              impressumCardContent.innerHTML = '';
              impressumCardContent.appendChild(impressumCardBtn);
            }, 500);
          }
        });
      }
    }, 10);
  });
}

// Accordion-Logik
function setupAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      // Nur ein Item gleichzeitig offen
      items.forEach(i => { if (i !== item) i.classList.remove('open'); });
      item.classList.toggle('open');
    });
  });
}
setupAccordion();

// Navbar Scroll Effects
const header = document.querySelector('header');
const navBig = document.querySelector('.nav-big');
const navbar = document.querySelector('.navbar');
const navbarBrand = document.querySelector('.navbar-brand');

function handleNavbarScroll() {
  // تأثير السكرول على الناف بار الجديد
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
    navBig.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
    navBig.classList.remove('scrolled');
  }
  
  // تأثير السكرول على الناف بار القديم (للتوافق)
  if (navbar) {
    if (window.scrollY > 40) {
      navbar.classList.add('navbar-small');
      // إخفاء اسم الشركة في الريسبونسيف فقط عند السكروول
      if (window.innerWidth <= 700 && navbarBrand) {
        navbarBrand.classList.add('hide-brand-on-scroll');
      }
    } else {
      navbar.classList.remove('navbar-small');
      if (navbarBrand) {
        navbarBrand.classList.remove('hide-brand-on-scroll');
      }
    }
  }
}

window.addEventListener('scroll', handleNavbarScroll);
window.addEventListener('resize', handleNavbarScroll);
handleNavbarScroll();

// Animation für Kontakt-Icons
const contactInfoIcons = document.querySelector('.contact-info-icons');
if (contactInfoIcons) {
  const iconsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        contactInfoIcons.classList.add('visible');
      } else {
        contactInfoIcons.classList.remove('visible');
      }
    });
  }, { threshold: 0.2, root: document.querySelector('.contact') });
  iconsObserver.observe(contactInfoIcons);
}

// ========== Cookie Consent Banner ==========
function showCookieBanner() {
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner && !localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 1000);
  }
}

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  hideCookieBanner();
  showAcceptanceMessage('Cookies wurden akzeptiert!');
}

function rejectCookies() {
  localStorage.setItem('cookieConsent', 'rejected');
  hideCookieBanner();
  showAcceptanceMessage('Cookies wurden abgelehnt.');
}

function hideCookieBanner() {
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    cookieBanner.classList.remove('show');
  }
}

function showAcceptanceMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--main-orange);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    z-index: 10001;
    box-shadow: 0 4px 12px rgba(255, 153, 0, 0.3);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    messageDiv.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 300);
  }, 3000);
}

// Back to Top Button Functionality
function setupBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    
    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', function() {
  setupBackToTop();
});

// Initialize cookie banner
document.addEventListener('DOMContentLoaded', function() {
  showCookieBanner();
});