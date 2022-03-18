
<template>
  <v-app>
    <splitpanes
      class="default-theme"
      style="height: 100%"
      @resize="paneSize = $event[0].size"
    >
      <pane :size="paneSize">

<Textarea />

      </pane>
      <pane :size="100 - paneSize">
        <div id="rightView" class="scroll" @scroll="onScroll()">
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
  components: { Splitpanes, Pane,Textarea },
  data() {
    return {
      paneSize: 50,
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
  methods: {
  editorEvent(){
    console.log("Hi");
  },
    onScroll(val) {
      const s1 = document.getElementById("leftEditor");
      console.log(s1.editor);
      // console.log(val)
      const s2 = document.getElementById("rightView");
      console.log(s2.scrollTop);
      // console.log(val)
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
