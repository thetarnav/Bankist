<template>
	<div class="operation operation--close">
		<h2>Close account</h2>
		<form class="form form--close">
			<input type="text" class="form__input form__input--user" />
			<input
				type="password"
				maxlength="6"
				class="form__input form__input--pin"
			/>
			<button class="form__btn form__btn--close">&rarr;</button>
			<label class="form__label">Confirm user</label>
			<label class="form__label">Confirm PIN</label>
		</form>
	</div>
</template>
