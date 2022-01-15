import { computed, defineComponent, PropType, toRef, provide, ref } from 'vue'
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
	},
	blockLine: Boolean, // 节点整行撑开
	blockNode: Boolean, // 节点名称整行撑开
	disabled: Boolean
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
		const uncontrolledExpandedKeysRef = ref(props.defaultExpandedKeys)
		const controlledExpandedKeysRef = toRef(props, 'expandedKeys')
		const getMergedExpandedKeys = useMergedState(controlledExpandedKeysRef, uncontrolledExpandedKeysRef) // 默认肯定是空数组

		const getFlattenNodes = computed(() => getTreeMate.value.getFlattenedNodes(getMergedExpandedKeys.value))

		const mergedFlattenNodesRef = computed(() => {
			return getFlattenNodes.value
		})

		console.log(mergedFlattenNodesRef.value)

		function doUpdateExpandedKeys(value: Key[]): void {
			// TODO 需要加上updateKeys的hook函数 before
			uncontrolledExpandedKeysRef.value = value
			console.log(value, uncontrolledExpandedKeysRef.value, getMergedExpandedKeys.value)
		}
		function toggleExpand(key: string | number) {
			const { value: mergedExpandedKeys } = getMergedExpandedKeys
			const index = mergedExpandedKeys.findIndex((expandedKey) => expandedKey === key)
			// 通过位运算来判断index
			if (~index) {
				const newExpandedKeys = Array.from(mergedExpandedKeys)
				newExpandedKeys.splice(index, 1)
				doUpdateExpandedKeys(newExpandedKeys)
			} else {
				const nodeToBeExpanded = getTreeMate.value.getNode(key)
				// TODO 需要判断leaf节点 remote模式下
				if (!nodeToBeExpanded) {
					return
				}
				console.log(key)
				doUpdateExpandedKeys(mergedExpandedKeys.concat(key))
			}
		}
		function handleSwitcherClick(tmNode: TmNode): void {
			if (props.disabled) return
			toggleExpand(tmNode.key)
		}
		provide(treeInjectKey, {
			indentRef: toRef(props, 'indent'),
			getMergedExpandedKeys,
			handleSwitcherClick
		})
		return {
			fattenNodes: mergedFlattenNodesRef,
			clsPrefix
		}
	},
	render() {
		const { blockLine, blockNode, clsPrefix } = this
		const treeClass = [
			`${clsPrefix}-tree`,
			(blockLine || blockNode) && `${clsPrefix}-tree--block-node`,
			blockLine && `${clsPrefix}-tree--block-line`
		]
		// TODO 虚拟滚动的判断
		return <div class={treeClass}>{this.fattenNodes.map((tmNode) => createNode(tmNode, this.clsPrefix))}</div>
	}
})
