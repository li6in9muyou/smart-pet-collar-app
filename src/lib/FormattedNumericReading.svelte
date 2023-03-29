<script>
	export let label = '读数';
	export let numberStream = null;
	export let unit = '';
	export let decimalPlaces = 3;

	let text = '不可用';
	$: {
		if (numberStream !== null && !isNaN($numberStream)) {
			text = $numberStream.toFixed(decimalPlaces);
		}
	}
</script>

<div>
	{label}：{text}
	{unit}
</div>
