<template>
<div class="gve-toolbar" ref="container">
    <i data-command="undo" class="command gve-iconfont gve-icon-undo" title="撤销"></i>
    <i data-command="redo" class="command gve-iconfont gve-icon-redo" title="重做"></i>
    <span class="separator"></span>
    <i data-command="copy" class="command gve-iconfont gve-icon-copy-o" title="复制"></i>
    <i data-command="paste" class="command gve-iconfont gve-icon-paster-o" title="粘贴"></i>
    <i data-command="delete" class="command gve-iconfont gve-icon-delete-o" title="删除"></i>
    <span class="separator"></span>
    <i data-command="zoomIn" class="command gve-iconfont gve-icon-zoom-in-o" title="放大"></i>
    <i data-command="zoomOut" class="command gve-iconfont gve-icon-zoom-out-o" title="缩小"></i>
    <i data-command="autoZoom" class="command gve-iconfont gve-icon-fit" title="适应画布"></i>
    <i data-command="resetZoom" class="command gve-iconfont gve-icon-actual-size-o" title="实际尺寸"></i>
    <span class="separator"></span>
    <i data-command="toBack" class="command gve-iconfont gve-icon-to-back" title="层级后置"></i>
    <i data-command="toFront" class="command gve-iconfont gve-icon-to-front" title="层级前置"></i>
    <span class="separator"></span>
    <i data-command="multiSelect" class="command gve-iconfont gve-icon-select" title="多选"></i>
    <!-- <i data-command="addGroup" class="command gve-iconfont gve-icon-group" title="成组"></i>
    <i data-command="unGroup" class="command gve-iconfont gve-icon-ungroup" title="解组"></i> -->
    <el-checkbox class="checkbox" v-model="gridChecked" @change="toggleGrid">网格对齐</el-checkbox>
</div>
</template>

<script>
import G6Editor from '@antv/g6-editor';

export default {
    data () {
        return {
            gridChecked: this.editable,
        }
    },
    props: {
        editor: {
            type: Object,
            default: () => {}
        },
        editable: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        toggleGrid ( checked ) {
            this.$emit('toggleGrid', checked);
        },
        init (val) {
            let editor = val;
            const container = this.$refs.container;
            const toolbar = new G6Editor.Toolbar({
                container
            });
            editor.add(toolbar);
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