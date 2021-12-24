<template>
  <v-menu bottom left :close-on-content-click="false" min-width="30vw">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mr-12" dark icon v-bind="attrs" v-on="on">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
    <ais-instant-search :search-client="searchClient" index-name="dev_perfume">
      <ais-search-box />
      <v-list light>
        <ais-state-results>
          <template slot-scope="{ state: { query }, results: { hits } }">
            <v-subheader v-if="query.length > 0 && hits.length > 0"
              >Nước hoa</v-subheader
            >
            <ais-hits v-if="query.length > 0">
              <template slot="item" slot-scope="{ item }">
                <v-list-item
                  link
                  :to="{
                    name: 'perfumeDetail',
                    params: { perfumeSlug: item.sname }
                  }"
                  ><ais-highlight :hit="item" attribute="name"
                /></v-list-item>
              </template>
            </ais-hits>
          </template>
        </ais-state-results>
        <ais-index index-name="dev_brand">
          <ais-state-results>
            <template slot-scope="{ state: { query }, results: { hits } }">
              <v-subheader v-if="query.length > 0 && hits.length > 0"
                >Nhãn hiệu</v-subheader
              >
              <ais-hits v-if="query.length > 0">
                <template slot="item" slot-scope="{ item }">
                  <v-list-item link :to="item.link"
                    ><ais-highlight :hit="item" attribute="name"
                  /></v-list-item>
                </template>
              </ais-hits>
            </template>
          </ais-state-results>
        </ais-index>
      </v-list>
    </ais-instant-search>
  </v-menu>
</template>

<script>
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite-min.css";

export default {
  data() {
    return {
      searchClient: algoliasearch(
        "I3IQGEEYTD",
        "3ce512c1374df87a0fd85b729d443c5a"
      ),
      myQuery: ""
    };
  }
};
</script>

<style>
.ais-Hits-item {
  color: black;
}
.ais-Hits > ol {
  padding-left: 0 !important;
}

.ais-Hits > ol > li {
  padding: 0 !important;
  box-shadow: none !important;
}
</style>
