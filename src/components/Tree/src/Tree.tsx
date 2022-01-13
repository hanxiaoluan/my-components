import { computed, defineComponent, PropType, toRef, provide } from 'vue'
import { TreeMate } from '@/treemate/index'
import { useMergedState } from '@/utils/useMergedState'
import TreeItem from './TreeItem'
import type { VNode, InjectionKey } from 'vue'
import type { TreeOptions, Key, TmNode, TreeInjection } from './types'

import './styles/tree.scss'

export const treeInjectKey: InjectionKey<TreeInjection> = Symbol('tree')
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
	expandedKeys: Array as PropType<Array<Key>>,
	defaultExpandedKeys: {
		type: Array as PropType<Array<Key>>,
		default: () => []
	},
	indent: {
		type: Number,
		default: 16
	}
}

function createNode(tmNode: TmNode, clsPrefix: string): VNode {
	return <TreeItem tmNode={tmNode} clsPrefix={clsPrefix} />
}
export default defineComponent({
	name: 'Tree',
	props: basicProps,
	setup(props) {
		const clsPrefix = 'jade'
		const getTreeMate = computed(() => new TreeMate(props.data))
		console.log(getTreeMate.value)
		const uncontrolledExpandedKeysRef = toRef(props, 'defaultExpandedKeys')
		const controlledExpandedKeysRef = toRef(props, 'expandedKeys')
		const getMergedExpandedKeys = useMergedState(controlledExpandedKeysRef, uncontrolledExpandedKeysRef) // 默认肯定是空数组

		const getFlattenNodes = computed(() => getTreeMate.value.getFlattenedNodes(getMergedExpandedKeys.value))

		const mergedFlattenNodesRef = computed(() => {
			return getFlattenNodes.value
		})

		console.log(mergedFlattenNodesRef.value)

		provide(treeInjectKey, {
			indentRef: toRef(props, 'indent')
		})
		return {
			fattenNodes: mergedFlattenNodesRef,
			clsPrefix
		}
	},
	render() {
		const treeClass = [`${this.clsPrefix}-tree`]
		// TODO 虚拟滚动的判断
		return <div class={treeClass}>{this.fattenNodes.map((tmNode) => createNode(tmNode, this.clsPrefix))}</div>
	}
})
