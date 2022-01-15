import { computed, watch } from 'vue'
import type { ComputedRef, Ref } from 'vue'

export function useMergedState<T>(
	controlledStateRef: Ref<T | undefined>,
	uncontrolledStateRef: Ref<T>
): ComputedRef<T> {
	watch(controlledStateRef, (value) => {
		if (value !== undefined) {
			uncontrolledStateRef.value = value
		}
	})
	return computed(() => controlledStateRef.value ?? uncontrolledStateRef.value)
	// return computed(() => {
	// 	if (controlledStateRef.value === undefined) {
	// 		console.log('xx')
	// 		return uncontrolledStateRef.value
	// 	}
	// 	return controlledStateRef.value
	// })
}
