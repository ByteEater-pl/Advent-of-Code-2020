"use strict"

const fs = require("fs") 

function input(name, delim = "\n") {
	return fs.readFileSync(`${name}.in`, {encoding: "latin1"}).split(delim)
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

function day3_1() {
	const grid = input(3)
	let
		n = 0,
		c = 0
	for (const row of grid) {
		n += row[c] == "#"
		c = (c + 3) % grid[0].length
	}
	return n
}

function day3_2() {
	const grid = input(3)
	return [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]].reduce((a, [h, v]) => {
		let
			n = 0,
			c = 0,
			r = 0
		while ((r += v) < grid.length)
			n += grid[r][c = (c + h) % grid[0].length] == "#"
		return a * n
	}, 1)
}

function day4_1() {
	return input(4, "\n\n")
		.filter(doc =>
			["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
			.every(key => doc.includes(`${key}:`)))
		.length
}

function day4_2() {
	return input(4, "\n\n")
		.filter(doc => [
				["byr", /^(\d{4})$/, y => 1920 <= y && y <= 2002],
				["iyr", /^(\d{4})$/, y => 2010 <= y && y <= 2020],
				["eyr", /^(\d{4})$/, y => 2020 <= y && y <= 2030],
				["hgt", /^(\d+)cm$|^(\d+)in$/, (c, i) =>
					150 <= c && c <= 193 || 59 <= i && i <= 76],
				["hcl", /(^#[\da-f]{6}$)/],
				["ecl", /^(amb|blu|brn|gry|grn|hzl|oth)$/],
				["pid", /(^\d{9}$)/]
			].every(([field, re, test = x => x]) =>
				test.apply(0,
					re.exec([...doc.matchAll(/(\S*?):(\S*)/g)]
					.find(x => x[1] == field)
					?.[2])?.slice(1))))
		.length
}

function day5_1() {
	return parseInt(Math.max(...input(5).map(l =>
		l.replace(/./g, c => ({F: 0, B: 1, L: 0, R: 1})[c]))), 2)
}

function day5_2() {
	let
		list =
			input(5)
			.map(l => l.replace(/./g, c => ({F: 0, B: 1, L: 0, R: 1})[c]))
			.sort()
			.map(ID => parseInt(ID, 2)),
		m
	while (m = list.length >> 1)
		list.splice(m * (list[m] > list[0] + m), m)
	return list[0] + 1
}

function day6_1() {
	return input(6, "\n\n")
		.map(group => new Set(group.split(/\n?/)).size)
		.reduce((a, b) => a + b, 0)
}

function day6_2() {
	return input(6, "\n\n")
		.map(group => group
			.split("\n")
			.reduce((a, x) => [...x].filter(e => a.includes(e))))
		.reduce((a, b) => a + b.length, 0)
}

function day7_1() {
	const graph = new Map
	for (const l of input(7)) {
		const [[u], ...succs] = l.matchAll(/(^|\d )(\S* \S*)/g)
		for (const [,, v] of succs)
			graph.set(v, (graph.get(v) || new Set).add(u))
	}
	let n = -1
	function dfs(colour) {
		const v = graph.get(colour)
		if (v) {
			if (!v.visited) {
				n++
				v.visited = true
				for (const e of v) dfs(e)
			}
		} else {
			n++
			graph.set(colour, {visited: true})
		}
	}
	dfs("shiny gold")
	return n
}

function day7_2() {
	const graph = new Map
	for (const l of input(7)) {
		const [[u], ...succs] = l.matchAll(/(^|\d )(\S* \S*)/g)
		for (const [, n, v] of succs)
			graph.set(u, (graph.get(u) || new Set).add([n, v]))
	}
	function sum(colour) {
		let acc = 1
		const v = graph.get(colour)
		if (v) {
			for (const [n, u] of v)
				acc += n * sum(u)
			graph.set(v, acc)
		}
		return acc
	}
	return sum("shiny gold") - 1
}

function day8_1() {
	const code = input(8).map(l => l.split(" "))
	let
		a = 0,
		ip = 0
	do {
		code[ip][2] = true
		!{
			acc() { a += +code[ip][1] },
			jmp() { ip += +code[ip][1] - 1 }
		}?.[code[ip][0]]?.()
		ip++
	} while (!code[ip][2])
	return a
}

function day8_2() {
	const
		code = input(8).map(l => l.split(" ")),
		edit = {jmp: "nop", nop: "jmp"}
	for (const instr of code) if (instr[0] != "acc") {
		instr[0] = edit[instr[0]]
		let
			a = 0,
			ip = 0,
			run = new Set
		do {
			run.add(ip)
			!{
				acc() { a += +code[ip][1] },
				jmp() { ip += +code[ip][1] - 1 }
			}?.[code[ip][0]]?.()
			ip++
			if (ip == code.length) return a
		} while (!run.has(ip))	
		instr[0] = edit[instr[0]]
	}
}

function day9_1() {
	const
		window = [],
		sums = []
	for (let [i, n] of input(9).entries()) {
		n = +n
		if (i > 24) {
			if (!sums.flat().includes(n)) return n
			sums.shift()
			for (const row of sums) row.shift()
			window.shift()
		}
		sums.push(window.map(k => k + n))
		window.push(n)
	}
}

console.log(
	day1_1(),
	day1_2(),
	day2_1(),
	day2_2(),
	day3_1(),
	day3_2(),
	day4_1(),
	day4_2(),
	day5_1(),
	day5_2(),
	day6_1(),
	day6_2(),
	day7_1(),
	day7_2(),
	day8_1(),
	day8_2(),
	day9_1()
)