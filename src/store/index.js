import { createStore } from 'vuex'
import { getAuth } from "firebase/auth"
import { doc, getDoc, getDocs, collection, getFirestore, query, where, orderBy } from "firebase/firestore"

const store = createStore({
  state: {
    user: null,
    profileId: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileInitials: null,
    blogTitle: "",
    blogBody: "",
    blogPhoto: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPost: [],
    postLoad: null
  },
  mutations: {
    updateUser(state, payload) {
      state.user = payload
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id
      state.profileEmail = doc.data().email
      state.profileFirstName = doc.data().firstName
      state.profileLastName = doc.data().lastName
    },
    profileInitials(state) {
      state.profileInitials = state.profileFirstName.charAt(0) + state.profileLastName.charAt(0)
    },
    uploadBlogTitle(state, payload) {
      state.blogTitle = payload
    },
    uploadBlogBody(state, payload) {
      state.blogBody = payload
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload
    }
  },
  actions: {
    async getCurrentUser({ commit }) {
      const auth = getAuth()
      const user = auth.currentUser
      const db = getFirestore()
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)
      commit('setProfileInfo', docSnap)
      commit('profileInitials')
      console.log(docSnap.data())
    },
    async getPost({ state }) {
      const db = getFirestore()
      const result = query(collection(db, "blogs"), orderBy("date", "desc"))
      const querySnapshot = await getDocs(result)
      querySnapshot.forEach((doc) => {
        if (!state.blogPost.some(post => post.blogId === doc.id)) {
          const data = {
            blogId: doc.data().blogId,
            blogTitle: doc.data().blogTitle,
            blogBody: doc.data().blogBody,
            blogPhoto: doc.data().blogPhoto,
            blogDate: doc.data().date,
            profileId: doc.data().profileId
          }
          state.blogPost.push(data)
        }
      })
      this.postLoad = true
    }
  }
})

export default store