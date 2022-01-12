import type { Key, TreeNode } from './types'
export function flatten<R>(treeNodes: Array<TreeNode<R>>, expandedKeys?: Key[]) {
	const expandedKeysSet = expandedKeys ? new Set<Key>(expandedKeys) : undefined
	const flattenedNodes: Array<TreeNode<R>> = []
	function helper(treeNodes: Array<TreeNode<R>>) {
		treeNodes.forEach((treeNode) => {
			flattenedNodes.push(treeNode)
			if (!treeNode.children) return
			if (expandedKeysSet === undefined || expandedKeysSet?.has(treeNode.key)) {
				helper(treeNode.children)
			}
		})
	}
	helper(treeNodes)
	return flattenedNodes
}
