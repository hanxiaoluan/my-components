export type Key = string | number

export interface RawNode {
	key?: Key
	children?: RawNode[]
	isLeaf?: boolean
	disabled?: boolean
	[key: string]: unknown
}

export interface TreeMateOptions<R> {
	ignoreEmptyChilden?: boolean
	getChildren?: (node: R) => Array<R> | unknown
	getKey?: (node: R) => Key
	getDisabled?: (node: R) => boolean
	getIsGroup?: (node: R) => boolean
	getIgnored?: (node: R) => boolean
}
export interface TreeNode<R = RawNode> {
	key: Key
	rawNode: R
	level: number
	index: number
	isFirstChild: boolean
	isLastChild: boolean
	parent: TreeNode<R> | null
	isLeaf: boolean
	isGroup: boolean
	ignored: boolean
	shallowLoaded: boolean
	disabled: boolean
	siblings: Array<TreeNode<R>>
	children?: Array<TreeNode<R>>
	getPrev: (options?: any) => TreeNode<R> | null
	getNext: (options?: any) => TreeNode<R> | null
	getParent: () => TreeNode<R> | null
	getChild: () => TreeNode<R> | null
	contains: (treeNode: TreeNode<R> | null | undefined) => boolean
}
export interface TreeMateType<R = RawNode> {
	treeNodes: Array<TreeNode<R>>
}

export type TreeNodeMap<R> = Map<Key, TreeNode<R>>
export type LevelTreeNodeMap<R> = Map<number, Array<TreeNode<R>>>
