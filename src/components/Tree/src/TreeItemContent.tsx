import { defineComponent, PropType } from 'vue'
import type { TmNode } from './types'
export default defineComponent({
	name: 'TreeItemContent',
	props: {
		clsPrefix: {
			type: String,
			required: true
		},
		onClick: Function as PropType<(e: MouseEvent) => void>,
		tmNode: {
			type: Object as PropType<TmNode>,
			required: true
		}
	},
	setup() {},
	render() {
		const {
			clsPrefix,
			tmNode: {
				rawNode: { label }
			}
		} = this
		return (
			<span class={[`${clsPrefix}-tree-node-content`]}>
				<div class={[`${clsPrefix}-tree-node-content__text`]}>{label}</div>
			</span>
		)
	}
})
