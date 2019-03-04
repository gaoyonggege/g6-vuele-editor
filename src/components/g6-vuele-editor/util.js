/**
*  工具类
*/
import { Message, MessageBox } from 'element-ui';

// node节点shape类型
export const NODE_CIRCLE_TYPE = 'flow-circle';
export const NODE_RHOMBUS_TYPE = 'flow-rhombus';
export const NODE_RECT_TYPE = 'flow-rect';
export const NODE_CAPSULE_TYPE = 'flow-capsule';
export const NODE_TYPES = [NODE_CIRCLE_TYPE, NODE_RHOMBUS_TYPE, NODE_RECT_TYPE, NODE_CAPSULE_TYPE];

// edge节点
export const EDGE_TYPE = 'flow-polyline-round';
//const EDGE_LINE_COLOR = ;
export const EDGE_YES_LINE_TEXT = '#F56464';
export const EDGE_NO_LINE_TEXT = '#7ca5f9';


/**
 * 是否是node节点类型
 * @param {*} item 
 */
export function isNode ( item ) {
    if ( !item ) {
        return false;
    }

    if ( NODE_TYPES.includes(item.shape) ) {
        return true;
    }

    return false;
}

/**
 * 是否是起始节点
 * @param {*} item 
 */
export function isStartNode ( item ) {
    if ( !item ) {
        return false;
    }

    if ( NODE_CIRCLE_TYPE === item.shape ) {
        return true;
    }

    return false;
}

/**
 * 是否是分支节点
 * @param {*} item 
 */
export function isRhombusNode ( item ) {
    if ( !item ) {
        return false;
    }

    if ( NODE_RHOMBUS_TYPE === item.shape ) {
        return true;
    }

    return false;
}
/**
 * 是否是常规节点
 * @param {*} item 
 */
export function isRectNode ( item ) {
    if ( !item ) {
        return false;
    }

    if ( NODE_RECT_TYPE === item.shape ) {
        return true;
    }

    return false;
}
/**
 * 是否是模型节点
 * @param {*} item 
 */
export function isCapsuleNode ( item ) {
    if ( !item ) {
        return false;
    }

    if ( NODE_CAPSULE_TYPE === item.shape ) {
        return true;
    }

    return false;
}

/**
 * 是否是edge线类型
 * @param {*} item 
 */
export function isLine ( item ) {
    if ( !item ) {
        return false;
    }
    if ( EDGE_TYPE === item.shape ) {
        return true;
    }

    return false;
}

/**
 * 编辑器中是否已经有了一个起始节点[ 有且只能有一个起始节点 ]
 * @param {*} graph 
 * @return n 起始节点的个数
 */
export function hasStartPoint ( graph ) {
    if ( !graph ) {
        return false;
    }

    const nodes = graph.getNodes();
    if ( !nodes || nodes.length <= 0 ) {
        return 0;
    }

    for ( let node of nodes ) {
        if ( isStartNode(node.model) ) {
            return true;
        }
    }

    return false;
}

/**
 * 得到节点的入口边集合
 * @param {*} node 
 * @param {*} graph 
 */
export function nodeInLines (node, graph) {
    const lists = [];
    if ( !node || !graph ) {
        return lists;
    }

    const edges = graph.getEdges();    
    for ( let edge of edges ) {
        let edgeTarget = edge['model']['target'];
        if ( (typeof node === 'string' && edgeTarget == node) || 
                (typeof node === 'object' && edgeTarget == node.id) ) {
            lists.push(edge);
        }
    }

    return lists;
}

/**
 * 得到节点的出口边集合
 * @param {*} node 
 * @param {*} graph 
 */
export function nodeOutLines (node, graph) {
    const lists = [];
    if ( !node || !graph ) {
        return lists;
    }

    const edges = graph.getEdges();    
    for ( let edge of edges ) {
        let edgeTarget = edge['model']['source'];
        if ( (typeof node === 'string' && edgeTarget == node) || 
                (typeof node === 'object' && edgeTarget == node.id) ) {
            lists.push(edge);
        }
    }

    return lists;
}



/**
 * 根据节点id得到节点本身
 * @param {*} graph 
 * @param {*} nodeId 
 */
export function getNodeById ( graph, nodeId ) {
    if ( !graph || !nodeId ) {
        return null;
    }

    let node = null, nodes = graph.getNodes();
    for ( let nd of nodes ) {
        if ( nd.id == nodeId ) {
            node = nd;
        }
    }

    return node;
}


/**
 * 添加动作 ==========================================
 */

/**
 * 修改边
 * @param {*} graph 
 * @param {*} item 
 */ 
export function modifyLineWithYes ( graph, item ) {
    if ( !graph && !item ) {
        return false;
    } 
    
    item.label = {
        text: '是',
        fill: EDGE_YES_LINE_TEXT,
    };
    item.color = EDGE_YES_LINE_TEXT;
    item.judge = 1;  //设置自定义变量 代表是
    
    graph.update(item.id, item);
}
export function modifyLineWithNo ( graph, item ) {
    if ( !graph && !item ) {
        return false;
    }

    item.label = {
        text: '否',
        fill: EDGE_NO_LINE_TEXT,
    };
    item.color = EDGE_NO_LINE_TEXT;
    item.judge = 0; //设置自定义变量 代表否
    
    graph.update(item.id, item);
}




// ui
/**
 * 操作非法提示
 * @param {*} msg 
 */
export function operationIllegal ( msg ) {
    Message({
        message: msg || '操作非法',
        type: 'error',
    });
}


// 集合操作
/**
 * 线类
 */
export class Line {
    constructor ( sourceId, targetId ) {
        this.sourceId = sourceId;
        this.targetId = targetId;
    }
    /**
     * 判断两条线是否相等
     * @param {*} line1 
     * @param {*} line2 
     */
    static lineEquale ( line1, line2 ) {
        if ( line1 === line2 ) {
            return true;
        }
        if ( !line1 || !line2 ) {
            return false;
        }
        if ( line1.sourceId === line2.sourceId && line1.targetId === line2.targetId ) {
            return true;
        }

        return false;
    }
}

/**
 * 线是否在线集合中
 * @param {*} line 
 * @param {*} list 
 */
export function lineInList (line, list) {
    if ( !line || !list || !Array.isArray(list) ) {
        return false;
    }

    for ( let _ of list ) {
        if ( Line.lineEquale(line, _) ) {
            return true;
        }
    }

    return false;
}

/**
 * 得到图的全部的边集合
 * @param {*} graph 
 */
export function getCurrentLineList ( graph ) {
    if ( !graph ) {
        return [];
    }
    const list = [];
    const edges = graph.getEdges();
    for ( let edge of edges ) {
        if ( edge.model && edge.model.source && edge.model.target ) {
            let line = new Line(edge.model.source, edge.model.target);
            list.push(line);
        }
    }
    
    return list;
}


/**
 * 得到图的全部的边带模型集合
 * @param {*} graph 
 */
export function getCurrentEdgeModelList ( graph ) {
    if ( !graph ) {
        return [];
    }

    const list = [];
    const edges = graph.getEdges();
    for ( let edge of edges ) {
        list.push(edge.model);
    }
    
    return list;
}


/**
 * 新边是否合法
 * @param {*} newLineItem 
 * @param {*} graph 
 */
export function isNewEdgeLegal ( newEdgeItem, graph ) {
    if ( !newEdgeItem || !graph ) {
        return false;
    }

    const newEdgeLine = new Line( newEdgeItem.source, newEdgeItem.target );
    const currentLines = getCurrentLineList(graph);
    if ( lineInList(newEdgeLine, currentLines) ) {
        return false;
    } else {    
        return true;
    }
}


// ========================     查找     ===========================
/**
 *  全部依赖model
 */

 /**
 * 通过node id在集合中查找node
 * @param {*} ndoeId 
 * @param {*} nodes 
 */
export function findNodeById ( ndoeId, nodes ) {
    if ( !ndoeId || !nodes || !Array.isArray(nodes) ) {
        return;
    }

    for ( let node of nodes ) {
        if ( ndoeId == node.id ) {
            return node;
        }
    }

    return null;
}

/**
 * 查找起始节点
 * @param {*} nodes 
 */
export function findStartNode ( nodes ) {
    if ( !nodes || !Array.isArray(nodes) ) {
        return;
    }

    for ( let node of nodes ) {
        if ( isStartNode(node) ) {
            return node;
        }
    }
}

/**
 * 查找起始节点的下一个节点
 * @param {*} nodes 
 * @param {*} edges 
 */
export function findStartNextNode ( nodes, edges ) {
    if ( !nodes || !Array.isArray(nodes) || !edges || !Array.isArray(edges) ) {
        return null;
    }    

    const startNode = findStartNextNode(nodes);
    if ( !startNode ) {
        return null;
    }

    let children = findNodeOutEdge(startNode);
    if ( !children || children.length != 1 ) {
        return '起始节点的出口边不是1';
    }   

    const startNextNode = findNodeById( children[0].source );
    return startNextNode;
}





/**
 * 计算node节点的入口边
 * @param {*} node 
 * @param {*} edges 
 */
export function findNodeInEdge ( node, edges ) {
    if ( !node || !edges || !Array.isArray(edges) ) {
        return [];
    }

    const ins = [];
    for ( let edge of edges ) {
        if ( edge.target == node.id ) {
            ins.push(edge);
        }            
    }
    return ins;
}
/**
 * 计算node节点的出口边
 * @param {*} node 
 * @param {*} edges 
 */
export function findNodeOutEdge ( node, edges ) {
    if ( !node || !edges || !Array.isArray(edges) ) {
        return [];
    }

    const outs = [];
    for ( let edge of edges ) {
        if ( edge.source == node.id ) {
            outs.push(edge);
        }    
    }
    return outs;
}




/**
 * 查找节点的父节点
 * @param {*} node 
 * @param {*} nodes 
 * @param {*} edges 
 */
export function findNodeParent ( node, nodes, edges ) {
    if ( !node || !nodes || !Array.isArray(nodes) || 
                                    !edges || !Array.isArray(edges) ) {
        return;
    }
    
    // 判断是否是起始节点
    if ( isStartNode(node) ) {
        return;
    }

    let ins = findNodeInEdge(node, edges);
    if ( !ins || !ins.length || ins.length != 1 ) {
        return;
    }
    const inEdge = ins[0];
    const inEdgeTarget = inEdge['source'];

    let parent = findNodeById(inEdgeTarget, nodes);

    return parent;
}

/**
 * 查找节点的子节点
 * @param {*} node 
 * @param {*} nodes 
 * @param {*} edges 
 */
export function findNodeChilren ( node, nodes, edges ) {
    if ( !node || !nodes || !Array.isArray(nodes) || 
                                    !edges || !Array.isArray(edges) ) {
        return;
    }

    const children = [];

    const outEdges = findNodeOutEdge(node, edges);
    for ( let outEdge of outEdges ) {
        const _ = findNodeById(outEdge['target'], nodes);
        _ && children.push(_);  
    }


    return children;
}

