// 3D effects and animations for InstaScan

// Initialize Three.js scene for hero section
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 500;
  
  const posArray = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  // Materials
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: '#3b82f6',
    transparent: true,
    opacity: 0.8
  });
  
  // Mesh
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  // Camera position
  camera.position.z = 5;
  
  // Resize handling
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.x += 0.0003;
    particlesMesh.rotation.y += 0.0005;
    
    renderer.render(scene, camera);
  };
  
  animate();
}

// GSAP animations for scroll effects
function initScrollAnimations() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate feature cards on scroll
  gsap.utils.toArray('.card-3d').forEach((card, i) => {
    gsap.from(card, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom-=100',
        end: 'bottom center',
        toggleActions: 'play none none none'
      }
    });
  });
  
  // Animate chatbot promo section
  const chatbotPromo = document.querySelector('.chatbot-promo');
  if (chatbotPromo) {
    gsap.from(chatbotPromo.querySelector('img'), {
      scale: 0.8,
      rotation: -5,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: chatbotPromo,
        start: 'top bottom-=100',
        end: 'bottom center',
        toggleActions: 'play none none none'
      }
    });
    
    gsap.from(chatbotPromo.querySelector('h2'), {
      x: -50,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: chatbotPromo,
        start: 'top bottom-=100',
        end: 'bottom center',
        toggleActions: 'play none none none'
      }
    });
  }
}

// Initialize 3D effects for scanner model
function initScannerModel() {
  const scannerContainer = document.getElementById('scanner-model-container');
  if (!scannerContainer) return;
  
  // Add mouse move effect to create parallax
  scannerContainer.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = scannerContainer.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    const scannerImage = document.getElementById('scanner-image');
    if (scannerImage) {
      gsap.to(scannerImage, {
        rotationY: x * 10,
        rotationX: -y * 10,
        ease: 'power2.out',
        duration: 0.5
      });
    }
  });
  
  // Reset on mouse leave
  scannerContainer.addEventListener('mouseleave', () => {
    const scannerImage = document.getElementById('scanner-image');
    if (scannerImage) {
      gsap.to(scannerImage, {
        rotationY: 0,
        rotationX: 0,
        ease: 'power2.out',
        duration: 0.5
      });
    }
  });
}

// 3D Navigation Icons
function init3DNavIcons() {
  // Add 3D nav icons to the navigation
  const navLinks = document.querySelectorAll('nav a');
  
  // Define icons for navigation items
  const icons = {
    'Home': '<svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>',
    'Chatbot': '<svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/></svg>',
    'Food': '<svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/></svg>',
    'Medicine': '<svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm3-1a1 1 0 11-2 0 1 1 0 012 0zm2 1a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/></svg>',
    'Cosmetics': '<svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/></svg>',
    'About': '<svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>',
    'Contact': '<svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>'
  };
  
  // Add icons and 3D effect to navigation links
  navLinks.forEach(link => {
    const text = link.textContent.trim();
    
    // Find matching icon or use default
    let iconHtml = '';
    Object.keys(icons).forEach(key => {
      if (text.includes(key)) {
        iconHtml = icons[key];
      }
    });
    
    // Only add icon if one was found
    if (iconHtml) {
      // Keep the original text
      const originalText = link.textContent;
      
      // Create a wrapper for 3D effect
      link.innerHTML = `
        <span class="nav-icon-3d flex items-center">
          ${iconHtml}
          <span>${originalText}</span>
        </span>
      `;
      
      // Add 3D hover effect
      link.classList.add('nav-link-3d');
      
      // Add mouse movement effect
      link.addEventListener('mousemove', (e) => {
        const linkRect = link.getBoundingClientRect();
        const x = (e.clientX - linkRect.left) / linkRect.width - 0.5;
        const y = (e.clientY - linkRect.top) / linkRect.height - 0.5;
        
        const icon3d = link.querySelector('.nav-icon-3d');
        if (icon3d) {
          icon3d.style.transform = `perspective(500px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) translateZ(5px)`;
        }
      });
      
      // Reset on mouse leave
      link.addEventListener('mouseleave', () => {
        const icon3d = link.querySelector('.nav-icon-3d');
        if (icon3d) {
          icon3d.style.transform = 'perspective(500px) rotateY(0) rotateX(0) translateZ(0)';
        }
      });
    }
  });
  
  // Add CSS for the 3D nav effects
  const style = document.createElement('style');
  style.textContent = `
    .nav-link-3d {
      transition: all 0.3s ease;
      transform-style: preserve-3d;
    }
    
    .nav-icon-3d {
      display: inline-flex;
      align-items: center;
      transition: all 0.3s ease;
      transform-style: preserve-3d;
    }
    
    .nav-link-3d:hover {
      transform: scale(1.1);
    }
    
    .nav-icon-3d svg {
      transform-style: preserve-3d;
      transition: all 0.3s ease;
    }
    
    .nav-link-3d:hover svg {
      transform: translateZ(10px) rotate(10deg);
    }
  `;
  document.head.appendChild(style);
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Three.js background
  initHeroCanvas();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize scanner model interactivity
  initScannerModel();
  
  // Initialize 3D navigation icons
  init3DNavIcons();
  
  // Add pulse effect to main CTA
  const mainCTA = document.querySelector('button[type="submit"]');
  if (mainCTA) {
    mainCTA.classList.add('pulse-effect');
  }
}); 