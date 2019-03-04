<template>
<div class="gve-itempannel" ref="container">
    <img draggable="false" :src="svg_sartend" data-type="node" data-shape="flow-circle" data-size="72*72" data-color="#FA8C16" data-label="起始节点" class="getItem" />
    <img draggable="false" :src="svg_normal" data-type="node" data-shape="flow-rect" data-size="80*48" data-color="#1890FF" data-label="风控节点" class="getItem" />
    <img draggable="false" :src="svg_bifurcate" data-type="node" data-shape="flow-rhombus" data-size="80*72" data-color="#13C2C2" data-label="路由节点" class="getItem" />
    <img draggable="false" :src="svg_model" data-type="node" data-shape="flow-capsule" data-size="80*48" data-color="#722ED1" data-label="额度节点" class="getItem" />
</div>
</template>

<script>
import G6Editor from '@antv/g6-editor';
import svg_sartend from './assets/icon/startend.svg';
import svg_normal from './assets/icon/normal.svg';
import svg_bifurcate from './assets/icon/bifurcate.svg';
import svg_model from './assets/icon/model.svg';

export default {
    data () {
        return {
            svg_sartend,
            svg_normal,
            svg_bifurcate,
            svg_model,

            
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
            let itempannel = new G6Editor.Itempannel({
                container
            });
            editor.add(itempannel);
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