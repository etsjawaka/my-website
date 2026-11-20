<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import logo from '$lib/assets/logo-tt-256.png';
	import { page } from '$app/stores';
	import { PLANET_NAV_ITEMS } from '$lib/planet/navigation';

	let { children } = $props();
</script>

<svelte:head>
	<title>ione · Espen Tangen Samuelsen</title>
	<meta
		name="description"
		content="Espen Tangen Samuelsen – artist, blacksmith and climbing wall builder in Sandve, Karmøy. Metal art, handforged tools, climbing wall building, inspection and route setting."
	/>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#ffffff" />
	<meta name="color-scheme" content="light" />
</svelte:head>

{#if $page.url.pathname !== '/'}
	<header class="site-header">
		<a class="home-link" href="/" aria-label="Back to the main page">
			<img src={logo} alt="" width="44" height="44" />
			<span>ione</span>
		</a>
		<nav aria-label="Main menu">
			{#each PLANET_NAV_ITEMS as item (item.href)}
				<a href={item.href} class:current={$page.url.pathname.startsWith(item.href)}
					>{item.label.toLowerCase()}</a
				>
			{/each}
			<a href="/blog" class:current={$page.url.pathname.startsWith('/blog')}>blog</a>
		</nav>
	</header>
{/if}

{@render children()}

<style>
	/* ---------- shared look: white paper, black ink, typewriter font ---------- */
	:global(:root) {
		--paper: #ffffff;
		--ink: #111111;
		--ink-soft: #555555;
		--line: 1px solid #111111;
		--line-soft: 1px solid #d6d6d6;
		color-scheme: light;
	}

	:global(html) {
		background: var(--paper);
	}

	:global(body) {
		margin: 0;
		background: var(--paper);
		color: var(--ink);
		font-family: 'Courier New', Courier, monospace;
		line-height: 1.5;
		overflow-x: hidden;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(img) {
		max-width: 100%;
	}

	/* Page building blocks used by all sub pages */
	:global(.page) {
		width: min(960px, 100%);
		margin: 0 auto;
		padding: 2.5rem 1.25rem 4rem;
		display: grid;
		gap: 2rem;
		animation: page-in 380ms ease both;
	}

	:global(.page-title) {
		margin: 0;
		font-size: clamp(3rem, 11vw, 7.5rem);
		font-weight: 700;
		line-height: 0.9;
		letter-spacing: -0.04em;
		text-transform: lowercase;
	}

	:global(.lede) {
		margin: 0.4rem 0 0;
		max-width: 62ch;
		font-size: clamp(1rem, 1.6vw, 1.15rem);
	}

	:global(.section-title) {
		margin: 0 0 0.9rem;
		padding-bottom: 0.4rem;
		border-bottom: var(--line);
		font-size: 0.95rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	:global(.grid) {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1rem;
	}

	:global(.card) {
		padding: 1rem 1.1rem;
		border: var(--line);
		background: var(--paper);
	}

	:global(.card h3) {
		margin: 0 0 0.4rem;
		font-size: 1rem;
		text-transform: lowercase;
	}

	:global(.card p) {
		margin: 0;
	}

	:global(.list) {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	:global(.list li) {
		display: grid;
		grid-template-columns: 7.5rem 1fr;
		gap: 1rem;
		padding: 0.55rem 0;
		border-bottom: var(--line-soft);
	}

	:global(.list .year) {
		font-weight: 700;
	}

	:global(.page a) {
		color: var(--ink);
		text-decoration: underline;
		text-underline-offset: 0.2em;
		text-decoration-thickness: 1px;
	}

	:global(.button) {
		display: inline-block;
		width: fit-content;
		padding: 0.5rem 0.95rem;
		border: var(--line);
		background: var(--ink);
		color: var(--paper) !important;
		font: inherit;
		font-weight: 700;
		text-decoration: none !important;
		cursor: pointer;
		transition:
			background 150ms ease,
			color 150ms ease;
	}

	:global(.button:hover),
	:global(.button:focus-visible) {
		background: var(--paper);
		color: var(--ink) !important;
	}

	@keyframes -global-page-in {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	@media (max-width: 560px) {
		:global(.list li) {
			grid-template-columns: 1fr;
			gap: 0.1rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.page) {
			animation: none;
		}
	}

	/* ---------- header on sub pages ---------- */
	.site-header {
		position: sticky;
		top: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.7rem 1.25rem;
		background: rgba(255, 255, 255, 0.94);
		border-bottom: var(--line);
		backdrop-filter: blur(4px);
	}

	.home-link {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		color: var(--ink);
		text-decoration: none;
		font-weight: 700;
		font-size: 1.1rem;
		letter-spacing: 0.04em;
	}

	.home-link img {
		width: 44px;
		height: 44px;
		transition: transform 600ms ease;
	}

	.home-link:hover img,
	.home-link:focus-visible img {
		transform: rotate(180deg);
	}

	.site-header nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 0.3rem 1.2rem;
	}

	.site-header nav a {
		color: var(--ink);
		text-decoration: none;
		border-bottom: 1px solid transparent;
	}

	.site-header nav a:hover,
	.site-header nav a:focus-visible,
	.site-header nav a.current {
		border-bottom-color: var(--ink);
	}

	@media (max-width: 680px) {
		.site-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.4rem;
			padding: 0.6rem 1rem;
		}

		.home-link img {
			width: 36px;
			height: 36px;
		}

		.site-header nav {
			justify-content: flex-start;
			gap: 0.2rem 1rem;
			font-size: 0.95rem;
		}
	}
</style>
