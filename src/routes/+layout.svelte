<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<title>ione:forge</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if page.url.pathname !== '/'}
	<header class="site-header">
		<a href="/" class="site-brand">
			<img src="/logo.jpg" alt="ione:forge logo" class="site-logo" />
			<div class="site-title">ione:forge</div>
		</a>
		<nav class="site-nav">
			<a href="/">Home</a>
			<a href="/about">About</a>
			<a href="/art-cv">CV</a>
			<a href="/blog">Blog</a>
			<a href="/contact">Contact</a>
		</nav>
	</header>
{/if}

{@render children()}

<style>
	.site-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		flex-wrap: wrap;
		padding: 0.75rem 1rem;
		background: var(--bg-color);
		border-bottom: 1px solid #b7b2a6;
		color: var(--text-color);
	}

	.site-brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		color: var(--text-color);
		cursor: pointer;
	}

	.site-brand:hover {
		opacity: 0.8;
	}

	.site-logo {
		width: 40px;
		height: 40px;
		object-fit: contain;
		border-radius: 6px;
	}

	.site-nav {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: flex-end;
	}

	.site-nav a {
		color: var(--text-color);
		text-decoration: none;
		padding: 0.5rem;
		border-radius: 4px;
		transition: background 0.2s;
	}

	.site-nav a:hover {
		background: #d4d0c5;
	}

	.site-title {
		font-weight: 700;
		font-size: 1.125rem;
	}

	:global(:root) {
		--bg-color: #e8e8e5;
		--text-color: #8a795d;
		--accent: #8a795d;
		color-scheme: light;
	}

	:global(body) {
		margin: 0;
		background: var(--bg-color);
		color: var(--text-color);
		overflow-x: hidden;
	}

	:global(*) {
		box-sizing: border-box;
	}

	@media (max-width: 860px) {
		.site-header {
			align-items: flex-start;
		}

		.site-nav {
			width: 100%;
			justify-content: flex-start;
			gap: 0.5rem;
		}

		.site-nav a {
			padding: 0.45rem 0.55rem;
		}
	}

	@media (max-width: 520px) {
		.site-title {
			font-size: 1rem;
		}

		.site-logo {
			width: 34px;
			height: 34px;
		}
	}
</style>
