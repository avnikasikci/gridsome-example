<template>
  <Layout :show-logo="false">
    <Sidebar :isHomePage="true" :routeParams="this.$route.params" />
<label>Sidebar uppp</label>
    <!-- Author intro -->
    <Author :show-title="true" />

    <!-- List posts -->
    <div class="posts">
      <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node"/>
    </div>

  </Layout>
</template>

<page-query>
query {
  posts: allPost(filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        date (format: "D. MMMM YYYY")
        timeToRead
        description
        cover_image (width: 770, height: 380, blur: 10)
        ...on Post {
        id
        title
        path
        }
        path
        tags {
          id
          title
          path
        }
      }
    }
  }
}
</page-query>

<script>
import Author from '~/components/Author.vue'
import PostCard from '~/components/PostCard.vue'
import Sidebar from "~/components/sidebar.vue"

export default {
  components: {
    Author,
    PostCard,
    Sidebar
  },
  metaInfo: {
    title: 'Home'
  }
}
</script>
