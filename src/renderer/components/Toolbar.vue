<template>
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

      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          @click="editText(child.handle, child.mdtext)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  components: {},
  methods: {
    //左側に文字を追加するアクション
    editText(handle, mdtext) {
      console.log(handle);
      console.log(mdtext);
      var editorDefine = this.$store.state.editorDefineData;
      if (handle == "LeftAdd") {
        // console.log(editorDefine.scrollTop);
        var pos_start = editorDefine.selectionStart;
        // console.log(pos_start);
        var pos_end = editorDefine.selectionEnd;
        var val = editorDefine.value;
        var headLine = 0;
        for (let i = pos_start; i--; ) {
          var ranges = val.slice(i - 2, i);
          if (~ranges.indexOf("\n")) {
            headLine = i;
            break;
          }
        }
        //0出ない場合1つ進んでしまうため、ここで-1戻る。
        if (headLine != 0) {
          headLine--;
        }
        var beforeNode = val.slice(0, headLine);

        console.log(val.slice(headLine, pos_end));
        var afterNode = val.slice(headLine);

        var insertNode = mdtext + " ";

        // editorDefine.value = beforeNode + insertNode + afterNode;
        this.$store.commit("markdownText", beforeNode + insertNode + afterNode);
      }
    },
  },
  data: () => ({
    items: [
      {
        action: "mdi-ticket",
        active: true,
        items: [
          { title: "大見出し(h1)", handle: "LeftAdd", mdtext: "#" },
          { title: "大見出し(h2)", handle: "LeftAdd", mdtext: "##" },
          { title: "中見出し(h3)", handle: "LeftAdd", mdtext: "###" },
          { title: "中見出し(h4)", handle: "LeftAdd", mdtext: "####" },
          { title: "小見出し(h5)", handle: "LeftAdd", mdtext: "#####" },
          { title: "小見出し(h6)", handle: "LeftAdd", mdtext: "######" },
          { title: "太文字" },
        ],
        title: "文章見出し",
      },
      {
        action: "mdi-silverware-fork-knife",

        items: [{ title: "中央" }, { title: "右寄せ" }, { title: "左寄せ" }],
        title: "配置",
      },

      {
        action: "mdi-human-male-female-child",
        items: [{ title: "表の挿入" }],
        title: "挿入",
      },
    ],
    drawer: true,
    appBarColor: "grey",
    appBarTitle: "Tasks",
    appBarIcon: "mdi-lightbulb",
    isSearching: false,
    links: [
      { label: "Inbox", icon: "mdi-inbox", color: "background" },
      {
        label: "Planned",
        icon: "mdi-clock-outline",
        color: "background",
      },
    ],
    projects: [
      { label: "Accounting", color: "cyan", due_count: 1 },
      { label: "Secret Game", color: "green" },
      { label: "Dashboard", color: "blue", due_count: 1 },
    ],
    issues: [
      {
        title: "テーブル",
        order: 1,
        description: "表機能を追加します。デフォルトでは4x4",
      },
      {
        title: "画像挿入",
        order: 2,
        description: "画像挿入タグを挿入します。",
      },
    ],
  }),
};
</script>
