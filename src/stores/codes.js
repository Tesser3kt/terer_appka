import { defineStore } from 'pinia'
import { doc, addDoc, deleteDoc, updateDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import { saveAs, encodeBase64 } from '@progress/kendo-file-saver'

export const useCodesStore = defineStore('codes', {
  state: () => ({
    codes: []
  }),
  actions: {
    async fetchCodes() {
      const codesRef = collection(db, 'codes')
      const codesSnapshot = await getDocs(codesRef)
      this.codes = codesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    },
    async generateCodes(amount) {
      const codes = Array.from({ length: amount }, () => ({
        number: Math.random().toString().substring(2, 10),
        active: false
      }))

      const docRefs = await Promise.all(codes.map((code) => addDoc(collection(db, 'codes'), code)))
      this.codes.push(...docRefs.map((docRef, index) => ({ id: docRef.id, ...codes[index] })))
    },
    async activateCode(id) {
      const code = this.codes.find((code) => code.id === id)
      if (!code) {
        throw new Error('Kód nebyl nalezen.')
      }
      if (code.active) {
        throw new Error('Kód je již aktivní.')
      }
      code.active = true

      const docRef = doc(db, 'codes', id)
      await updateDoc(docRef, { active: true })
    },
    async deactivateCode(id) {
      const code = this.codes.find((code) => code.id === id)
      if (!code) {
        throw new Error('Kód nebyl nalezen.')
      }
      if (!code.active) {
        throw new Error('Kód ještě není aktivní.')
      }
      code.active = false

      const docRef = doc(db, 'codes', id)
      await updateDoc(docRef, { active: false })
    },
    async removeCode(id) {
      const code = this.codes.find((code) => code.id === id)
      if (!code) {
        return
      }
      this.codes = this.codes.filter((code) => code.id !== id)

      const docRef = doc(db, 'codes', id)
      await deleteDoc(docRef)
    },
    async activateCodeByNumber(number) {
      const codesRef = collection(db, 'codes')
      const querySnapshot = await getDocs(codesRef)
      querySnapshot.forEach(async (document) => {
        if (document.data().number === number) {
          const docRef = doc(db, 'codes', document.id)
          await updateDoc(docRef, { active: true })
        }
      })
    },
    async deactivateCodeByNumber(number) {
      const codesRef = collection(db, 'codes')
      const querySnapshot = await getDocs(codesRef)
      querySnapshot.forEach(async (document) => {
        if (document.data().number === number) {
          const docRef = doc(db, 'codes', document.id)
          await updateDoc(docRef, { active: false })
        }
      })
    },
    saveCodesToFile() {
      const codes = this.codes.map((code) => code.number)
      const codesString = codes.join('\n')
      const blob = new Blob([codesString], { type: 'text/plain' })
      saveAs(blob, 'codes.txt')
    }
  }
})
