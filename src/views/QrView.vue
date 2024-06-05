<script setup>
import { ref } from 'vue'
import { useCodesStore } from '@/stores/codes'
import { useRoute, useRouter } from 'vue-router'

const message = ref('')
const error = ref(false)

const route = useRoute()
const router = useRouter()
const codeNumber = route.params.number

const codesStore = useCodesStore()

async function activateCode() {
  const code = await codesStore.getCodeByNumber(codeNumber)
  try {
    await codesStore.activateCode(code.id)
    message.value = 'Kód byl aktivován.'
    error.value = false
  } catch (error) {
    message.value = error.message
    error.value = true
  }
}
async function deactivateCode() {
  const code = await codesStore.getCodeByNumber(codeNumber)
  try {
    await codesStore.deactivateCode(code.id)
    message.value = 'Kód byl deaktivován.'
    error.value = false
  } catch (error) {
    message.value = error.message
    error.value = true
  }
}
</script>
<template>
  <main>
    <div class="qr-wrapper min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 class="text-primary-emphasis">Kód {{ codeNumber }}</h1>
      <div class="container mt-3">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-8 col-md-6 justify-content-center">
            <button @click="activateCode" class="btn btn-success">Aktivovat</button>
            <button @click="deactivateCode" class="btn btn-warning">Deaktivovat</button>
          </div>
        </div>
      </div>
      <div v-if="message">
        <div v-if="error" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
        <div v-else class="alert alert-success" role="alert">
          {{ message }}
        </div>
      </div>
      <button @click="router.push({ name: 'home' })" class="btn btn-primary mt-3">Zpět</button>
    </div>
  </main>
</template>
