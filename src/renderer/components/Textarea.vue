
<template>
  <v-app>
    <div @input="changeEditor" @scroll="scrollEditor" @keydown="keydownEditor">
      <textarea id="lineCounter" wrap="off" readonly>1.</textarea
      ><textarea id="codeEditor" wrap="off"></textarea>
    </div>
  </v-app>
</template>


<script>
export default {
  name: "Editor",
  components: {},
  data() {
    return {
      lineCountCache: 0,
      codeEditor: "",
      lineCounter: "",
    };
  },
  mounted() {
    this.codeEditor = document.getElementById("codeEditor");
    this.lineCounter = document.getElementById("lineCounter");
  },
  methods: {
    changeEditor() {
      this.line_counter();
    },
    scrollEditor() {
      this.lineCounter.scrollTop = this.codeEditor.scrollTop;
      this.lineCounter.scrollLeft = this.codeEditor.scrollLeft;
    },
    keydownEditor(e) {
      console.log(e);
      let { keyCode } = e;
      let { value, selectionStart, selectionEnd } = codeEditor;

      if (keyCode === 9) {
        // TAB = 9
        e.preventDefault();
        codeEditor.value =
          value.slice(0, selectionStart) + "\t" + value.slice(selectionEnd);
        codeEditor.setSelectionRange(selectionStart + 2, selectionStart + 2);
      }
    },

    line_counter() {
      var lineCount = codeEditor.value.split("\n").length;
      var outarr = new Array();
      if (this.lineCountCache != lineCount) {
        for (var x = 0; x < lineCount; x++) {
          outarr[x] = x + 1 + ".";
        }
        this.lineCounter.value = outarr.join("\n");
      }
      this.lineCountCache = lineCount;
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
<style>
#codeEditor,
#lineCounter {
  font-family: lucida console, courier new, courier, monospace;
  margin: 0;
  padding: 10px 0;
  height: 100vh;
  border-radius: 0;
  resize: none;
  font-size: 16px;
  line-height: 1.2;
  outline: none;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
#codeEditor {
  padding-left: calc(3.5rem + 5px);
  width: 100%;
  /* Determine appearance of code editor */
  background-color: #272822;
  border-color: #272822;
  color: #ffffff;
}
#lineCounter {
  display: flex;
  border-color: transparent;
  overflow-y: hidden;
  text-align: right;
  box-shadow: none;
  color: #707070;
  background-color: #d8d8d8;
  position: absolute;
  width: 3.5rem;
  /* Determine appearance of line counter */
  background-color: #3e3d32;
  border-color: #3e3d32;
  color: #928869;
}
#lineCounter:focus-visible,
#codeEditor:focus-visible {
  outline: none;
}
</style>