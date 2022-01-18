import { RawNode } from './types'

export const getChildren = <R>(node: R) => (node as any).children

export const isLeaf = <R = RawNode>(node: R) => {
	const { isLeaf } = node as unknown as RawNode
	if (isLeaf !== undefined) return isLeaf
	if (!getChildren(node)) return true
	return false
}
