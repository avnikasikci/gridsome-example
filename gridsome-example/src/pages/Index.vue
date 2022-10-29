<template>
  <Layout :show-logo="false">
    <div class="layout-flex">
    <Sidebar :isHomePage="true" :routeParams="this.$route.params" />
    <!-- Author intro -->
    <!-- <Author :show-title="true" /> -->

    <!-- List posts -->
    <div class="posts">
      <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node" />
    </div>
    

    <!-- <div class="content">
      <div class="content__inner">
        <Article v-for="article in $page.allArticle.edges" v-bind:key="article.node.id" :article="article.node" />
      </div>
    </div> -->
    <!-- <div class="content">
      <div class="content__inner">
        <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node" />
      </div>
    </div> -->
  </div>
  </Layout>
</template>

<page-query>
query MyQuery {
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
  },
  allArticle(filter: { published: { eq: true }}) {
    edges {
      node{
        id,
        date,
        path,
        tags {
          id
          title
          path
        },
        cover_image (width: 770, height: 380, blur: 10),          
        description,
        title
      }
    }
  }

}

</page-query>

<script>
import Author from '~/components/Author.vue'
import PostCard from '~/components/PostCard.vue'
import Sidebar from "~/components/sidebar.vue"
import Article from "~/components/article.vue"

export default {
  components: {
    Author,
    PostCard,
    Sidebar, Article
  },
  metaInfo: {
    title: 'Home'
  }
}
</script>
