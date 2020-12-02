"use strict"

function day1() {
	const
		expenses = [],
		inds = [0],
		attempt = () => (2020 - expenses[inds[0]] - expenses[inds[2]]) * dir
	let n, dir = 1
	for (;;) {
		n = readline()
		if (n == null) break
		expenses.push(+n)
	}
	expenses.sort((a, b) => a - b)
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
