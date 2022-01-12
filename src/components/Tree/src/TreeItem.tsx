import { defineComponent, inject, PropType } from 'vue'
import { repeat } from '@/utils/repeat'
import { treeInjectKey } from './Tree'
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
		const { indentRef } = inject(treeInjectKey)!

		return {
			indent: indentRef
		}
	},
	render() {
		const { clsPrefix, tmNode, indent } = this

		return (
			<div class={`${clsPrefix}-tree-node-wrapper`}>
				<div class={`${clsPrefix}-tree-node`}>
					{repeat(tmNode.level, <div class={`${clsPrefix}-tree-node-indent`} style={{ flex: `0 0 ${indent}px` }} />)}
				</div>
			</div>
		)
	}
})
