<script setup>
import { ref, defineModel } from 'vue'
import { useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users'

const userName = defineModel('userName')
const password = defineModel('password')
const usersStore = useUsersStore()
const router = useRouter()
const showErrorMessage = ref(false)
const errorMessage = ref('')

const handleSubmit = async (e) => {
  e.preventDefault()
  await usersStore.login(userName.value, password.value)
  if (usersStore.isLoggedIn) {
    router.push({ name: 'home' })
  } else {
    showErrorMessage.value = true
    errorMessage.value = 'Přihlašovací údaje nejsou správné.'
  }
}
</script>
<template>
  <main>
    <div class="login-form-wrapper min-vh-100 d-flex justify-content-center align-items-center">
      <div class="container">
        <div class="row gy-3">
          <div class="col-12">
            <h1 class="text-primary-emphasis text-center">Login</h1>
          </div>
          <div class="col-12">
            <div class="form-wrapper">
              <form>
                <div class="mb-3">
                  <label for="userName" class="form-label">Přihlašovací jméno</label>
                  <input v-model="userName" type="text" class="form-control" id="userName" />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Heslo</label>
                  <input v-model="password" type="password" class="form-control" id="password" />
                </div>
                <button @click="handleSubmit" type="submit" class="btn btn-primary">
                  Přihlásit
                </button>
              </form>
              <div v-show="showErrorMessage" class="alert alert-danger mt-3" role="alert">
                <span>{{ errorMessage }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
