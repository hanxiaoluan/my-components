import type { VNodeChild } from 'vue'

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
