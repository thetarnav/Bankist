import Vue from 'vue'
const debounce = require('lodash.debounce')

Vue.directive('scroll-to', {
	inserted(el: HTMLElement, binding): void {
		const target: string | number = binding?.value ?? el.hash
		if (target === undefined) return

		let targetEl: HTMLElement | null, top: number

		if (typeof target === 'string') {
			targetEl = document.querySelector(target)
			if (!targetEl) return
		} else {
			top = target
		}

		el.addEventListener('click', e => {
			e.preventDefault()

			top = top ?? targetEl?.offsetTop ?? 0

			window.scrollTo({
				top,
				behavior: 'smooth',
			})
		})
	},
})

Vue.directive('class-in-view', {
	inserted(el, binding) {
		const className: string = binding.value
		if (!className || typeof className !== 'string') return

		const method = binding.modifiers.remove ? 'remove' : 'add',
			debouncedHandler = debounce(handler, 100)

		window.addEventListener('scroll', debouncedHandler)
		handler()

		function handler() {
			if (window.scrollY + window.innerHeight > el.offsetTop) {
				el.classList[method](className)
				window.removeEventListener('scroll', debouncedHandler)
			}
		}
	},
})
