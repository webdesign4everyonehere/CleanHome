document.addEventListener('DOMContentLoaded', () => {
  // Team Member Bio Functionality
  const teamMembers = document.querySelectorAll('.team-member');
  const bioOverlay = document.querySelector('.bio-overlay');
  const closeBio = document.querySelector('.close-bio');

  if (teamMembers.length > 0 && bioOverlay) {
    const bioAvatar = document.querySelector('.bio-avatar');
    const bioName = document.querySelector('.bio-name');
    const bioRole = document.querySelector('.bio-role');
    const bioText = document.querySelector('.bio-text');

    // Open bio when clicking on a team member
    teamMembers.forEach(member => {
      member.addEventListener('click', function () {
        const img = this.querySelector('img');
        const name = this.querySelector('h3').textContent;
        const role = this.querySelector('p').textContent;
        const bio = this.getAttribute('data-bio');

        // Set the bio content
        bioAvatar.src = img.src;
        bioAvatar.alt = img.alt;
        bioName.textContent = name;
        bioRole.textContent = role;
        bioText.textContent = bio;

        // Show the overlay
        bioOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when overlay is open
      });
    });

    // Close bio when clicking the close button
    closeBio.addEventListener('click', function () {
      bioOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
    });

    // Close bio when clicking outside the content
    bioOverlay.addEventListener('click', function (e) {
      if (e.target === bioOverlay) {
        bioOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
      }
    });

    // Close bio with Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && bioOverlay.classList.contains('active')) {
        bioOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
      }
    });
  }

  const navToggle = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const backBtn = document.getElementById('backToTop');
  // reveal on scroll
  let revealObserver = null;
  const observeReveal = (el) => { if (!revealObserver || !el) return; revealObserver.observe(el); };
  const initReveal = () => {
    try {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('show'); revealObserver.unobserve(entry.target); }
        })
      }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
      document.querySelectorAll('.reveal').forEach(observeReveal);
    } catch (e) {
      // fallback: show immediately
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('show'));
    }
  };
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('show'))
  }
  const onScroll = () => {
    if (window.scrollY > 300) { backBtn && backBtn.classList.add('show') } else { backBtn && backBtn.classList.remove('show') }
  }
  window.addEventListener('scroll', onScroll); onScroll();
  backBtn && backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1); if (!id) return; const el = document.getElementById(id); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
    })
  })
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      const subject = contactForm.querySelector('[name="subject"]').value.trim();
      const message = contactForm.querySelector('[name="message"]').value.trim();
      const errors = [];
      if (name.length < 2) errors.push('Nom invalide');
      if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('Email invalide');
      if (subject.length < 2) errors.push('Sujet invalide');
      if (message.length < 10) errors.push('Message trop court');
      const feedback = document.getElementById('contactFeedback');
      if (errors.length) { feedback && display(feedback, 'error', errors.join('. ')) }
      else { feedback && display(feedback, 'success', 'Message envoyé.'); contactForm.reset() }
    })
  }
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      const type = bookingForm.querySelector('[name="type"]').value;
      const date = bookingForm.querySelector('[name="date"]').value;
      const time = bookingForm.querySelector('[name="time"]').value;
      const name = bookingForm.querySelector('[name="name"]').value.trim();
      const email = bookingForm.querySelector('[name="email"]').value.trim();
      const address = bookingForm.querySelector('[name="address"]').value.trim();
      const errors = [];
      if (!type) errors.push('Choisir un service');
      if (!date) errors.push('Choisir une date');
      if (!time) errors.push('Choisir une heure');
      if (name.length < 2) errors.push('Nom invalide');
      if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('Email invalide');
      if (address.length < 5) errors.push('Adresse invalide');
      const feedback = document.getElementById('bookingFeedback');
      if (errors.length) { feedback && display(feedback, 'error', errors.join('. ')) }
      else { feedback && display(feedback, 'success', 'Demande envoyée.'); bookingForm.reset() }
    })
  }
  const testimonialsList = document.getElementById('testimonialsList');
  const testimonialForm = document.getElementById('testimonialForm');
  if (testimonialsList) {
    const initial = [
      { name: 'Lina', rating: 5, text: 'Service impeccable et ponctuel.', avatar: 'assets/img/avis_lina.png' },
      { name: 'Karim', rating: 4, text: 'Très professionnel, je recommande.', avatar: 'assets/img/avis_karim.png' },
      { name: 'Nadia', rating: 5, text: 'Maison nickel après le passage de l\'équipe.', avatar: 'assets/img/avis_nadia.png' }
    ];
    const render = item => {
      const li = document.createElement('li');
      li.className = 'card reveal';
      const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
      const avatar = (item && item.avatar) ? item.avatar : 'assets/img/avatar-default.svg';
      li.innerHTML = `
    <div class="t-head">
      <img class="avatar-sm" src="${avatar}" alt="Avatar de ${item.name}">
      <div>
        <div class="t-name">${item.name}</div>
        <div class="t-stars" aria-label="Note ${item.rating} sur 5">${stars}</div>
      </div>
    </div>
    <p>${item.text}</p>
   `;
      testimonialsList.prepend(li);
      observeReveal(li);
    }
    initial.forEach(render);
    if (testimonialForm) {
      testimonialForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = testimonialForm.querySelector('[name="name"]').value.trim();
        const rating = parseInt(testimonialForm.querySelector('[name="rating"]').value, 10) || 5;
        const text = testimonialForm.querySelector('[name="text"]').value.trim();
        if (name.length < 2 || text.length < 5) return;
        render({ name, rating, text, avatar: 'assets/img/avatar-default.svg' });
        testimonialForm.reset();
      })
    }
  }
  // services horizontal scroller controls
  document.querySelectorAll('.services-wrap').forEach(wrap => {
    if (wrap.dataset.scrollerInit) return; // prevent double init
    const scroller = wrap.querySelector('.services-scroller');
    const leftBtn = wrap.querySelector('.scroll-left');
    const rightBtn = wrap.querySelector('.scroll-right');
    if (!scroller || !leftBtn || !rightBtn) return;
    const update = () => {
      const atStart = scroller.scrollLeft <= 5;
      const atEnd = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 5;
      leftBtn.disabled = atStart;
      rightBtn.disabled = atEnd;
    };
    leftBtn.addEventListener('click', () => {
      scroller.scrollBy({ left: -Math.max(280, Math.round(scroller.clientWidth * 0.9)), behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', () => {
      scroller.scrollBy({ left: Math.max(280, Math.round(scroller.clientWidth * 0.9)), behavior: 'smooth' });
    });
    scroller.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    wrap.dataset.scrollerInit = '1';
  });
  // fallback for missing images (services & hero)
  const ph = (label) => {
    const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'><defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='#F9C5D1'/><stop offset='1' stop-color='#FADADD'/></linearGradient></defs><rect width='800' height='450' fill='url(#g)'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#333' font-family='Poppins, Arial, sans-serif' font-size='22'>${label}</text></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  };
  document.querySelectorAll('img.service-photo, img.img-hero').forEach(img => {
    img.addEventListener('error', () => {
      const label = img.getAttribute('alt') || 'CleanHome';
      img.src = ph(label);
    }, { once: true });
  });
  // FAQ accordion
  document.querySelectorAll('.faq .faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    const ans = item.querySelector('.faq-answer');
    if (!btn || !ans) return;
    btn.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  function display(el, type, msg) {
    el.className = type === 'success' ? 'success' : 'error';
    el.textContent = msg;
    el.style.display = 'block';
  }
  initReveal();

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const icon = themeToggle ? themeToggle.querySelector('use') : null;

  const setTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (icon) {
      icon.setAttribute('href', theme === 'dark' ? '#i-sun' : '#i-moon');
    }
  };

  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }



  // Parallax Hero
  const hero = document.querySelector('.hero-inner');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < 600) {
        hero.style.transform = `translateY(${scrolled * 0.1}px)`;
      }
    });
  }

  // Service Details Modal
  const serviceModal = document.getElementById('serviceModal');
  if (serviceModal) {
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalDesc = document.getElementById('modalDesc');
    const closeModal = serviceModal.querySelector('.close-modal');
    const modalCta = serviceModal.querySelector('.modal-cta');

    // Open modal
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('click', function () {
        // Get data
        const img = this.querySelector('.service-photo').src;
        const title = this.querySelector('h3').textContent;
        const price = this.querySelector('.price').textContent;
        const details = this.getAttribute('data-details') || 'Détails à venir...';

        // Populate modal
        modalImg.src = img;
        modalImg.alt = title;
        modalTitle.textContent = title;
        modalPrice.textContent = price;
        modalDesc.textContent = details;

        // Show modal
        serviceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close modal actions
    const closeServiceModal = () => {
      serviceModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    closeModal.addEventListener('click', closeServiceModal);

    serviceModal.addEventListener('click', (e) => {
      if (e.target === serviceModal) closeServiceModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
        closeServiceModal();
      }
    });

    modalCta.addEventListener('click', closeServiceModal);
  }

  // Services Data (Shared)
  const services = [
    { id: 'service-deep', label: 'Grand nettoyage' },
    { id: 'service-office', label: 'Entreprises' },
    { id: 'service-windows', label: 'Nettoyage vitres' },
    { id: 'service-ironing', label: 'Repassage' },
    { id: 'service-disinfection', label: 'Désinfection' },
    { id: 'service-carpet', label: 'Shampooing moquette' },
    { id: 'service-kitchen', label: 'Dégraissage cuisine' },
    { id: 'service-bathroom', label: 'Nettoyage salle de bain' },
    { id: 'service-standard', label: 'Ménage standard' }
  ];

  // Random Dropdown Content
  const dropdownContent = document.querySelector('.dropdown-content');
  if (dropdownContent) {
    const getRandomServices = (count) => {
      // Create a copy to sort
      const shuffled = [...services].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const updateDropdown = () => {
      const randomServices = getRandomServices(4);
      dropdownContent.innerHTML = randomServices.map(service =>
        `<a href="services.html?service=${service.id}">${service.label}</a>`
      ).join('');
    };

    updateDropdown();
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
      dropdown.addEventListener('mouseenter', updateDropdown);
    }
  }

  // Search Functionality
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = document.getElementById('searchInput').value.toLowerCase().trim();
      if (!query) return;

      // Simple fuzzy match: check if label includes query
      const match = services.find(s => s.label.toLowerCase().includes(query));

      if (match) {
        window.location.href = `services.html?service=${match.id}`;
      } else {
        // Optional: Shake animation or better UI feedback
        const input = document.getElementById('searchInput');
        input.style.borderColor = 'red';
        setTimeout(() => input.style.borderColor = '', 1000);
        alert("Service non trouvé. Essayez 'vitres', 'ménage', 'bureau'...");
      }
    });
  }

  // Direct Popup from URL
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('service');
  if (serviceId) {
    const serviceCard = document.getElementById(serviceId);
    if (serviceCard) {
      // Scroll to service
      serviceCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Open modal (trigger click)
      setTimeout(() => {
        serviceCard.click();
      }, 500);
    }
  }

});
