<template>
<div class="gve-navigator">
    <div class="panel-title">导航器</div>
    <div class="minimap" ref="container"></div>
    <div class="gve-zoom-slider">
        <span class="process-tip">{{ cur }}%</span>
        <el-dropdown class="process-select" @command="handleCommand">
            <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="50">50</el-dropdown-item>
                <el-dropdown-item command="100">100</el-dropdown-item>
                <el-dropdown-item command="150">150</el-dropdown-item>
                <el-dropdown-item command="200">200</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-slider class="custom-slider" @change="sliderChange" 
                        v-model="process" :min="min" :max="max"></el-slider>
    </div>
</div>
</template>

<script>
import G6Editor from '@antv/g6-editor';
import config from './config';

export default {
    data () {
        return {
            config,
            process: this.curZoom*config.zoom.ratio,
        }
    },
    props: {
        editor: {
            type: Object,
            default: () => null
        },
        curZoom: {
            type: Number,
            default: config.zoom.defaultMin*config.zoom.ratio,
        },
        minZoom: {
            type: Number,
            default: config.zoom.defaultMax*config.zoom.ratio,
        },
        maxZoom: {
            type: Number,
            default: config.zoom.defaultMax*config.zoom.ratio,
        },
    },
    computed: {
        cur () {
            return Math.floor(this.curZoom*config.zoom.ratio);    
        },
        min () {
            return this.minZoom*config.zoom.ratio;   
        },
        max () {
            return this.maxZoom*config.zoom.ratio; 
        },
    },
    methods: {
        handleCommand (command) {
            let process = window.parseInt(command);
            this.sliderChange(process);
        },
        sliderChange (process) {
            this.$emit('changeZoom', process);    
        },
        init (val) {
            let editor = val;
            const container = this.$refs.container;
            const minimap = new G6Editor.Minimap({
                container,
                height: 135,
                width: 190,
            });
            editor.add(minimap);
        }
    },
    watch: {
        editor ( val, oldVal ) {
            if ( val && !oldVal ) {
                this.init(val);
            }            
        },
        curZoom ( val, oldVal ) {
            if ( typeof val === 'number' && val >= 0 ) {
                this.process = val*config.zoom.ratio;
            }
        }
    }
}
</script>
