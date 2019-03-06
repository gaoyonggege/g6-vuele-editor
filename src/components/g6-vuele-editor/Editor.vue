<template>
<div class="gve-editor" :class="{ 'gve-editor-boder': !editable }">
    <Toolbar :editor="editor" :editable="editable" @toggleGrid="toggleGrid" v-if="editable" />
    <div class="gve-main">
        <div class="gve-lsection" v-if="editable">
            <Contextmenu :editor="editor" />
            <Itempanel :editor="editor" />
        </div>
        <div class="gve-body">
            <Page :height="canvasHeight" :editor="editor" />
        </div> 
        <div class="gve-rsection" v-if="editable">
            <Navigator :editor="editor" :curZoom="curZoom" :minZoom="minZoom"
                            :maxZoom="maxZoom" @changeZoom="changeZoom" />
        </div> 
    </div>
        
    <el-dialog title="边" :visible.sync="edgeDialogVisible" width="330px">
        <el-form :model="form">
            <el-form-item label="逻辑类型" :label-width="formLabelWidth" style="align: center;">
                <el-select v-model="form.edgeJduge" placeholder="请选择逻辑类型">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="0"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="edgeDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="edgeDialogConfirm">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import G6Editor from '@antv/g6-editor';
import config from './config';
import initCommand from './command';
import { GraphStandard } from './graph';
import Itempanel from './Itempanel';
import Page from './Page';
import Toolbar from './Toolbar';
import Contextmenu from './Contextmenu';
import Navigator from './Navigator';

export default {
    data () {
        return {
            editor: null,
            graphStandard: null,
            canvasHeight: config.canvasHeight,
            selectedModel: {}, // 当前选中项数据模型
            curZoom: 1, // 当前缩放比率
            minZoom: config.zoom.min, // 最小缩放比率
            maxZoom: config.zoom.max, // 最大缩放比率

            // 边弹框
            formLabelWidth: '90px',
            form: {
                edgeJduge: 1,
            },
            edgeDialogVisible: false,
            edgeDialogCb: null,
        }
    },
    props: {
        editable: {
            type: Boolean,
            default: false,
        }                
    },
    methods: {
        init (data, customCfg) {
            const editor = this.editor = new G6Editor();
            this.graphStandard = new GraphStandard(editor, customCfg);
            window.graphStandard = this.graphStandard;

            this.$nextTick( () => {
                this.initUI(editor);
                this.initData(data);
            } );
        },
        initUI (editor) {    
            editor.editable = this.editable;
            initCommand(editor, this);

            this.$nextTick( () => {
                const page = editor.getCurrentPage();
                page.changeAddEdgeModel({
                    shape: 'flow-polyline-round'
                });

                page.on('afterzoom', ev => {
                    this.changeZoom( ev.updateMatrix[0] * config.zoom.ratio );
                });

                page.zoom(config.zoom.start);

                if (this.editable) {
                    page.showGrid();
                } else {
                    page.hideGrid();
                }
            } );
        },
        initData (data) {
            if ( data && data.nodes && data.edges ) {
                this.graphStandard && this.graphStandard.readGraphData(data);
            }
        },
        getEditor () {
            return this.editor;
        },
        changeZoom (zoom) {
            if ( zoom && typeof zoom === 'number' ) {
                const editor = this.editor;
                const page = editor.getCurrentPage();
                this.curZoom = zoom = zoom/config.zoom.ratio;
                page.zoom(zoom);
            }
        },
        toggleGrid (checked) {
            const editor = this.editor;
            const page = editor.getCurrentPage();
            if (checked) {
                page.showGrid();
            } else {
                page.hideGrid();
            }
        },
        updateGraph (key, value) {
            const editor = this.editor;
            editor.executeCommand(() => {
                const page = editor.getCurrentPage();
                const selectedItems = page.getSelected();
                selectedItems.forEach(item => {
                    const updateModel = {};
                    updateModel[key] = value;
                    page.update(item, updateModel);
                });
            });
        },
        openEdgeDialog (cb) {
            this.edgeDialogVisible = true;
            this.edgeDialogCb = cb;
            this.form = {
                edgeJduge: 1,
            };
        },
        edgeDialogConfirm () {
            this.edgeDialogVisible = false;
            if ( this.edgeDialogCb ) {
                this.edgeDialogCb(this.form.edgeJduge);                    
            }
        },
    },
    components: {
        Itempanel,
        Page,
        Toolbar,
        Contextmenu,
        Navigator,
    },
    mounted () {
        
    },
    beforeDestroy () {
        if ( this.editor && typeof this.editor.destroy === 'function' ) {
            this.editor.destroy();
        }
    },
}
</script>