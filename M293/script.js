// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  // Get the dark mode toggle button
  const darkModeToggle = document.getElementById('darkModeToggle');
  
  // Check if user previously enabled dark mode
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Apply dark mode if it was previously enabled
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // Toggle dark mode when button is clicked
  darkModeToggle.addEventListener('click', () => {
    // Toggle dark mode class on body
    document.body.classList.toggle('dark-mode');
    
    // Update button icon
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDark ? 
      '<i class="fas fa-sun"></i>' : 
      '<i class="fas fa-moon"></i>';
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDark);
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get the target section
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      // Scroll smoothly to target
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Add a subtle animation to album cards when they come into view
  const albumCards = document.querySelectorAll('.album-card');
  
  // Simple animation when scrolling
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        // Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Set initial state and observe all album cards
  albumCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.7s ease';
    observer.observe(card);
  });
});
