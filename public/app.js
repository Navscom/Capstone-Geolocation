let map = L.map('map').setView([14.586, 121.061], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let jwtToken = null;

// 📝 Register
async function register() {
  const res = await fetch('register.php', {
    method: 'POST',
    body: new URLSearchParams({
      username: document.getElementById('reg_username').value,
      password: document.getElementById('reg_password').value
    })
  });
  const data = await res.json();
  alert(data.success ? "Registered successfully!" : "Error: " + data.error);
}

// 🔑 Login
async function login() {
  const res = await fetch('login.php', {
    method: 'POST',
    body: new URLSearchParams({
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    })
  });
  const data = await res.json();
  if (data.token) {
    jwtToken = data.token;
    alert("Login successful!");
  } else {
    alert("Login failed");
  }
}

// 📍 Enable marker placement
function enableMarker() {
  if (!jwtToken) {
    alert("You must log in first!");
    return;
  }
  map.on('click', async function(e) {
    const captchaToken = grecaptcha.getResponse();
    if (!captchaToken) {
      alert("Please complete captcha!");
      return;
    }

    const markerData = {
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
      marker_type: "danger",
      captcha_token: captchaToken
    };

    const res = await fetch('add_marker.php', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + jwtToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(markerData)
    });

    const data = await res.json();
    if (data.success) {
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
        .bindPopup("Danger sign placed!");
    } else {
      alert("Error: " + data.error);
    }
  });
}

// 🌍 Load existing markers
async function loadMarkers() {
  const res = await fetch('get_markers.php');
  const markers = await res.json();
  markers.forEach(m => {
    L.marker([m.latitude, m.longitude]).addTo(map)
      .bindPopup(m.marker_type.toUpperCase());
  });
}

// 🌙 Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const btn = document.getElementById('darkModeToggle');
  if (document.body.classList.contains('dark-mode')) {
    btn.textContent = "☀️ Light Mode";
  } else {
    btn.textContent = "🌙 Dark Mode";
  }
});

loadMarkers();