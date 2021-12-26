<template>
  <div class="d-flex flex-column align-items-center mt-5">
    <BlogPost :post="post" v-for="(post, index) in blogPost" :key="index" class="mb-4" />
  </div>
</template>

<script>
import BlogPost from '@/components/BlogPost.vue'

export default {
  name: 'Blog',
  components: {
    BlogPost
  },
  computed: {
    blogPost() {
      return this.$store.state.blogPost
    }
  }
}
</script>