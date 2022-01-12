export function repeat<T>(count: number, v: T): T[] {
	const result = []
	for (let i = 0; i < count; i++) {
		result.push(v)
	}
	return result
}
