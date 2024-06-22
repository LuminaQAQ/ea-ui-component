<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')
})
</script>

<div class="row space-between">
    <ea-result icon="icon-ok-circled" title="成功提示" sub-title="请根据提示进行操作">
        <template slot="extra">
            <ea-button type="success" size="small">确定</ea-button>
        </template>
    </ea-result>
    <ea-result icon="icon-attention-alt" title="警告提示" sub-title="请根据提示进行操作">
        <template slot="extra">
            <ea-button type="warning" size="small">确定</ea-button>
        </template>
    </ea-result>
    <ea-result icon="icon-cancel-circled" title="错误提示" sub-title="请根据提示进行操作">
        <template slot="extra">
            <ea-button type="danger" size="small">返回</ea-button>
        </template>
    </ea-result>
    <ea-result icon="icon-info" title="信息提示" sub-title="请根据提示进行操作">
        <template slot="extra">
            <ea-button type="primary" size="small">朕已阅</ea-button>
        </template>
    </ea-result>
</div>
