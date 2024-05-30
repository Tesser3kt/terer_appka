<script setup>
import { defineModel, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCodesStore } from '@/stores/codes'

const searchInput = defineModel('searchInput')
const codesStore = useCodesStore()
const { codes } = storeToRefs(codesStore)
const filteredCodes = computed(() => {
  if (!searchInput.value) {
    return codes.value
  }
  return codes.value.filter((code) => code.number.startsWith(searchInput.value))
})

const onActivateClick = (id) => {
  codesStore.activateCode(id)
}
const onDeactivateClick = (id) => {
  codesStore.deactivateCode(id)
}
const onRemoveClick = (id) => {
  codesStore.removeCode(id)
}
const onPrintClick = (id) => {
  codesStore.printCode(id)
}
</script>

<template>
  <main>
    <div class="content">
      <div class="container">
        <div class="row">
          <h1 class="text-center text-primary-emphasis">Kódy</h1>
        </div>
        <div class="row mt-3 justify-content-center">
          <div class="col-12 col-sm-8 col-md-6">
            <input
              v-model="searchInput"
              class="form-control"
              list="datalistOptions"
              id="codesDataList"
              placeholder="Zadejte kód"
            />
          </div>
        </div>
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
                  <button
                    type="button"
                    class="card-button btn btn-primary ms-2 rounded-circle"
                    @click="() => onPrintClick(code.id)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-printer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                      <path
                        d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
