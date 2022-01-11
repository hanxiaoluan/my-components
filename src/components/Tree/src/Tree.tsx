import { computed, defineComponent, PropType } from 'vue'
import { TreeMate } from '@/treemate/index'
import type { TreeOptions, Key } from './types'
const basicProps = {
	data: {
		type: Array as PropType<TreeOptions>,
		default: () => []
	},
	keyField: {
		type: String,
		default: 'key'
	},
	childrenField: {
		type: String,
		default: 'children'
	},
	expandedKeys: {
		type: Array as PropType<Array<Key>>,
		default: () => []
	}
}
export default defineComponent({
	name: 'Tree',
	props: basicProps,
	setup(props) {
		const getTreeMate = computed(() => new TreeMate(props.data))
		console.log(getTreeMate.value)
		const getFlattenNodes = computed(() => getTreeMate.value.getFlattenedNodes(props.expandedKeys))
		const mergedFlattenNodesRef = computed(() => {
			return getFlattenNodes.value
		})

		return {
			fattenNodes: mergedFlattenNodesRef
		}
	},
	render() {
		// TODO 如果虚拟滚动 会怎么样
		return <div>{this.fattenNodes.map((item) => 'xxx')}</div>
	}
})
