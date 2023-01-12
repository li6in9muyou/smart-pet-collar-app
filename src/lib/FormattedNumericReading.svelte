<script>
	export let unit = '';
	export let value = null;
	export let label = '读数';
</script>

<div>
	{label}：{value === null ? '不可用' : value}
	{unit}
</div>
