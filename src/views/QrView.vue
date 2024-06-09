<script setup>
import { ref, onMounted } from 'vue'
import { useCodesStore } from '@/stores/codes'
import { useRoute, useRouter } from 'vue-router'
import { doc, addDoc, deleteDoc, updateDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'

const message = ref('')
const error = ref(false)
const code = ref(null)

const route = useRoute()
const router = useRouter()
const codeNumber = route.params.number

const getCodeByNumber = async (number) => {
  const querySnapshot = await getDocs(collection(db, 'codes'))
  querySnapshot.forEach((doc) => {
    if (doc.data().number === number) {
      code.value = {
        id: doc.id,
        number: doc.data().number,
        active: doc.data().active
      }
    }
  })
}

const activateCode = async () => {
  try {
    await updateDoc(doc(db, 'codes', code.value.id), {
      active: true
    })
    if (code.value?.active) {
      message.value = 'Kód je již aktivní.'
      error.value = true
      return
    }
    message.value = 'Kód byl úspěšně aktivován.'
    error.value = false
    code.value.active = true
  } catch (e) {
    console.log(e)
    message.value = 'Něco se pokazilo. Zkuste to prosím znovu.'
    error.value = true
  }
}

const deactivateCode = async () => {
  try {
    await updateDoc(doc(db, 'codes', code?.value.id), {
      active: false
    })
    if (!code.value?.active) {
      message.value = 'Kód ještě není aktivní.'
      error.value = true
      return
    }
    message.value = 'Kód byl úspěšně deaktivován.'
    error.value = false
    code.value.active = false
  } catch (e) {
    message.value = 'Něco se pokazilo. Zkuste to prosím znovu.'
    error.value = true
  }
}

onMounted(async () => {
  await getCodeByNumber(codeNumber)
})
</script>
<template>
  <main>
    <div class="qr-wrapper min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div
        class="alert alert-light py-2 border"
        :class="code?.active ? 'border-success' : 'border-danger'"
      >
        <h1 class="text-primary-emphasis pt-2">{{ codeNumber }}</h1>
        <p v-if="code?.active" class="text-success fs-4 text-center mb-0">Aktivní</p>
        <p v-else class="text-danger fs-4 text-center mb-0">Neaktivní</p>
      </div>
      <div class="container mt-3">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-8 col-md-6 text-center">
            <button v-if="!code?.active" @click="activateCode" class="btn btn-success">
              Aktivovat
            </button>
            <button v-else @click="deactivateCode" class="btn btn-warning">Deaktivovat</button>
            <button @click="router.push({ name: 'home' })" class="btn btn-primary ms-3">
              Zpět
            </button>
          </div>
        </div>
      </div>
      <div v-if="message" class="container-xs mt-3">
        <div v-if="error" class="alert alert-danger m-0" role="alert">
          {{ message }}
        </div>
        <div v-else class="alert alert-success m-0" role="alert">
          {{ message }}
        </div>
      </div>
    </div>
  </main>
</template>
