<script setup>
import { useRoute } from 'vue-router'
import VueQrcode from 'vue-qrcode'

const route = useRoute()
const number = route.params.number
const url = `http://localhost:5173/qr/activate/${number}`
</script>
<template>
  <main>
    <div class="qr-wrapper min-vh-100 d-flex justify-content-center align-items-center">
      <vue-qrcode :value="url" :scale="8" :quality="1" />
    </div>
  </main>
</template>
