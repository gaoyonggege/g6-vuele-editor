

export default {
    nodes: [
        { shape: 'rect',id: '1',
            label: '二要素路由因子新策略\n规则数量：1',width: 200, height: 60 }, 
        { id: '111111111111111111111111111111111111111',
            label: '二要素新策略\n规则数量：2', shape: 'diamond', },
        { id: 'a', label: 'aaa',shape: 'bigcircle', },{ id: 'b', label: 'bbb',shape: 'rect', },
        { id: 'b1', label: 'b1b1b1',shape: 'rect', },{ id: 'b2', label: 'b2b2b2',shape: 'rect', },
        { shape: 'rect',id: '100000000000000000000000000000000000000',label: '三要素路由因子新策略', },
        { shape: 'rect',id: 'c', label: 'ccc', },
        { shape: 'rect',id: 'c1', label: 'c1c1c1', },{ shape: 'rect',id: 'c2', label: 'c2c2c2', },
        { shape: 'rect',id: '1011111111111111111111111111111111111111',label: '三要素新策略', },

    ],
    edges: [
        { 
            source: '1', 
            target: '111111111111111111111111111111111111111', 
            label: '是', color: 'red' 
        },
        { source: '111111111111111111111111111111111111111', target: 'a', },
        { source: '111111111111111111111111111111111111111', target: 'b', },
        { source: 'b', target: 'b1', },{ source: 'b', target: 'b2', },
        { 
            source: '1', 
            target: '100000000000000000000000000000000000000', 
            label: '否', color: 'red' 
        },
        { source: '100000000000000000000000000000000000000', target: 'c', },
        { source: 'c', target: 'c1', },{ source: 'c', target: 'c2', },
        { 
            source: '100000000000000000000000000000000000000', 
            target: '1011111111111111111111111111111111111111', 
            label: '否', color: 'red' 
        },
    ]    
}