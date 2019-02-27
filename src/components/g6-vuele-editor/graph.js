/**
*  编辑器管理
*   @author: gaoyonggege@github.com
*   @date: 2019.02.27
*/


import * as util from './util';


/**
 * 判断单个节点是否符合规范
 * @param {*} node 
 */
export function validateNode ( node, graph ) {
    if ( !node ) {
        return false;
    }

    const outs = util.nodeOutLines(node, graph),  // 出口边集合
            ins = util.nodeInLines(node, graph);  // 入口边集合

    if ( util.isStartNode(node.model) ) {
        if ( outs.length != 1 || ins.length > 0 ) {
            return '起始节点出口不是1或者有入口';
        }
    } else if ( util.isRhombusNode(node.model) ) {
        if ( outs.length != 2 || ins.length != 1 ) {
            return '分控节点必须有2个出口和1个入口';
        }
    } else if ( util.isRectNode(node.model) ) {
        if ( outs.length != 1 || ins.length != 1 ) {
            return '风控节点必须有1个出口和1个入口';
        }
    } else if ( util.isCapsuleNode(node.model) ) {
        if ( outs.length > 0 || ins.length != 1 ) {
            return '额度节点必须有1个入口且没有出口';
        }
    }

    return true;
}

/**
 * 判断单条边是否合法
 * @param {} edge 
 */
export function validateEdge ( edge ) {
    if ( !edge ) {
        return false;
    }

    const model = edge.model;
    if ( model.id && model.shape == util.EDGE_TYPE &&
                        model.source && model.target ) {
        return true;                            
    }

    return false;
}

/**
 * 画布标准类
 */
export class GraphStandard {
    constructor ( editor, customCfg ) {
        const { nodeValidator } = customCfg;

        this.editor = editor;
        this.editor.graphStandard = this;
        this.nodeValidator = nodeValidator;
    }

    // 得到画布
    getGraph () {
        const page = this.editor.getCurrentPage();
        const graph = page.getGraph();
        return graph;
    }

    // =============  校验类  ========================

    /**
     *  画布上的全部图形是不是都符合规范
     *  @param {*} graph 
     */
    graphStandardized () {
        const graph = this.getGraph();

        let ret = this.nodeStandardized(graph);
        if ( ret != true ) {
            return ret;
        }
        ret = this.edgeStandardized(graph);
        if ( ret != true ) {
            return ret;   
        }

        return true;
    }

    /**
     * 校验全部节点是否符合规范
     * @param {*} graph 
     */
    nodeStandardized ( graph ) {
        if ( !graph ) {
            return false;
        }

        const nodes = graph.getNodes();
        for ( let node of nodes ) {
            let ret = validateNode(node);
            if (  ret != true ) {
                return ret;
            }        
        }
        
        for ( let node of nodes ) {
            let ret = this.nodeValidator(node);
            if ( ret != true ) {
                return '节点没有绑定因子信息';
            }        
        }

        return true;
    }

    /**
     * 校验全部边是否符合规范
     * @param {*} graph 
     */
    edgeStandardized ( graph ) {
        if ( !graph ) {
            return false;
        }

        const edges = graph.getEdges();
        for ( let edge of edges ) {
            if ( !validateEdge(edge) ) {
                return '连接边线有问题!';
            }
        }

        return true;
    }


    // =================   动作类    =================
    // 简化设计,请体谅 !
    /**
     * 读取画布的数据[符合第三方要求的格式,故该函数逻辑不可复用]
     * @param {*} data : 第三方格式的数据
     */
    readGraphData ( data ) {

    }

    /**
     * 得到画布的数据[符合第三方要求的格式,故该函数逻辑不可复用]
     */
    saveGraphData () {
        const graph = this.getGraph();
        
        
    }
}



