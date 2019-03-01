import './assets/base.css';

import 'element-ui/lib/theme-chalk/index.css';

import './components/g6-vuele-editor/assets/editor.css';


// import G6 from '@antv/g6';
//import '@antv/g6/plugins';
import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';

Vue.use(ElementUI);

Vue.config.productionTip = false

/*G6.registerNode('diamond', {
  draw(item) {
    const group = item.getGraphicGroup();
    const model = item.getModel();

    const size = model.size || [140, 140]; // 如果没有 size 时的默认大小
    const width = size[0];
    const height = size[1];
    const shape = group.addShape('path', {
      attrs: {
        //  / 1 \
        // 4     2
        //  \ 3 /
        path: [
          ['M', 0, 0 - height / 2], // 上部顶点
          ['L', width / 2, 0], // 右侧点
          ['L', 0, height / 2], // 下部
          ['L', - width / 2, 0], // 左侧
          ['Z'] // 封闭
        ],
        stroke: '#6e97fa', // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
      }
    });
    if(model.label) { // 如果有文本
      // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
      // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
      // style.text = cfg.label;
      group.addShape('text', {
        // attrs: style
        attrs: {
          x: 0, // 居中
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          text: model.label,
          fill: '#666'
        }
      });
    }
    return shape;
  }
});


G6.registerNode('rect', {
  draw(item){
    const group = item.getGraphicGroup();
    const model = item.getModel();
    const size = model.size || [120, 120]; // 如果没有 size 时的默认大小
    const width = size[0];
    const height = size[1];
    
    group.addShape('path', {
      attrs: {
        path: [
          ['M', 0 - width / 2, 0 - height / 2], // 上部顶点
          ['L', width / 2, 0 - height / 2], // 右侧点
          ['L', width / 2, height / 2], // 下部
          ['L', - width / 2, height / 2], // 左侧
          ['Z'] // 封闭
        ],
        stroke: '#6e97fa', // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
      }
    });

    group.addShape('text', {
      attrs: {
        x: 0,
        y: 0,
        fill: '#333',
        text: model.label,
        textAlign: 'center',
        textBaseline: 'middle',
      }
    });

    return group;
  }
});

G6.registerNode('bigcircle', {
  draw(item){
    const group = item.getGraphicGroup();
    const model = item.getModel();
    const size = model.size || 60; // 如果没有 size 时的默认大小
    const width = size[0];
    const height = size[1];

    group.addShape('circle', {
      attrs: {
        x: 0,
        y: 0,
        r: size,
        stroke: '#6e97fa',
        // fill: 'blue'
      }
    });

    group.addShape('text', {
      attrs: {
        x: 0,
        y: 0,
        fill: '#333',
        text: model.label,
        textAlign: 'center',
        textBaseline: 'middle',
      }
    });

    return group;
  }
});    */



new Vue({
  render: h => h(App),
}).$mount('#app')
