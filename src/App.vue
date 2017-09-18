<template>
	<main class="container">
		<figure class="background">
			<canvas class="animation" />
		</figure>
		<h1 class="name">Vitor Cavalcanti</h1>
		<h2 class="position">Web Developer</h2>
		<ul class="links">
			<li class="link" v-for="(link, name) in links" :key="name">
				<a :href="link">{{ name }}</a>
			</li>
		</ul>
	</main>
</template>

<script>
	import animate from 'bubbles-animation';

	export default {
		data () {
			return {
				links: {
					'GitHub': 'https://github.com/VitorLuizC',
					'Facebook': 'https://www.facebook.com/VitorLuizC',
					'LinkedIn': 'https://www.linkedin.com/in/vitor-luiz-cavalcanti-40071991'
				}
			}
		},
		mounted () {
			animate('.animation', {
				size: [1, 250],
				quantity: 1,
				interval: 3,
				color: {
					R: 214,
					G: 255,
					B: 13,
					A: .65
				}
			});
		}
	}
</script>

<style>
	/**
	* Reset browser's default style.
	*/
	html,
	body { height: 100% }

	body {
		margin: 0;
		font-family: 'Roboto', sans-serif
	}

	/**
	* Main component.
	*/
	.container {
		position: relative;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		height: 100%
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		z-index: -1
	}

	.name,
	.position { margin: .75rem }

	.name { font-weight: 100 }

	.position { font-weight: 300 }

	.links {
		margin: 0;
		padding: 0;
		list-style: none
	}

	.link {
		margin-top: .375rem;
		text-align: center
	}
</style>
