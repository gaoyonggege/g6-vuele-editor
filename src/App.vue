<template>
  <div id="app">
      <Editor ref="editor" :editable="true" @node_click="node_click" />
  </div>
</template>

<script>
import G6 from '@antv/g6';
import data from './data';

import Editor from './components/g6-vuele-editor/Editor';
import { STATE_EDITING, STATE_SHOWING, EDGE_ADD, NODE_CLICK, } from './components/g6-vuele-editor/const';

export default {
  name: 'app',
  data () {
    return {
      data
    }  
  },
  components: {
    Editor,
  },
  methods: {
      node_click ( state, item, cb ) {
        if ( state == STATE_EDITING ) {
          item.model.label = '中欧\n哈哈';
          cb(item);
        }
      },
  },
  mounted () {
    this.$refs.editor.init(null, {
      nodeValidator: function ( node ) {
        return true;
      },
    }, null);

    // window.G6 = G6;

    // const graph = new G6.Graph({
    //   container: 'app',
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    //   renderer: 'svg',
    //   plugins: [new G6.Plugins['layout.dagre']()],
    //   defaultIntersectBox: 'rect' // 使用矩形包围盒
    // });

    // graph.node({
    //   shape: 'rect',
    //   label: function label(model) {
    //     return model.label;
    //   },

    //   style: {
    //     stroke: '#00C0A5',
    //     fill: '#92949F',
    //     fillOpacity: 0.45,
    //     lineWidth: 2
    //   }
    // });
    // graph.edge({
    //   style: {
    //     endArrow: true
    //   }
    // });

    // graph.read(this.data);

    // graph.on('node:click', ev=>{
    //   const { domEvent, item } = ev;
    //   const { target } = domEvent;
    //   if(target){
    //     alert(`点击了 : ${item.id}`);
    //   }
    // });
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
