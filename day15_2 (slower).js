// Surprisingly, this works slower on V8 than day15_1 with the number changed.
// But neither is fast enough.
function day15_2() {
	const ages = new Map
	function add(x) {
		for (let [k, v] of ages)
			ages.set(k, v + 1)
		let n = ages.get(+x) ?? 0
		ages.set(+x, 0)
		return n
	}
	let n = "13,0,10,12,1,5,8".split(",").map(add).pop()
	for (let _ = ages.size; _ < 29999999; _++)
		n = add(n)
	return n
}