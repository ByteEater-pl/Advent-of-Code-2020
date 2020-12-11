"use strict"
// The difference is that stale values in the arrangements array aren't discarded. A sufficiently smart translator should notice when they aren't accessed anymore and optimize if necessary.
function day10_2() {
	const
		ratings = input(10).sort((a, b) => a - b),
		arrangements = [1]
	for (const [i, joltage] of ratings.entries())
		arrangements.unshift(arrangements.reduce(
			(a, n, j) => a + n * (joltage - [ratings[i - j - 1]] < 4),
			0))
	return arrangements[0]
}