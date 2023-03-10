<script>
	export let unit = '';
	export let value = null;
	export let label = '读数';
	export let decimalPlaces = 3;
</script>

<div>
	{label}：{value === null ? '不可用' : value.toFixed(decimalPlaces)}
	{unit}
</div>
