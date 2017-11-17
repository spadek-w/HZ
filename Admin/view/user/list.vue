<template>
    <div class="wrapper-content">
        <Card shadow :bordered="false">
            <!-- 顶部工具条 -->
            <Row  class="table-seach-box" height>
                <Input v-model="kw"  placeholder="请输入对象" style="width: 320px">
                    <Select v-model="filter"  clearable slot="prepend" style="width: 100px">
                        <Option value="ALL" key="AL'" > 全部 </Option>
                        <Option v-for="key of fields.like" :value="key" :key="key"> {{ attrs[key]["title"]}} </Option>
                    </Select>
                    <Button slot="append" icon="ios-search"  @click="search"></Button>
                </Input>
                <Button class="margin-right-sm" type="primary">新增</Button>
            </Row>
            <!-- 表格  -->
            <Table border :loading="loading" :columns="columns" :height="size>10? 500 : '' " :data="rows"></Table>
            <!-- 底部工具条 -->
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="total" :page-size="size" :current='page' show-sizer show-total show-elevator  @on-change="onPageChange" @on-page-size-change="onSizeChange"></Page>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
import {modelParser} from 'common/util/model';
import {fetchModel } from 'common/api/tool';
import {fetchUserList} from 'common/api/user';
var tableModel = {};
export default {
    name: "errortype",
    components: {},
    data() {
        return {
            kw: "", //搜索词
            page: 1, //当前页码
            size: 20, //分页大小（每页的条数）
            total: 0, //总条目数
            row:{},   //当前正在编辑查看数据
            rows: [], //列表数据，从服务器获取
            loading: true,//加载状态

            show: [],       //当前显示的字段(供筛选)
            order: [],      //当前排序
            filter: "ALL" , //当前检索字段
            attrs:{},       //table原始数据列（不含功能）
            columns: [],    //table展示列（实际展示,包含功能)
            //table 字段属性
            fields : {
                "all":[],
                "edit":[],
                "show":[],
                "like":[],
                "match":[],
                "order":[],
            },
        };
    },
    created() {
        fetchModel("User").then(model => {
            tableModel = modelParser(model);
            this.show = tableModel["show"];
            this.fields.all = tableModel["all"];
            this.fields.edit = tableModel["edit"];
            this.fields.show = tableModel["show"];
            this.fields.like = tableModel["like"];
            this.fields.match = tableModel["match"];
            this.fields.order = tableModel["order"];
            this.changeColumns();
        });
        this.updateTable();
    },
   
    methods: {
        //查询按钮
        search() {
            this.page = 1;
            this.updateTable();
        },
        //跳转页面
        onPageChange(page) {
            this.page = page;
            this.updateTable();
        },
        //更改页面大小
        onSizeChange(size) {
            this.size = size;
            this.updateTable();
        },
        // 刷新列表数据
        updateTable(){
            this.loading = true;
            var params ={};
            params["kw"] = this.kw;
            params["size"] = this.size;
            params["page"] = this.page;
            params["filter"] = this.filter;
            //获取数据
            console.log(params)
            fetchUserList(params).then(data=>{
                this.rows = data["rows"];
                this.total = data["total"];
                this.loading = false;
            })
        },

        // 展示详情
        showInfo(index) {
            var params = { username: this.rows[index].username };
            getUserInfo(params).then(res => {
                this.curUser = res.data;
                this.modal = true;
            });
        },
        //移除
        remove(index) {
            alert("删除" + index);
            this.rows.splice(index, 1);
        },
        //批量删除

        // 变更队列
        changeColumns(){
            let attrs = {};
            let columns = [];
            for(let col of tableModel["columns"]){
                if(!!~this.show.indexOf(col["key"])){
                    columns.push(col);
                    attrs[col["key"]] = col;
                }
            }
            this.attrs = attrs;
            columns.push({
                title:"操作",
                width: 150,
                align: 'center',
                fixed:"right",
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.remove(params.index)
                                }
                            }
                        }, '删除')
                    ]);
                }
            });
            this.columns=columns;
        },
    },
     

};
</script>
<style lang="less">

</style>
