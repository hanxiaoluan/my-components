/* eslint-disable no-dupe-class-members */
import { flatten } from './flatten'
import { getChildren } from './utils'
import type { RawNode, TreeMateOptions, TreeMateType, TreeNode, Key, LevelTreeNodeMap, TreeNodeMap } from './types'

export class TreeMate<R = RawNode> implements TreeMateType<R> {
	treeNodes: Array<TreeNode<R>> = []
	treeNodeMap: TreeNodeMap<R> = new Map()
	levelTreeNodeMap: LevelTreeNodeMap<R> = new Map()

	get maxLevel() {
		return Math.max(...this.levelTreeNodeMap.keys())
	}
	constructor(rawNodes: Array<R>, options: TreeMateOptions<R> = {}) {
		const nodeProto = {
			get key() {
				return (this as any).rawNode.key
			}
		}
		this.treeNodes = createTreeNodes(rawNodes, this.treeNodeMap, this.levelTreeNodeMap, nodeProto, getChildren)
	}
	getFlattenedNodes(expandedKeys?: Key[]) {
		return flatten(this.treeNodes, expandedKeys)
	}

	getNode<T>(key: Key | null | undefined): T extends null | undefined ? null : TreeNode<R>
	getNode(key: Key | null | undefined): TreeNode<R> | null {
		if (key === null || key === undefined) return null
		const treeNode = this.treeNodeMap.get(key)
		if (treeNode) return treeNode
		return null
	}
}
// class TreeNodes<T {
//     rawNode
// }
function createTreeNodes<R = RawNode>(
	rawNodes: Array<R>,
	treeNodeMap: TreeNodeMap<R>,
	levelTreeNodeMap: LevelTreeNodeMap<R>,
	nodeProto: any = {},
	getChildren: any,
	parent: TreeNode<R> | null = null,
	level = 0
) {
	const treeNodes: Array<TreeNode<R>> = []

	rawNodes.forEach((rawNode, index) => {
		const treeNode = Object.create(nodeProto)
		treeNode.rawNode = rawNode
		treeNode.siblings = treeNodes
		treeNode.level = level
		treeNode.index = index
		treeNode.isFirstChild = index === 0
		treeNode.isLastChild = index + 1 === rawNodes.length
		treeNode.parent = parent

		const rawChildren = getChildren(rawNode)
		if (Array.isArray(rawChildren)) {
			treeNode.children = createTreeNodes<R>(
				rawChildren,
				treeNodeMap,
				levelTreeNodeMap,
				nodeProto,
				getChildren,
				treeNode,
				level + 1
			)
		}
		treeNodes.push(treeNode)
		treeNodeMap.set(treeNode.key, treeNode)
		!levelTreeNodeMap.has(level) && levelTreeNodeMap.set(level, [])
		levelTreeNodeMap.get(level)?.push(treeNode)
	})

	return treeNodes
}
