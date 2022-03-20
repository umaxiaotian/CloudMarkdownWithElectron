<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      mini-variant
      app
      :class="appBarColor"
      class="darken-4"
      permanent
      disable-route-watcher
    >
      <v-avatar
        class="d-block text-center mx-auto mt-4"
        color="grey darken-1"
        size="36"
      />
      <v-divider class="mx-3 my-5" />
      <v-avatar
        v-for="n in 6"
        :key="n"
        class="d-block text-center mx-auto mb-9"
        color="grey lighten-1"
        size="28"
      />
      <template #append>
        <div class="mb-5 d-flex justify-center align-center">
          <v-btn icon>
            <v-avatar :size="26">
              <img src="//www.gravatar.com/avatar/none?f=y&d=mm">
            </v-avatar>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <div style="display: flex; min-height: min-content">
        <div style="height: 100vh; overflow: auto">
          <v-navigation-drawer
            width="380px"
            :class="appBarColor"
            class="darken-3"
            permanent
          >
            <v-toolbar
              :class="appBarColor"
              class="darken-3"
              flat
              :extended="isSearching"
              style="position: sticky; top: 0; z-index: 1; margin-right: 1px"
            >
              <v-toolbar-title> 構文定義 </v-toolbar-title>
              <v-spacer />
              <v-btn icon @click="isSearching = !isSearching">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
              <template v-if="isSearching" #extension>
                <v-text-field
                  autofocus
                  style="margin-bottom: -25px"
                  class="mr-2"
                  prepend-inner-icon="mdi-magnify"
                  clearable
                  rounded
                  filled
                  solo
                  flat
                  dense
                  placeholder="構文検索"
                  @keydown.esc="isSearching = false"
                />
              </template>
            </v-toolbar>
            <v-list subheader two-line>
              <v-subheader>構文リスト</v-subheader>

              <v-list-item v-for="(issue, index) in issues" :key="index" link>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ issue.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ issue.description }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </div>
        <div id="main-content" style="height: 100vh; width: 100%; overflow: auto; ">
          <Editor />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>

import Editor from '@/components/Editor'
export default {
  components: {

    Editor
  },
   head() {
    return {
      title: 'MsdMD Code'
    }
  },
  data: () => ({
    drawer: true,
    appBarColor: 'grey',
    appBarTitle: 'Tasks',
    appBarIcon: 'mdi-lightbulb',
    isSearching: false,
    links: [
      { label: 'Inbox', icon: 'mdi-inbox', color: 'background' },
      {
        label: 'Planned',
        icon: 'mdi-clock-outline',
        color: 'background'
      }
    ],
    projects: [
      { label: 'Accounting', color: 'cyan', due_count: 1 },
      { label: 'Secret Game', color: 'green' },
      { label: 'Dashboard', color: 'blue', due_count: 1 }
    ],
    issues: [
      {
        title: 'テーブル',
        order: 1,
        description: '表機能を追加します。デフォルトでは4x4'
      },
      {
        title: '画像挿入',
        order: 2,
        description: '画像挿入タグを挿入します。'
      }
    ]
  }),
  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>
<style >
/* ::-webkit-scrollbar {
    display: none;
} */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
   background: linear-gradient(rgb(211, 211, 211),rgb(211, 211, 211));
}

::-webkit-scrollbar-thumb {
  background: #7c7c7c;
  border-radius:5px;
}

html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}

</style>
