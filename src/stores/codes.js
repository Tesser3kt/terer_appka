import { defineStore } from 'pinia'

export const useCodesStore = defineStore('codes', {
  state: () => ({
    codes: [
      {
        id: 1,
        number: '44322123',
        active: false
      },
      {
        id: 2,
        number: '12312312',
        active: true
      },
      {
        id: 3,
        number: '12222312',
        active: true
      }
    ]
  }),
  actions: {
    activateCode(id) {
      const code = this.codes.find((code) => code.id === id)
      code.active = true
    },
    deactivateCode(id) {
      const code = this.codes.find((code) => code.id === id)
      code.active = false
    },
    removeCode(id) {
      this.codes = this.codes.filter((code) => code.id !== id)
    },
    printCode(id) {
      // TODO
    }
  }
})
