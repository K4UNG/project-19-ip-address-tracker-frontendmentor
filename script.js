var map = L.map('map', {
    zoomControl: false,
    attributionControl: false
})

const ip = document.getElementById('ip')
const place = document.getElementById('location')
const time = document.getElementById('time')
const isp = document.getElementById('isp')

function getIP(json) {

    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_DortepxJQnfqXCtWjP4TsUMbKnEtg&ipAddress=${json.ip}`)
    .then(res => res.json())
    .then(data => {
        if (data.code !== 422) {
            ip.textContent = data.ip
            place.textContent = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`
            time.textContent = data.location.timezone
            isp.textContent = data.isp

            const lat = data.location.lat
            const lng = data.location.lng
            var myIcon = L.icon({
                iconUrl: './images/icon-location.svg',
                iconSize: [30, 40],
                iconAnchor: [15, 50]
            });
            L.marker([lat, lng], {icon: myIcon}).addTo(map);
    
            map.setView([lat, lng], 13)
            const mapToken = 'pk.eyJ1Ijoia2d6aW5oZWluIiwiYSI6ImNsMTdmNjFiMDAwZ3IzanFzMHJlY29ucTYifQ.LJGs2NYK7GdFgZ_CMa6Yjw';
            L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapToken}`, {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'your.mapbox.access.token'
            }).addTo(map);
        }
    })
}

const form = document.querySelector('form')
form.onsubmit = () => {
    getIP({ ip: `${form.querySelector('input').value}`})
    return false
}