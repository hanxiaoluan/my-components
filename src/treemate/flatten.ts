import type { Key, TreeNode } from './types'
export function flatten<R>(treeNodes: Array<TreeNode<R>>, expandeKeys?: Key[]) {
	const expandedKeysSet = expandeKeys ? new Set<Key>(expandeKeys) : undefined
	const flattenedNodes: Array<TreeNode> = []

	return flattenedNodes
}
