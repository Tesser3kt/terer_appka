import { defineStore } from 'pinia'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import CryptoJS from 'crypto-js'

export const useUsersStore = defineStore('users', {
  state: () => ({
    currentUser: null
  }),
  getters: {
    isLoggedIn: (state) => !!state.currentUser
  },
  actions: {
    async getUserFromCookie() {
      const user_id = $cookies.get('user_id')

      if (!user_id) {
        return
      }

      const docRef = doc(db, 'users', user_id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        this.currentUser = { id: docSnap.id, ...docSnap.data() }
      }
    },
    async login(username, password) {
      const passwordHash = CryptoJS.SHA256(password).toString()
      const usersRef = collection(db, 'users')
      const usersSnapshot = await getDocs(usersRef)

      usersSnapshot.forEach((doc) => {
        const user = doc.data()
        if (user.username === username && user.password === passwordHash) {
          this.currentUser = { id: doc.id, ...user }
          $cookies.set('user_id', doc.id)
        }
      })

      if (!this.currentUser) {
        $cookies.remove('user_id')
      }
    }
  }
})
