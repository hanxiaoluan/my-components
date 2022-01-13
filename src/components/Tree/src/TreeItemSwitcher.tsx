import { defineComponent, PropType } from 'vue'
import SwitcherIcon from './Switcher'
export default defineComponent({
	name: 'TreeItemSwitcher',
	props: {
		clsPrefix: {
			type: String,
			required: true
		},
		expanded: Boolean,
		onClick: Function as PropType<(e: MouseEvent) => void>
	},
	render() {
		const { clsPrefix, expanded } = this

		return (
			<span
				class={[`${clsPrefix}-tree-node-switcher`, expanded && `${clsPrefix}-tree-node-switcher--expanded`]}
				onClick={this.onClick}>
				<div class={`${clsPrefix}-tree-node-switcher__icon`}>
					<SwitcherIcon />
				</div>
			</span>
		)
	}
})
