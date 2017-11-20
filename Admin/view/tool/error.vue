<template>
    <div class="wrapper-content">
        <Card shadow :bordered="false">

            <!-- 顶部工具条 -->
            <Row  class="table-seach-box" height>
            
                <Input v-model="kw"  placeholder="请输入对象" style="width: 320px">
                    <Select v-model="filter"  clearable slot="prepend" style="width: 100px">
                        <Option value="ALL" key="AL'" > 全部 </Option>
                        <Option v-for="key of fields.like" :value="key" :key="key"> {{ attrs[key]["title"] }} </Option>
                    </Select>
                    <Button slot="append" icon="ios-search"  @click="search"></Button>
                </Input>

                <Button class="margin-right-sm" type="primary"  @click="eidtRowData()">新增</Button>
            </Row>
            <!-- 表格  -->
            <Table border :data="rows" :columns="columns" @on-selection-change="onRowSelect" :loading="loading" :height="size>10? 500 : '' " ></Table>
            <!-- 底部工具条 -->
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="total" :page-size="size" :current='page' show-sizer show-total show-elevator  @on-change="onPageChange" @on-page-size-change="onSizeChange"></Page>
                </div>
            </div>

            <!-- Modal编辑框 -->
            <Modal  v-model="modalShow"  title="编辑" >
                <Form ref="row" :model="row" :rules="modalValidate" :label-width="80">
                    <Form-item label="类型" prop="type">
                        <Input v-model="row.type" placeholder="请输入错误类型"></Input>
                    </Form-item>
                    <Form-item label="代码" prop="code">
                        <Input v-model="row.code" placeholder="请输入错误代码" number></Input>
                    </Form-item>
                    <Form-item label="KEY" prop="key">
                        <Input v-model="row.key" placeholder="请输入错误KEY"></Input>
                    </Form-item>
                    <Form-item label="消息" prop="msg">
                        <Input v-model="row.msg" placeholder="请输入错误信息"></Input>
                    </Form-item>
                    <Form-item label="提示" prop="tips">
                        <Input v-model="row.tips" placeholder="请输入提示"></Input>
                    </Form-item>

                    <Form-item>
                        <Button type="primary" @click="modalSubmit('row')">提交</Button>
                        <Button type="ghost" @click="modalReset('row')" style="margin-left: 8px">重置</Button>
                    </Form-item>

                </Form>
            </Modal>
         
        </Card>
    </div>
</template>

<script>
import { Message } from 'iview';
import {modelParser,initModal,initValidate} from 'common/util/model'
import {fetchModel ,postNewError,fetchErrorInfo,updateErrorInfo,removeErrorInfo, fetchErrorList } from 'common/api/tool';
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
            //
            show: [],       //当前显示的字段(供筛选)
            order: [],      //当前排序
            filter: "ALL" , //当前检索字段
            attrs:{},       //table原始数据列（不含功能）
            columns: [],    //table展示列（实际展示,包含功能)
            selection:[],   //table当前选择项（用于多选）
            // 模态框数据
            create:true,    //模态框 数据类型  true: 新建   false: 更新
            modalShow:false,  //是否展示Modal
            modalValidate: {},//Modal的验证属性
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
        fetchModel("ErrorType").then(model => {
            tableModel = modelParser(model);
            this.show = tableModel["show"];
            this.fields.all = tableModel["all"];
            this.fields.edit = tableModel["edit"];
            this.fields.show = tableModel["show"];
            this.fields.like = tableModel["like"];
            this.fields.must = tableModel["must"];
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
            fetchErrorList(params).then(data=>{
                this.rows = data["rows"];
                this.total = data["total"];
                this.loading = false;
            })
        },
        //移除
        remove(index) {
            var id = this.rows[index]['id'];
            removeErrorInfo(id).then(data=>{
                this.rows.splice(index, 1);
                this.$Message.info("删除成功")
            })
        },
        // 表单多选
        onRowSelect(selection,row){
            this.selection = selection;
        },
        //批量删除（多选）
        batchRemove(){
            //todo
        },
         // 初始化modal
        initModalData (){
            var modal = initModal(tableModel)
            this.row = modal;
            var validates = initValidate(tableModel);
            this.modalValidate = validates;
            //添加自定义校验
        },
        // 重置模态框
        modalReset (name) {
            this.$refs[name].resetFields();
        },
        // 打开模态窗口
        eidtRowData (index){
            this.initModalData();
            if(index>=0){
                var id = this.rows[index]['id'];
                this.create = false;
                fetchErrorInfo(id).then((data)=>{
                    this.row = data["row"];
                    this.modalShow = true;
                })
            }else{
                this.create = true;
                this.modalShow = true;
            }
        },
        //提交数据
        modalSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let params = this.row;
                    if(this.create && !this.row["id"]){
                        postNewError(params).then(data=>{
                            Message.success('创建成功!');
                            this.updateTable()
                            this.$Modal.remove();
                        })
                    }else{
                        updateErrorInfo(params).then(data=>{
                            Message.success('更新成功!');
                             this.updateTable()
                             this.$Modal.remove();
                        })
                    }
                } else {
                    Message.error('表单验证失败!');
                }
            })
        },
        
        // 初始化表单列 （或更新）
        changeColumns(){
            let attrs = {};
            let columns = [];
            columns.push({
                type: 'selection',
                width: 60,
                align: 'center',
                fixed:"left",
            })
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
                                type: 'success',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.eidtRowData(params.index)
                                }
                            }
                        }, '编辑'),
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
        }  
    }
};
</script>
<style lang="less">

</style>
