import { defineStore } from 'pinia'
import { doc, setDoc, addDoc, deleteDoc, updateDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'

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
      if (!code || code.active) {
        return
      }
      code.active = true

      const docRef = doc(db, 'codes', id)
      await updateDoc(docRef, { active: true })
    },
    async deactivateCode(id) {
      const code = this.codes.find((code) => code.id === id)
      if (!code || !code.active) {
        return
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
    }
  }
})
