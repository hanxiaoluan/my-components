import { defineComponent, inject, PropType } from 'vue'
import TreeItemSwitcher from './TreeItemSwitcher'
import TreeItemContent from './TreeItemContent'
import { repeat } from '@/utils/repeat'
import { treeInjectKey } from './Tree'
import { useMemo } from '@/utils/useMemo'
import type { TmNode } from './types'

export default defineComponent({
	name: 'TreeItem',
	props: {
		clsPrefix: {
			type: String,
			required: true
		},
		tmNode: {
			type: Object as PropType<TmNode>,
			required: true
		}
	},
	setup(props) {
		const { indentRef, getMergedExpandedKeys } = inject(treeInjectKey)!

		return {
			indent: indentRef,
			expanded: useMemo(() => getMergedExpandedKeys.value.findIndex((key) => key === props.tmNode.key) > -1)
		}
	},
	render() {
		const { clsPrefix, tmNode, indent, expanded } = this

		return (
			<div class={`${clsPrefix}-tree-node-wrapper`}>
				<div class={`${clsPrefix}-tree-node`}>
					{repeat(tmNode.level, <div class={`${clsPrefix}-tree-node-indent`} style={{ flex: `0 0 ${indent}px` }} />)}
					<TreeItemSwitcher clsPrefix={clsPrefix} expanded={expanded} />
					<TreeItemContent clsPrefix={clsPrefix} tmNode={tmNode} />
				</div>
			</div>
		)
	}
})
