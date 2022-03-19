
<template>
  <v-app>
    <splitpanes
      class="default-theme"
      style="height: 100%"
      @resize="paneSize = $event[0].size"
    >
      <pane :size="paneSize">
        <div id="leftEditor">
          <Textarea
            @textAreaScroll="editorScroll"
            :scrollTop="editorScrollTop"
            :mainText="markdown"
            @input="inputEditor"
          />
        </div>
      </pane>
      <pane :size="100 - paneSize">
        <div id="rightView" class="scroll">
          <div v-html="$md.render(markdown)" />
        </div>
      </pane>
    </splitpanes>
  </v-app>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import Textarea from "@/components/Textarea";

export default {
  name: "Editor",
  components: { Splitpanes, Pane, Textarea },
  data() {
    return {
      paneSize: 50,
      editorScrollTop: 0,
      viewScrollTop: 0,
      markdown: `
# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


      `,
    };
  },
  watch: {
    // editorScrollTop(value) {
    //   console.log(value);
    // },
    markdown(value) {
      console.log(value);
    },
  },

  methods: {
    // // 少々複雑な実装（エレメントのサイズが違うものでも対応可
    // // クラスscroll_syncを持たせたエレメントを纏めて取得
    // const scroll_sync = document.getElementsByClassName("scroll_sync");
    // const length = scroll_sync.length;

    // // ここから先のfor文でエレメント1つ1つに関数をセットする。
    // for (let i = 0; i < length; i++) {
    //   // 関数のセット対象のエレメント
    //   const base_element = scroll_sync[i];

    //   // スクロール時に動作する関数をセットする。
    //   base_element.addEventListener("scroll", () => {
    //     // スクロール位置の比率を求める
    //     const scrollRatio = base_element.scrollTop /
    //       (base_element.scrollHeight - base_element.clientHeight);
    //     for (let j = 0; j < length; j++) {
    //       // 自分自身とは連動しないようにcontinueで回避
    //       if (i == j) continue;
    //       const target_element = scroll_sync[j];
    //       target_element.scrollTop =
    //         (target_element.scrollHeight - target_element.clientHeight) *
    //         scrollRatio;
    //     }
    //   });
    // }
    editorScroll(val) {
      const rView = document.getElementById("rightView");
      //スクロール比率を計算　（100%が1）
      const scrollRatio = val.scrollTop / (val.scrollHeight - val.clientHeight);
      //比率をもとに書き込み
     
        rView.scrollTop =
          (rView.scrollHeight  - rView.clientHeight) *
          scrollRatio;
      
    },
    inputEditor(contents) {
      console.log(contents);
      this.markdown = contents;
    },
  },
};
</script>
<style scoped>
.theme--dark.v-application {
  color: black;
}
.scroll {
  /* width: 100vh; */
  height: 100vh;
  overflow: auto;
  background: #565656;
  color: #fff;
}
</style>
