const map = L.map('map', { 
    zoomControl: true, 
    attributionControl: false 
}).setView([14.5794, 121.0359], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);
map.zoomControl.setPosition('topleft');

// Hazard Example Data
const hazards = [
    { coords: [14.5794, 121.0359], type: "Crowd", color: "#ff4444", msg: "<strong>High Crowd Density</strong><br>Caution: Heavy foot traffic detected." },
    { coords: [14.5850, 121.0500], type: "Construction", color: "#ffbb33", msg: "<strong>Construction Zone</strong><br>Road work in progress. Use alternative routes." },
    { coords: [14.5700, 121.0400], type: "Wildlife", color: "#00c851", msg: "<strong>Wildlife Protection Area</strong><br>Please follow park guidelines." }
];

hazards.forEach(h => {
    let zone = L.circle(h.coords, {
        color: h.color,
        fillColor: h.color,
        fillOpacity: 0.35,
        weight: 2,
        radius: 350
    }).addTo(map);

    // Dynamic Hover Styling
    zone.on('mouseover', function (e) {
        this.setStyle({
            fillOpacity: 0.6,
            weight: 4,
            radius: 380 // Slight expansion effect
        });
        
        L.popup({ closeButton: false, offset: [0, -10] })
            .setLatLng(e.latlng)
            .setContent(h.msg)
            .openOn(map);
    });

    zone.on('mouseout', function (e) {
        this.setStyle({
            fillOpacity: 0.35,
            weight: 2,
            radius: 350
        });
        map.closePopup();
    });
});

// UI Logic
let isLoginMode = true;
const themeSwitch = document.getElementById('theme-switch');
const themeIcon = document.getElementById('theme-icon');

themeSwitch.onchange = () => {
    document.body.classList.toggle('dark-mode', themeSwitch.checked);
    themeIcon.innerHTML = themeSwitch.checked 
        ? '<i class="fas fa-moon"></i>' 
        : '<i class="fas fa-sun"></i>';
};

const modal = document.getElementById('loginModal');
document.getElementById('authBtn').onclick = () => { modal.style.display = 'flex'; };
function closeModal() { modal.style.display = 'none'; }

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById('modalTitle').innerText = isLoginMode ? "Login" : "Register";
    document.getElementById('submitAuth').innerText = isLoginMode ? "LOGIN" : "CREATE ACCOUNT";
    document.getElementById('confirmPass').style.display = isLoginMode ? "none" : "block";
}