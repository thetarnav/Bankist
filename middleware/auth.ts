import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = ({ store, redirect, $fire }) => {
	if (!$fire.auth.currentUser)
		redirect({ path: '/', query: { overlay: 'login' } })
}

export default myMiddleware
