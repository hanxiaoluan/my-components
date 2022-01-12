import { computed } from 'vue'
import type { ComputedRef, Ref } from 'vue'

export function useMergedState<T>(controlledStateRef: Ref<T>, uncontrolledStateRef: Ref<T>): ComputedRef<T> {
	return computed(() => controlledStateRef.value ?? uncontrolledStateRef.value)
}
