<script setup>
import { defineModel, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCodesStore } from '@/stores/codes'

const searchInput = defineModel('searchInput')
const genNumber = defineModel('genNumber')
// const printNumber = defineModel('printNumber')

const codesStore = useCodesStore()
const { codes } = storeToRefs(codesStore)
const filteredCodes = computed(() => {
  if (!searchInput.value) {
    return codes.value
  }
  return codes.value.filter((code) => code.number.startsWith(searchInput.value))
})

const onActivateClick = async (id) => {
  await codesStore.activateCode(id)
}
const onDeactivateClick = async (id) => {
  await codesStore.deactivateCode(id)
}
const onRemoveClick = async (id) => {
  await codesStore.removeCode(id)
}
const onGenerateClick = async () => {
  await codesStore.generateCodes(genNumber.value)
}

onMounted(async () => {
  await codesStore.fetchCodes()
})
</script>

<template>
  <main>
    <div class="content">
      <div class="container">
        <div class="row">
          <h1 class="text-center text-primary-emphasis">Kódy</h1>
        </div>
        <div class="row mt-3 justify-content-center gy-3">
          <div class="col-12 col-sm-10 col-md-6">
            <input
              v-model="searchInput"
              class="form-control"
              list="datalistOptions"
              id="codesDataList"
              placeholder="Zadejte kód"
            />
          </div>
          <div class="col-8 col-sm-6 col-md-4">
            <input
              class="form-control"
              v-model="genNumber"
              id="genNumber"
              type="number"
              placeholder="Počet kódů k vytvoření"
            />
          </div>
          <div class="col-4 col-sm-4 col-md-2">
            <button class="btn btn-primary" @click="onGenerateClick">Generovat</button>
          </div>
        </div>
        <!-- <div class="row mt-3 justify-content-center justify-content-md-end">
          <div class="col-8 col-sm-6 col-md-4">
            <input
              class="form-control"
              v-model="printNumber"
              id="printNumber"
              type="number"
              placeholder="Počet kódů k tisku"
            />
          </div>
          <div class="col-4 col-sm-4 col-md-2">
            <button class="btn btn-primary" @click="onGenerateClick">Tisknout</button>
          </div>
        </div> -->
        <datalist id="datalistOptions">
          <option v-for="code in codes" :key="code.id" :value="code.number">
            {{ code.number }}
          </option>
        </datalist>
      </div>
      <div class="container mt-5">
        <div class="row gy-3">
          <div
            v-for="code in filteredCodes"
            :key="code.id"
            class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
          >
            <div
              class="card-container pe-2 rounded"
              :class="code.active ? 'bg-primary' : 'bg-secondary'"
            >
              <div
                class="card border-2"
                :class="code.active ? 'border-primary' : 'border-secondary'"
              >
                <div class="card-header">
                  <p class="code-number mb-0 fw-semibold fs-5">{{ code.number }}</p>
                </div>
                <div class="card-body">
                  <button
                    v-if="!code.active"
                    type="button"
                    class="card-button btn btn-success rounded-circle"
                    @click="() => onActivateClick(code.id)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-check-lg"
                      viewBox="2 0 16 16"
                    >
                      <path
                        d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"
                      />
                    </svg>
                  </button>
                  <button
                    v-else
                    type="button"
                    class="card-button btn btn-warning rounded-circle"
                    @click="() => onDeactivateClick(code.id)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-x-lg"
                      viewBox="2 0 16 16"
                    >
                      <path
                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="card-button btn btn-danger ms-2 rounded-circle"
                    @click="() => onRemoveClick(code.id)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="2 0 16 16"
                    >
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                      />
                      <path
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                      />
                    </svg>
                  </button>
                  <a
                    :href="`/qr/show/${code.number}`"
                    class="card-button btn btn-primary ms-2 rounded-circle"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      class="bi bi-qr-code"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 2h2v2H2z" />
                      <path d="M6 0v6H0V0zM5 1H1v4h4zM4 12H2v2h2z" />
                      <path d="M6 10v6H0v-6zm-5 1v4h4v-4zm11-9h2v2h-2z" />
                      <path
                        d="M10 0v6h6V0zm5 1v4h-4V1zM8 1V0h1v2H8v2H7V1zm0 5V4h1v2zM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8zm0 0v1H2V8H1v1H0V7h3v1zm10 1h-1V7h1zm-1 0h-1v2h2v-1h-1zm-4 0h2v1h-1v1h-1zm2 3v-1h-1v1h-1v1H9v1h3v-2zm0 0h3v1h-2v1h-1zm-4-1v1h1v-2H7v1z"
                      />
                      <path d="M7 12h1v3h4v1H7zm9 2v2h-3v-1h2v-1z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
