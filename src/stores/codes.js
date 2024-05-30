import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCodesStore = defineStore('codes', () => {
  const codes = ref([
    { id: 1, number: 44124782, active: true },
    { id: 2, number: 47782114, active: true },
    { id: 3, number: 47821477, active: false }
  ])
  async function fetchCodes() {}
})
