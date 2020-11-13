import { Middleware } from '@nuxt/types'

const myPlugin: Middleware = ({ route, app }) => {
	const { name } = route,
		{ head } = app
	if (
		head !== undefined &&
		'htmlAttrs' in head &&
		head.htmlAttrs !== undefined &&
		typeof name === 'string'
	)
		head.htmlAttrs.class = name
}

export default myPlugin
