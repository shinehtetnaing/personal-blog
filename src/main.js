import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBj0TQ9wCwDEkTzCmS0rCh8ZtsJtCWzf0M",
  authDomain: "personal-blog-ad7c7.firebaseapp.com",
  projectId: "personal-blog-ad7c7",
  storageBucket: "personal-blog-ad7c7.appspot.com",
  messagingSenderId: "989293154448",
  appId: "1:989293154448:web:a4da6a783c7aedca4d8815"
};

initializeApp(firebaseConfig)
const db = getFirestore()

const auth = getAuth();
onAuthStateChanged(auth, () => {
  createApp(App).use(router).use(store).mount('#app')
})
