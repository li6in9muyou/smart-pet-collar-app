<script>
	export let label = '读数';
	export let numberStream = null;
	export let unit = '';
	export let decimalPlaces = 3;
</script>

<div>
	{label}：{numberStream === null ? '不可用' : $numberStream.toFixed(decimalPlaces)}
	{unit}
</div>
