<template>
  <div class="blog d-flex justify-content-center align-items-center my-5">
    <Loading v-show="loading" />
    <div class="blog-container bg-light rounded-3">
      <h1 class="blog-title text-center mb-5">Create Your Blog</h1>
      <div class="error mb-3" v-if="error">{{ errorMsg }}</div>
      <div class="row d-flex align-items-center mb-4">
        <div class="col-4">
          <label class="blog-label" for="title">Title:</label>
        </div>
        <div class="col-8">
          <input type="text" class="form-control form-control-md" id="title" v-model="blogTitle">
        </div>
      </div>
      <div class="row d-flex align-items-center mb-4">
        <div class="col-4">
          <label class="blog-label" for="image">Image:</label>
        </div>
        <div class="col-8">
          <input type="file" id="image" ref="image" @change="fileChange" accept=".png, .jpg, .jpeg, .webp">
          <img :src="this.blogImage" alt="" class="mt-3" width="300" height="200" v-show="this.$store.state.blogPhotoFileURL">
        </div>
      </div>
      <div class="row d-flex align-items-center mb-5">
        <div class="col-4">
          <label class="blog-label" for="body">Body:</label>
        </div>
        <div class="col-8">
          <textarea class="form-control" id="body" cols="30" rows="10" v-model="blogBody"></textarea>
        </div>
      </div>
      <div class="row d-flex align-items-center">
        <div class="col-4">
        </div>
        <div class="col-8">
          <button class="btn btn-primary btn-md create" @click="upload">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection, getFirestore } from "firebase/firestore";

export default {
  name: 'CreateBlog',
  components: {
    Loading
  },
  data() {
    return {
      file: null,
      loading: null,
      error: false,
      errorMsg: ""
    }
  },
  methods: {
    fileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length)
        return
      this.file = this.$refs.image.files[0]
      const fileName = this.file.name
      console.log(fileName)
      this.$store.commit('fileNameChange', fileName)
      this.$store.commit('createFileURL', URL.createObjectURL(this.file))
    },
    upload() {
      if (this.blogTitle !== "" && this.blogBody !== "") {
        if (this.file) {
          this.loading = true
          const storage = getStorage()
          const storageRef = ref(storage, `Images/BlogImages/${this.$store.state.blogPhotoName}`)
          const uploadTask = uploadBytesResumable(storageRef, this.file)
          uploadTask.on('state_changed', 
            (snapshot) => {
              console.log('Uploaded a blob or file!', snapshot)
            }, 
            (error) => {
              console.log(error);
            }, 
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log('File available at', url)
                const timestamp = Date.now()
                const db = getFirestore()
                const blogRef = doc(collection(db, "blogs"))
                setDoc(doc(db, "blogs", blogRef.id), {
                  blogId: blogRef.id,
                  blogTitle: this.blogTitle,
                  blogBody: this.blogBody,
                  blogPhoto: url,
                  blogPhotoName: this.file.name,
                  profileId: this.profileId,
                  date: timestamp
                })
                this.$store.dispatch('getPost')
                this.loading = false
                this.$router.push({ name: 'Blog' })
                return
              })
            }
          )
        }
        this.error = true
        this.errorMsg = "Please upload blog photo!"
        setTimeout(() => {
          this.error = false
        }, 5000)
        return
      }
      this.error = true
      this.errorMsg = "Please fill out the fields!"
      setTimeout(() => {
        this.error = false
      }, 5000)
      return
    }
  },
  computed: {
    profileId() {
      return this.$store.state.profileId
    },
    blogImage() {
      return this.$store.state.blogPhotoFileURL
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle
      },
      set(payload) {
        this.$store.commit('uploadBlogTitle', payload)
      }
    },
    blogBody: {
      get() {
        return this.$store.state.blogBody
      },
      set(payload) {
        this.$store.commit('uploadBlogBody', payload)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.blog {
  .blog-container {
    width: 700px;
    padding: 50px;

    box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -o-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -ms-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
  }

  .error {
    color: red;
  }

  .blog-label {
    font-size: 18px;
    font-weight: bold;
  }

  .create {
    text-transform: uppercase;

    &:hover {
      background-color: #333 !important;
    }
  }
}
</style>