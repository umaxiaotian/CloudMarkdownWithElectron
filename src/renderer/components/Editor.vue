
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
            :scroll-top="editorScrollTop"
            :main-text="markdown"
            @textAreaScroll="editorScroll"
            @input="inputEditor"
          />
        </div>
      </pane>
      <pane :size="100 - paneSize">
        <div>
          <Viewarea id="rightView" :markdown="markdown" />
        </div>
      </pane>
    </splitpanes>
  </v-app>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import Textarea from '@/components/Textarea'
import Viewarea from '@/components/Viewarea'
const { ipcRenderer } = require('electron')
export default {
  name: 'Editor',
  components: { Splitpanes, Pane, Textarea, Viewarea },
  data () {
    return {
      paneSize: 50,
      editorScrollTop: 0,
      viewScrollTop: 0,
      markdown: ''
    }
  },
  created () {
    // IPCでメッセージを受信してファイルの制御を行う
    ipcRenderer.on('main_file_message', (event, arg) => {
      console.log(arg)
      switch (arg) {
      case 'open':
        // ファイルを開く
        ipcRenderer.invoke('file-open').then(data => {
          // console.log(data.returnData[0]);
          this.markdown = data.returnData[0].toString()
        })
        break
      case 'save':
        // ファイルを保存
        // saveFile();
        break
      case 'saveas':
        // 名前を付けてファイルを保存
        ipcRenderer.invoke('save', this.markdown)
        break
      }
    })
  },
  methods: {
    editorScroll (val) {
      const rView = document.getElementById('rightView')

      // スクロール比率を計算　（100%が1）
      const scrollRatio = val.scrollTop / (val.scrollHeight - val.clientHeight)

      // 比率をもとに書き込み
      rView.scrollTop = (rView.scrollHeight - rView.clientHeight) * scrollRatio
    },
    // 文字列を更新
    inputEditor (contents) {
      this.markdown = contents
    }
  }
}
</script>
