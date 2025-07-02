// cookie.js

document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY    = 'clean_design_cookie_consent';
  const banner         = document.getElementById('cookie-banner');
  const acceptBtn      = document.getElementById('cookie-accept');
  const declineBtn     = document.getElementById('cookie-decline');
  const closeBtn       = document.getElementById('cookie-close');

  // Hide by default
  banner.style.display = 'none';

  // If they haven't made a choice yet, show the banner
  if (!localStorage.getItem(STORAGE_KEY)) {
    banner.style.display = 'flex';
  }

  // Helper to hide
  function hideBanner() {
    banner.style.display = 'none';
  }

  // Accept → store “accepted” and hide
  acceptBtn.addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    hideBanner();
  });

  // Decline → store “declined” and hide
  declineBtn.addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    hideBanner();
  });

  // Close icon just hides (does not store)
  closeBtn.addEventListener('click', hideBanner);
});
