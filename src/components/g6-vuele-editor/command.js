/**
 * 命令管理
 */
import { Message, MessageBox } from 'element-ui';
import G6Editor from '@antv/g6-editor';

import { STATE_EDITING, STATE_SHOWING, EDGE_ADD, NODE_CLICK, } from './const';
import * as util from './util';


/**
 * 
 * @param {*} editor 
 * @param {*} cb : action回调
 */
export default function init (editor, rootComponent, cb) {
    window.G6Editor = G6Editor;
    const Command = G6Editor.Command;
    const page = editor.getCurrentPage(),
                            graph = page.getGraph();

    // 路由节点点击事件
    graph.on('node:click', ev => {
        const { item } = ev, model = item.model;
        
        console.log(`click node id : ${ item.model.id }`);

        if ( util.isStartNode(model) ) {
            return;
        }

        // 判断是否是编辑态
        if ( editor.editable ) {
            rootComponent.$emit(NODE_CLICK, STATE_EDITING, item, (item) => {
                graph.update(item, item.model);
            });
        } else {
            rootComponent.$emit(NODE_CLICK, STATE_SHOWING, item, (item) => {
                
            });
        }
    });
    
    // 边节点点击事件
    graph.on('edge:click', ev => {
        const { item } = ev, model = item.model;

        console.log(`click edge id : ${ item.model.id }`);

        // 判断是否是编辑态
        if ( !editor.editable ) {
            return false;
        }
    }); 


    /**
     *  重定义 add事件
     */
    Command.registerCommand('add', {
        execute ( editor ) {
            const commond = this, page = editor.getCurrentPage(),
                            graph = page.getGraph();

            const item = commond.addModel;              
            console.log(`node add`);

            // 判断是否是编辑态
            if ( !editor.editable ) {
                return false;
            }

            // 判断初始节点
            if ( !util.hasStartPoint(graph) ) {
                if ( !util.isStartNode(item) ) {
                    return Message({
                        message: '请先添加起始节点',
                        type: 'warning'
                    });
                }
            } else {
                if ( util.isStartNode(item) ) {
                    return Message({
                        message: '不能添加多余起始节点',
                        type: 'warning'
                    });
                }
            }
            
            if ( util.isNode(item) ) {
                return graph.add('node',item);             
            } else if ( util.isLine(item) ) {
                /**
                 * !!! 判断是否可以画线 !!!
                 */
                let { source, target } = item;
                let sourceNode = util.getNodeById(graph, source),
                        targetNode = util.getNodeById(graph, target);
                /**
                 * 判断源节点
                 */
                const outs = util.nodeOutLines(sourceNode, graph);
                if ( util.isStartNode(sourceNode.model) ) {
                    if ( outs.length > 0 ) {
                        return util.operationIllegal();
                    }
                } else if ( util.isRhombusNode(sourceNode.model) ) {
                    if ( outs.length >= 2 ) {
                        return util.operationIllegal();
                    }
                } else if ( util.isRectNode(sourceNode.model) ) {
                    if ( outs.length >= 1 ) {
                        return util.operationIllegal();
                    }
                } else if ( util.isCapsuleNode(sourceNode.model) ) {
                    return util.operationIllegal();
                }
                const ins = util.nodeInLines(targetNode, graph);
                /**
                 * 判断目标节点
                 */
                if ( util.isStartNode(targetNode.model) ) {
                    return util.operationIllegal();
                } else if ( util.isRhombusNode(targetNode.model) ) {
                    if ( ins.length > 0 ) {
                        return util.operationIllegal();
                    }
                } else if ( util.isRectNode(targetNode.model) ) {
                    if ( ins.length > 0 ) {
                        return util.operationIllegal();
                    }
                } else if ( util.isCapsuleNode(targetNode.model) ) {
                    if ( ins.length > 0 ) {
                        return util.operationIllegal();
                    }
                }

                // 源节点+目标节点
                // 源节点是起始节点，目标节点不是分支节点
                if ( util.isStartNode(sourceNode.model) && !util.isRhombusNode(targetNode.model) ) {
                    return util.operationIllegal();
                }
                // 判断是否是重复边
                if ( !util.isNewEdgeLegal(item, graph) ) {
                    return util.operationIllegal();
                }

                // >>>>>>>> 终
                if ( util.isRhombusNode(sourceNode.model) ) {
                    if ( outs.length <= 1 ) {
                        // 判断分支节点已有的边
                        let currentOutLists = util.nodeOutLines(sourceNode.model, graph);
                        if ( currentOutLists.length <= 0 ) {
                            rootComponent.openEdgeDialog( (ret) => {
                                // 添加动作 
                                graph.add('edge',item);
    
                                // 更新edge类型
                                if ( ret ) {
                                    util.modifyLineWithYes(graph, item);
                                } else {
                                    util.modifyLineWithNo(graph, item);
                                }
                            });
                        } else {
                            // 添加动作 
                            graph.add('edge',item);

                            if ( currentOutLists[0].model && currentOutLists[0].model.judge ) {
                                util.modifyLineWithNo(graph, item);
                            } else {
                                util.modifyLineWithYes(graph, item);
                            }
                        }
                    }
                } else {
                    // 添加动作 
                    graph.add('edge',item);
                }
            }
        }
      }
    );

    Command.registerCommand('clear', {
        execute ( editor ) {
            const commond = this, page = editor.getCurrentPage(),
                            graph = page.getGraph();
          
            MessageBox.confirm('确定要清空画布吗?')
                .then(() => {
                    const items = graph.getItems();
                    for ( let item of items ) {
                        graph.remove(item);
                    }
                }).catch(() => {
                });
        }
      }
    );

          
    // 执行命令前
    editor.on('beforecommandexecute', ev => {
        const { command } = ev;
    });
    // 执行命令后
    editor.on('aftercommandexecute', ev => {
        const { command } = ev, page = editor.getCurrentPage(),
                        graph = page.getGraph();
        
        const item = command.addModel;
    });
}

