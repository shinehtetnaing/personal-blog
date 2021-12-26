<template>
  <div class="blog d-flex align-items-center bg-light rounded-3">
    <div class="blog-img">
      <img :src="post.blogPhoto" alt="blog-img">
    </div>
    <div class="blog-text">
      <span class="date mb-2">{{ moment(post.blogDate).format('MM/DD/YYYY hh:mm') }}</span>
      <h1 class="blog-title mb-3">{{ post.blogTitle }}</h1>
      <p class="blog-body mb-3">
        {{ post.blogBody }}
      </p>
      <span class="upload">Uploaded By - <span hidden>{{ getBlogOwner(post.profileId) }}</span>
        <h4 class="uploader">{{ uploader }}</h4>
      </span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { getDocs, collection, getFirestore, query } from "firebase/firestore"

export default {
  name: 'BlogPost',
  props: ['post'],
  data() {
    return {
      profileId: '',
      uploader: ''
    }
  },
  methods: {
    moment,
    async getBlogOwner(profileId) {
      const db = getFirestore()
      const users = query(collection(db, "users"))
      const querySnapshot = await getDocs(users)
      querySnapshot.forEach((doc) => {
        if (profileId === doc.id) {
          this.uploader = doc.data().firstName +' '+ doc.data().lastName
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .blog {
    width: 800px;
    padding: 30px;

    box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.25);
    -webkit-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.25);
    -o-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.25);
    -ms-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.25);

    .blog-img {
      width: 300px;
      height: auto;
      margin-right: 40px;

      img {
        width: 300px;
        height: 100%;
        object-fit: contain;
      }
    }

    .blog-text {

      .blog-title {
        font-size: 22px;
        font-weight: bold;
      }

      .upload {
        .uploader {
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
</style>
