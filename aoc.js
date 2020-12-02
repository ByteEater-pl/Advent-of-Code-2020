"use strict"

function day1() {
	const
		expenses = [],
		inds = [0],
		attempt = () => (expenses[inds[0]] + expenses[inds[2]] - 2020) * dir
	let n, dir = 1
	for (;;) {
		n = readline()
		if (n == null) break
		expenses.push(+n)
	}
	expenses.sort((a, b) => b - a)
	inds[2] = expenses.length - 1
	for (;;) {
		while (attempt() > 0)
			inds[1 - dir] += dir
		if (attempt() == 0)
			return expenses[inds[0]] * expenses[inds[2]]
		dir *= -1
	}
}

print(day1())
