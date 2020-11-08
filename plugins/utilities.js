export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const flipP = p => (p >= 0 ? Math.abs(p - 1) : Math.abs(p) - 1)

export const flipVal = (val, min, max) =>
	Math.abs(val * (Math.sign(val) || 1) - max) + min

export const pToVal = (p, zero, hundred) => p * (hundred - zero) + zero

export function valToP(value, min, max) {
	if (min > max) {
		;[min, max] = [max, min]
		value = flipVal(value, min, max)
	}
	return (value - min) / (max - min)
}

export function valToPwMid(value, min, max, turn = pToVal(0.5, min, max)) {
	if (min > max) {
		;[min, max] = [max, min]
		turn = flipVal(turn, min, max)
		value = flipVal(value, min, max)
	}
	return value < turn
		? (value - turn) / (turn - min)
		: (value - turn) / (max - turn)
}

// function to map a value from one range to another range
export const map = (value, in_min, in_max, out_min, out_max) =>
	((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min

// Linear Interpolation Function:
// by using it, circle will move 20% of distance to cursor every frame
// higher distance -> higher speed
// lower distance -> lower speed
export const lerp = (current, goal, p) => (1 - p) * current + p * goal

export const random = (min, max, mathFunc = null) => {
	const w = Math.random() * (max - min) + min
	return mathFunc == null ? w : Math[mathFunc](w)
}

export const round = (number, toDecimal = 1) =>
	Math.round(number / (toDecimal < 0 ? 1 / toDecimal : toDecimal)) /
	(toDecimal > 0 ? 1 / toDecimal : toDecimal)

export const setCssProps = (el, ...pairs) =>
	pairs.forEach(pair => el.style.setProperty(pair[0], pair[1]))

export const animateCssClass = (el, className) => {
	el.classList.remove(className)
	void el.offsetWidth
	el.classList.add(className)
}

export const stayInRange = (value, min, max, behavior = 'loop') => {
	// behaviors:
	//		'loop' - exceeding value comes back around from the other end
	//		'bounce' - exceeding value 'bounces' of the end it exceeds
	//		'flat' - anything below min will be min, and the same with max

	if (value >= min && value <= max) return value

	if (behavior == 'loop') {
		// this
		// while (value < min || value > max) {
		// 	value =
		// 		value < min
		// 			? max - Math.abs(min - value)
		// 			: min + Math.abs(max - value)
		// }

		// or this
		const range = Math.abs(min - max),
			fullExceed = value < min ? value - min : value - max,
			quotient = Math.floor(Math.abs(fullExceed) / range),
			exceed = Math.abs(fullExceed) - quotient * range

		value = value < min ? max - exceed : min + exceed
	} else if (behavior == 'bounce') {
		const range = Math.abs(min - max),
			fullExceed = value < min ? value - min : value - max,
			quotient = Math.floor(Math.abs(fullExceed) / range),
			exceed = Math.abs(fullExceed) - quotient * range

		value =
			(value < min && quotient % 2 === 0) || quotient % 2 !== 0
				? min + exceed
				: max - exceed
	} else if (behavior == 'flat') value = value < min ? min : max

	return value
}

export const wait = time => new Promise(resolve => setTimeout(resolve, time))

export const promiseWhile = (data, condition, action) => {
	var whilst = data => {
		console.log('turn')
		return condition(data) ? action(data).then(whilst) : Promise.resolve(data)
	}
	return whilst(data)
}

export const getWindowSize = () => {
	let { body } = document,
		html = document.documentElement
	return {
		height: window.innerHeight,
		width: window.innerWidth,
		fullHeight: Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight,
		),
	}
}

export const getUrlValues = () => {
	// returns dictionary with key & value pars from URL
	const urlString = location.search.substring(1)
	if (urlString === '') return

	const dict = {}

	urlString.split('&').forEach(exp => {
		if (exp.search(/=/) == -1) {
			// if in URL there was no key value par but only one value:
			dict[exp] = null
		} else {
			const pair = exp.split('=')
			dict[pair[0]] = decodeURIComponent(pair[1])
		}
	})

	return dict
}

export const getUrlValue = key => {
	// returns true / false if key is present or its value if present
	const url = location.search.substring(1)
	if (url === '') return false

	if (url.search(/=/) == -1 && url == key) return true

	let val
	url.split('&').forEach(exp => {
		const pair = exp.split('=')
		if (pair[0] == key) val = pair[1]
	})
	return decodeURIComponent(val)

	return false
}

export function setUrlVar(key = null, value = null, dictionary = null) {
	let dict = dictionary || getUrlValues() || {},
		string = '?'

	if (key !== null) dict[key] = value

	for (const k in dict)
		string +=
			dict[k] !== null ? `${k}=${encodeURIComponent(dict[k])}&` : `${k}&`

	history.replaceState(null, null, location.pathname + string.slice(0, -1))
}

export function delUrlVal(key) {
	const dict = getUrlValues() || {}
	console.log(dict)
	for (const k in dict) {
		if (k == key) delete dict[key]
	}
	console.log(dict)

	setUrlVar(null, null, dict)
}

export const URL = {
	set: setUrlVar,
	get: getUrlValue,
	getDict: getUrlValues,
	del: delUrlVal,
}

export function isSuperset(set, subset) {
	for (const elem of subset) {
		if (!set.has(elem)) {
			return false
		}
	}
	return true
}

export function union(setA, setB) {
	const _union = new Set(setA)
	for (const elem of setB) {
		_union.add(elem)
	}
	return _union
}

export function intersection(setA, setB) {
	const _intersection = new Set()
	for (const elem of setB) {
		if (setA.has(elem)) {
			_intersection.add(elem)
		}
	}
	return _intersection
}

export function symmetricDifference(setA, setB) {
	const _difference = new Set(setA)
	for (const elem of setB) {
		if (_difference.has(elem)) {
			_difference.delete(elem)
		} else {
			_difference.add(elem)
		}
	}
	return _difference
}

export function difference(setA, setB) {
	const _difference = new Set(setA)
	for (const elem of setB) {
		_difference.delete(elem)
	}
	return _difference
}

export function addMultiEventListener(el, s, fn) {
	s.split(' ').forEach(e => el.addEventListener(e, fn, false))
}
// Usage:
// addMultiEventListener(window, 'resize scroll', () => { code... });

/* !
 * Serialize all form data into a query string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}   form The form to serialize
 * @return {String}      The serialized form data
 */
export function serialize(form) {
	// Setup our serialized data
	const serialized = []

	// Loop through each field in the form
	for (let i = 0; i < form.elements.length; i++) {
		const field = form.elements[i]

		// Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
		if (
			!field.name ||
			field.disabled ||
			field.type === 'file' ||
			field.type === 'reset' ||
			field.type === 'submit' ||
			field.type === 'button'
		)
			continue

		// If a multi-select, get all selections
		if (field.type === 'select-multiple') {
			for (let n = 0; n < field.options.length; n++) {
				if (!field.options[n].selected) continue
				serialized.push(
					`${encodeURIComponent(field.name)}=${encodeURIComponent(
						field.options[n].value,
					)}`,
				)
			}
		} else if (
			(field.type !== 'checkbox' && field.type !== 'radio') ||
			field.checked
		) {
			// Convert field data to a query string
			serialized.push(
				`${encodeURIComponent(field.name)}=${encodeURIComponent(
					field.value,
				)}`,
			)
		}
	}

	return serialized.join('&')
}
