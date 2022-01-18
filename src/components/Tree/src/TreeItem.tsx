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
		const { indentRef, getMergedExpandedKeys, getMergedSelectedKeys, handleSwitcherClick, blockLineRef, handleSelect } =
			inject(treeInjectKey)!

		function onSwitcherClick() {
			const { tmNode } = props
			// TODO 需要判断remote的lazy load的情况
			handleSwitcherClick(tmNode)
		}
		function onContentClick() {
			// TODO 需要判断是否click 在checkbox和switcher上面 happenin
			handleSelect(props.tmNode)
		}

		return {
			indent: indentRef,
			expanded: useMemo(() => getMergedExpandedKeys.value.findIndex((key) => key === props.tmNode.key) > -1),
			selected: useMemo(() => getMergedSelectedKeys.value.findIndex((key) => key === props.tmNode.key) > -1),
			onSwitcherClick,
			blockLine: blockLineRef,
			onContentClick
		}
	},
	render() {
		const { clsPrefix, tmNode, indent, expanded, onSwitcherClick, blockLine, onContentClick, selected } = this

		return (
			<div class={`${clsPrefix}-tree-node-wrapper`}>
				<div
					class={[`${clsPrefix}-tree-node`, selected && `${clsPrefix}-tree-node--selected`]}
					onClick={blockLine ? onContentClick : undefined}>
					{repeat(tmNode.level, <div class={`${clsPrefix}-tree-node-indent`} style={{ flex: `0 0 ${indent}px` }} />)}
					<TreeItemSwitcher clsPrefix={clsPrefix} expanded={expanded} onClick={onSwitcherClick} hide={tmNode.isLeaf} />
					<TreeItemContent clsPrefix={clsPrefix} tmNode={tmNode} onClick={blockLine ? undefined : onContentClick} />
				</div>
			</div>
		)
	}
})
