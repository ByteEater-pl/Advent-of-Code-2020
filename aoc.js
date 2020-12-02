"use strict"

function input(name) {
	return require("fs").readFileSync(`${name}.in`, {encoding: "latin1"}).split("\n")
}

function day1_1() {
	const
		expenses = input(1),
		inds = [0],
		attempt = () => (2020 - expenses[inds[0]] - expenses[inds[2]]) * dir
	expenses.sort((a, b) => a - b)
	inds[2] = expenses.length - 1
	let dir = 1
	for (;;) {
		while (attempt() > 0)
			inds[1 - dir] += dir
		if (attempt() == 0)
			return expenses[inds[0]] * expenses[inds[2]]
		dir *= -1
	}
}

function day1_2() {
	const
		expenses = input(1),
		inds = [0, 1],
		attempt = () =>
			inds.reduce((a, x) => a - expenses[x], 2020) * dir
	expenses.sort((a, b) => a - b)
	inds[2] = expenses.length - 1
	let dir = 1, d
	for (;;) {
		while ((d = inds[1 + dir] - inds[1] - dir) && attempt() > 0)
			inds[1] += dir
		if (attempt() == 0)
			return inds.reduce((a, x) => a * expenses[x], 1)
		inds[d ? 1 + dir : 1 - dir] += d ? -dir : dir
		dir *= -1
	}
}

function day2_1() {
	return input(2).filter(l => {
		const
			[, lo, hi, c, pass] = /(\d+)-(\d+) (.): (.*)/.exec(l),
			n = pass.split(c).length - 1
		return lo <= n && n <= hi
	}).length
}

function day2_2() {
	return input(2).filter(l =>
		(([, i, j, c, pass]) =>
			(pass[i - 1] == c) ^ (pass[j - 1] == c)
		)(/(\d+)-(\d+) (.): (.*)/.exec(l))
	).length
}

console.log(day1_1())
console.log(day1_2())
console.log(day2_1())
console.log(day2_2())