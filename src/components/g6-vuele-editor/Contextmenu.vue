<template>
<div class="gve-contextmenu" ref="container">
    <div data-status="node-selected" class="menu">
        <!-- <div data-command="copy" class="command">
          <span>复制</span>
          <span>copy</span>
        </div> -->
        <div data-command="delete" class="command">
          <span>删除</span>
          <span>delete</span>
        </div>
    </div>
    <div data-status="edge-selected" class="menu">
        <div data-command="delete" class="command">
          <span>删除</span>
          <span>delete</span>
        </div>
    </div>
    <div data-status="group-selected" class="menu">
        <!-- <div data-command="copy" class="command">
          <span>复制</span>
          <span>copy</span>
        </div> -->
        <div data-command="delete" class="command">
          <span>删除</span>
          <span>delete</span>
        </div>
        <!-- <div data-command="unGroup" class="command">
          <span>解组</span>
          <span>unGroup</span>
        </div> -->
    </div>
    <div data-status="canvas-selected" class="menu">
        <!-- <div data-command="undo" class="command">
          <span>撤销</span>
          <span>undo</span>
        </div>
        <div data-command="redo" class="command">
          <span>重做</span>
          <span>redo</span>
        </div>
        <div data-command="pasteHere" class="command">
          <span>粘贴</span>
          <span>pasteHere</span>
        </div> -->
        <div data-command="clear" class="command">
          <span>清空画布</span>
          <span>delete</span>
        </div>
    </div>
    <div data-status="multi-selected" class="menu">
        <!-- <div data-command="copy" class="command">
          <span>复制</span>
          <span>copy</span>
        </div>
        <div data-command="paste" class="command">
          <span>粘贴</span>
          <span>paste</span>
        </div>
        <div data-command="addGroup" class="command">
          <span>归组</span>
          <span>addGroup</span>
        </div> -->
        <div data-command="delete" class="command">
          <span>删除</span>
          <span>delete</span>
        </div>
    </div>
</div>
</template>

<script>
import G6Editor from '@antv/g6-editor';

export default {
    data () {
        return {

        }
    },
    props: {
        editor: {
            type: Object,
            default: () => null
        }
    },
    methods: {
        init (val) {
            let editor = val;
            const container = this.$refs.container;
            let contextmenu = new G6Editor.Contextmenu({
                container
            });
            editor.add(contextmenu);
        }
    },
    watch: {
        'editor': function ( val, oldVal ) {
            if ( val && !oldVal ) {
                this.init(val);
            }            
        },
    }
}
</script>