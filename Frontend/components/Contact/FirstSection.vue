<template>
    <div class="bg-cream">
      <UContainer
        class="py-8 flex flex-col md:flex-row justify-between gap-8 md:items-center items-start"
      >
        <div class="flex justify-center w-full md:w-1/2">
          <client-only>
            <div ref="mapContainer" style="height: 400px; width: 100%; z-index: 0;"/>
          </client-only>
        </div>
        <div class="md:w-1/2">
          <h2 class="lg:text-4xl md:text-3xl text-xl text-primary mb-6 cursor-default">
            Find Us Here
          </h2>
          <p class="text-sm md:text-lg lg:text-xl text-primary cursor-default">
            You can find us at 12 Nile Street, Zamalek, Cairo, in the heart of the <br>
            city. Whether you're visiting for a casual meal or a special <br>
            occasion, our doors are always open to welcome you. Come and experience great <br>
            food, warm hospitality, and a beautiful dining atmosphere.
          </p>
        </div>
      </UContainer>
    </div>
  </template>
  
  <script setup>
  
  const mapContainer = ref(null)
  const center = [30.0626, 31.2197] // Zamalek, Cairo coordinates
  
  onMounted(() => {
    import('leaflet').then((L) => {
      import('leaflet/dist/leaflet.css')
      
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      })
  
      const map = L.map(mapContainer.value).setView(center, 16)
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)
  
      L.marker(center).addTo(map)
        .bindPopup('Our Restaurant')
        .openPopup()
    })
  })
  </script>