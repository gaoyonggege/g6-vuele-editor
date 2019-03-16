<template>
<div class="gve-page" ref="container">

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
        },
        height: {
            type: Number,
            default: 0,
        },
    },
    methods: {
        init (val) {
            let editor = val;
            const container = this.$refs.container,
                    height = this.height;
            let page = window.page = new G6Editor.Flow({
                graph: {
                    container,
                    height
                },
                align: {
                    grid: true
                }
            });
            editor.add(page);
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

