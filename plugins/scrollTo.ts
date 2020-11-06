import Vue from 'vue'

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
