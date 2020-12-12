function day12_2n() {
	let
		pos = [0n, 0n],
		waypoint = [10n, 1n]
	for (let [action, ...value] of input(12)) {
		value = value.join("")
		function lin(u, v) {
			return u.map((c, i) => c + BigInt(value) * v[i])
		}
		for (const [i, type] of ["ENWS", "LR", "F"].entries()) {
			const j = type.indexOf(action)
			if (j >= 0)
				if (i < 2) waypoint = [
						() => lin(waypoint, rot([1n, 0n], j)),
						() => rot(waypoint, (-1) ** j * value / 90 + 4)
					][i]()
				else pos = lin(pos, waypoint)
		}
	}
	function abs(n) {
		return n < 0 ? -n : n
	}
	return abs(pos[0]) + abs(pos[1])
}