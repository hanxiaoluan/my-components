<template>
	<Tree block-line :data="data" :default-expanded-keys="defaultExpandedKeys" selectable />
</template>

<script setup>
import Tree from '../src/Tree'
import { ref } from 'vue'
function createData(level = 4, baseKey = '') {
	if (!level) return undefined
	return Array.apply(null, { length: 6 - level }).map((_, index) => {
		const key = '' + baseKey + level + index
		return {
			label: createLabel(level),
			key,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			children: createData(level - 1, key)
		}
	})
}

function createLabel(level) {
	if (level === 4) return '道生一'
	if (level === 3) return '一生二'
	if (level === 2) return '二生三'
	if (level === 1) return '三生万物'
}
const data = createData()
const defaultExpandedKeys = ref(['40', '41'])
</script>
