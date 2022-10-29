<template>
    <div class="sidebar">

      <div class="sidebar__inner">
        <div class="sidebar__author" :data-kontent-item-id="$static.allContributor.edges[0].node.id">
          <div>
            <a href="/">
              <img
                :src="$static.allContributor.edges[0].node.avatar"
                class="sidebar__author-photo"
                width="75"
                height="75"
                :alt="$static.allContributor.edges[0].node.title"
                data-kontent-element-codename="avatar_image"
              />
            </a>
            <h1 v-if="isHomePage" class="sidebar__author-title" data-kontent-element-codename="name">
                <a class="sidebar__author-title-link" to="/">
                  {{$static.allContributor.edges[0].node.title}}
                </a>
            </h1>
            <h2 v-else class="sidebar__author-title" data-kontent-element-codename="name">
                <a class="sidebar__author-title-link" to="/">
                  {{$static.allContributor.edges[0].node.title}}
                </a>
            </h2>
            <p class="sidebar__author-subtitle" data-kontent-element-codename="bio">
                {{$static.allContributor.edges[0].node.bio}}
            </p>
          </div>
        </div>
        <div>
          <!-- <Menu />          <Links /> -->
          <!-- <p class="sidebar__copyright">{{$static.allSiteMetadata.edges[0].node.copyright}}</p> -->
        </div>
      </div>
    </div>
</template>

<script>
// import Menu from "~/components/menu.vue"
// import Links from "~/components/links.vue"

export default {
    
    props: {
        isHomePage: Boolean,
        routeParams: Object
    }
}
</script>

<static-query>
query {
    allContributor {
    edges {
      node {
        id
        title           
      }
    }
  }
}
</static-query>