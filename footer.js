document.addEventListener('DOMContentLoaded', function () {
    const footer = document.getElementById('site-footer');
    if (!footer) return;
  
    footer.innerHTML = `
      <p>Social Media Links</p>
      <div class="newsletter">
        <input type="email" id="subscribe-email" placeholder="Your email" required />
        <button id="subscribe-btn">Join</button>
        <div id="newsletter-status" style="margin-top: 10px; font-size: 14px;"></div>
      </div>
      <div class="footer-links">
        <a href="/index.html">Home</a> | <a href="/gallery.html">Shop</a> |
        <a href="/about.html">About Us</a> |
        <a href="/missionlog.html">Missions</a> |

      </div>
    `;
  
    // Newsletter subscription
    const SHEET_DB_URL = 'https://sheetdb.io/api/v1/sf0j8tkm2crwm';
    const subscribeBtn = document.getElementById('subscribe-btn');
    const emailInput = document.getElementById('subscribe-email');
    const statusDiv = document.getElementById('newsletter-status');
  
    function showStatus(message, isError = false) {
      statusDiv.textContent = message;
      statusDiv.style.color = isError ? '#ff6b6b' : '#51cf66';
      setTimeout(() => {
        statusDiv.textContent = '';
      }, 4000);
    }
  
    subscribeBtn.addEventListener('click', async function () {
      const email = emailInput.value.trim();
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showStatus('Please enter a valid email address.', true);
        return;
      }
  
      subscribeBtn.disabled = true;
      subscribeBtn.textContent = 'Joining...';
  
      try {
        const response = await fetch(SHEET_DB_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: [{
              email: email,
              timestamp: new Date().toISOString()
            }]
          })
        });
  
        if (response.ok) {
          showStatus(`Thank you for subscribing with ${email}!`);
          emailInput.value = '';
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error:', error);
        showStatus('Something went wrong. Please try again.', true);
      } finally {
        subscribeBtn.disabled = false;
        subscribeBtn.textContent = 'Join';
      }
    });
  
    emailInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        subscribeBtn.click();
      }
    });
  });