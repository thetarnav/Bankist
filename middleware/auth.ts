import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = ({ store, redirect }) => {
	if (!store.state.authUser)
		redirect({ path: '/', query: { overlay: 'login' } })
}

export default myMiddleware
