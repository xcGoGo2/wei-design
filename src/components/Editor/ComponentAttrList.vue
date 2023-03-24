<template>
    <div class="component-attr-list-container">
        <div class="title">
            <span>组件配置</span>
            <svg-icon name="预览"></svg-icon>
        </div>
        <el-tabs type="border-card" class="demo-tabs">
            <el-tab-pane label="定制">
                <template #label>
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item title="Consistency" name="1">
                            <div>
                                Consistent with real life: in line with the process and logic of
                                real life, and comply with languages and habits that the users are
                                used to;
                            </div>
                            <div>
                                Consistent within interface: all elements should be consistent, such
                                as: design style, icons and texts, position of elements, etc.
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="Feedback" name="2">
                            <div>
                                Operation feedback: enable the users to clearly perceive their
                                operations by style updates and interactive effects;
                            </div>
                            <div>
                                Visual feedback: reflect current state by updating or rearranging
                                elements of the page.
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="Efficiency" name="3">
                            <div>
                                Simplify the process: keep operating process simple and intuitive;
                            </div>
                            <div>
                                Definite and clear: enunciate your intentions clearly so that the
                                users can quickly understand and make decisions;
                            </div>
                            <div>
                                Easy to identify: the interface should be straightforward, which
                                helps the users to identify and frees them from memorizing and
                                recalling.
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="Controllability" name="4">
                            <div>
                                Decision making: giving advices about operations is acceptable, but
                                do not make decisions for the users;
                            </div>
                            <div>
                                Controlled consequences: users should be granted the freedom to
                                operate, including canceling, aborting or terminating current
                                operation.
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </template>
            </el-tab-pane>
            <el-tab-pane label="Config">Config</el-tab-pane>
            <el-tab-pane label="Role">Role</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
  console.log(val)
}

const componentAttrListData = reactive({
    width: 1920,
    height: 1080
})

const chartOptions = ref({})
</script>

<style lang="scss" scoped>
.component-attr-list-container {
    width: 100%;
    height: 100%;
    padding: 10px;
    font-size: 14px;
    font-weight: 700;
    // overflow-y: scroll;

    .title {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 700;
        height: 35px;
        width: 100%;
        border-radius: 6px;
        background-color: #fff;
        cursor: pointer;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 8%);

        span {
            margin-right: 5px;
        }
    }
}
</style>

