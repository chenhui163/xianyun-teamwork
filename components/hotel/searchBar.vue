<template>
    <div class="container">
        <el-form class="hotel-search-bar">
            <el-form-item style="padding-right:10px">
                <el-autocomplete
                    v-model="form.destination"
                    class="inline-input"
                    placeholder="请输入内容"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item>
                <el-date-picker
                    v-model="form.date"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    default-value="2010-10-01"
                ></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-popover
                    ref="popover5"
                    placement="bottom"
                    width="320"
                    margin-bottom="50"
                    v-model="visible2"
                >
                    <el-row style="padding-bottom:20px; border-bottom: 1px solid #dddddd;">
                        <el-col :span="8">
                            <span>每间</span>
                        </el-col>

                        <el-col :span="8" style="padding: 0 5px;">
                            <el-select v-model="value1" placeholder="成人" size="mini">
                                <el-option
                                    v-for="item in options1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-col>

                        <el-col :span="8" style="padding: 0 5px;">
                            <el-select v-model="value2" placeholder="儿童" size="mini">
                                <el-option
                                    v-for="item in options2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>

                    <div style="text-align: right; margin: 0">
                        <el-button
                            size="mini"
                            type="text"
                            @click="visible2 = false"
                            style="padding-top: 25px;"
                        >取消</el-button>
                        <el-button type="primary" size="mini" @click="handleSetNumber">确定</el-button>
                    </div>

                </el-popover>

                <el-input v-popover:popover5 placeholder="人数未定" v-model="form.number" readonly="readonly" ></el-input>
                <i
                    class="el-icon-user"
                    style="position: absolute; right:10px; top:10px; font-size: 20px; color:#c0c4cc"
                ></i>
            </el-form-item>

            <el-form-item style="padding-left:10px">
                <el-button type="primary">查看价格</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                destination: "",
                date: "",
                number: "",
            },
            visible2: false,
            options1: [
                {
                    value: "1成人",
                    label: "1"
                },
                {
                    value: "2成人",
                    label: "2"
                },
                {
                    value: "3成人",
                    label: "3"
                },
                {
                    value: "4成人",
                    label: "4"
                }
            ],
            options2: [
                {
                    value: "1儿童",
                    label: "1"
                },
                {
                    value: "2儿童",
                    label: "2"
                },
                {
                    value: "3儿童",
                    label: "3"
                },
                {
                    value: "4儿童",
                    label: "4"
                }
            ],
            value1: "",
            value2: ""
        };
    },
    methods: {
        // 人数选框确定按键 ：按下确认人数
        handleSetNumber(){
            this.form.number = this.value1 + this.value2
            this.visible2 = false
        }
    }
};
</script>

<style scoped lang="less">
.container {
    width: 1000px;
    margin: 0 auto;

    .hotel-search-bar {
        .el-form-item {
            display: inline-block;
        }
    }
}
</style>