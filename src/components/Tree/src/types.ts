import type { VNodeChild, Ref, ComputedRef } from 'vue'
import type { TreeNode } from '@/treemate/types'
export type Key = string | number

export interface TreeOption {
	key?: Key
	label?: string
	checkboxDisabled?: boolean
	isLeaf?: boolean
	children?: TreeOption[]
	prefix?: () => VNodeChild
	suffix?: () => VNodeChild
	[key: string]: unknown
}

export type TreeOptions = TreeOption[]

// export interface TreeNode<R = RawNode> {}
export type TmNode = TreeNode<TreeOption>

export interface TreeInjection {
	indentRef: Ref<number>
	getMergedExpandedKeys: ComputedRef<Key[]>
}
