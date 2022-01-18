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
		onClick: Function as PropType<(e: MouseEvent) => void>,
		hide: Boolean
	},
	render() {
		const { clsPrefix, expanded, hide } = this

		return (
			<span
				class={[
					`${clsPrefix}-tree-node-switcher`,
					expanded && `${clsPrefix}-tree-node-switcher--expanded`,
					hide && `${clsPrefix}-tree-node-switcher--hide`
				]}
				onClick={this.onClick}>
				<div class={`${clsPrefix}-tree-node-switcher__icon`}>
					<SwitcherIcon />
				</div>
			</span>
		)
	}
})
