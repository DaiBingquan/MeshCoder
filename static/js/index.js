// MeshCoder - 页面初始化
window.HELP_IMPROVE_VIDEOJS = false;

// Busuanzi visitor counter function
function initBusuanziCounter() {
  const visitorNumberElement = document.getElementById('visitorNumber');
  
  if (!visitorNumberElement) {
    return;
  }
  
  // Add loading animation
  visitorNumberElement.classList.add('loading');
  
  // Wait for busuanzi to load and set total number
  const checkInterval = setInterval(() => {
    const el = document.getElementById("busuanzi_value_site_uv");
    
    if (el && el.innerText && el.innerText.trim() !== '') {
      // Remove loading animation
      visitorNumberElement.classList.remove('loading');
      
      // Update the visitor number with animation (keeping the original logic but adding animation)
      animateNumberUpdate(visitorNumberElement, el.innerText.trim());
      
      clearInterval(checkInterval);
    }
  }, 200);
  
  // Fallback timeout after 10 seconds
  setTimeout(() => {
    if (visitorNumberElement.classList.contains('loading')) {
      visitorNumberElement.classList.remove('loading');
      visitorNumberElement.textContent = '1,000+';
    }
    clearInterval(checkInterval);
  }, 10000);
}

// Animate number update
function animateNumberUpdate(element, finalValue) {
  // Parse the number (remove commas if any)
  const target = parseInt(finalValue.replace(/,/g, '')) || 1000;
  const duration = 1500;
  const startTime = performance.now();
  
  const updateNumber = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(target * easeOut);
    
    element.textContent = current.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = target.toLocaleString();
    }
  };
  
  requestAnimationFrame(updateNumber);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Busuanzi visitor counter
  initBusuanziCounter();
});
