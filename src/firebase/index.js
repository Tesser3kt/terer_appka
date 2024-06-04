import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAvJsKk1m1f8VtXDpO-MCpjIVcU_vHJCKw',
  authDomain: 'terer-appka.firebaseapp.com',
  projectId: 'terer-appka',
  storageBucket: 'terer-appka.appspot.com',
  messagingSenderId: '12902881447',
  appId: '1:12902881447:web:a101a1748946e6a66ba382'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
