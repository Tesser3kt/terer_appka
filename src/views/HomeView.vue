<script setup>
import { defineModel, computed } from 'vue'
import { useCodesStore } from '@/stores/codes'

const searchInput = defineModel('searchInput')
const codesStore = useCodesStore()
const codes = codesStore.codes
const filteredCodes = computed(() => {
  if (!searchInput.value) {
    return codes
  }
  return codes.filter((code) => code.number.startsWith(searchInput.value))
})
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
      <div class="container mt-4">
        <div class="row gy-3">
          <div
            v-for="code in filteredCodes"
            :key="code.id"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <div
              class="card-container pe-2 rounded"
              :class="code.active ? 'bg-success' : 'bg-warning'"
            >
              <div
                class="card border-end-0"
                :class="code.active ? 'border-success' : 'border-warning'"
              >
                <div class="card-body">
                  <p class="code-number mb-0 fw-semibold">{{ code.number }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
