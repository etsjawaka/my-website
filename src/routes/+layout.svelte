<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>ione:forge</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="site-header">
	<a href="/" class="site-brand">
		<img src="/logo.jpg" alt="ione:forge logo" class="site-logo" />
		<div class="site-title">ione:forge</div>
	</a>
	<nav class="site-nav">
		<a href="/">Home</a>
		<a href="/products">Products</a>
		<a href="https://www.youtube.com/@galaxiuschaos" target="_blank" rel="noopener noreferrer">YouTube @galaxiuschaos</a>
		<a href="mailto:post@ione.no">Contact</a>
	</nav>
</header>

{@render children()}

<style>
	.site-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		background: #0a0a0f;
		border-bottom: 1px solid #222;
		color: #e6e6e6;
	}

	.site-brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		color: #e6e6e6;
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
	}

	.site-nav a {
		color: #e6e6e6;
		text-decoration: none;
		padding: 0.5rem;
		border-radius: 4px;
		transition: background 0.2s;
	}

	.site-nav a:hover {
		background: #333;
	}

	.site-title {
		font-weight: 700;
		font-size: 1.125rem;
	}

	:global(:root) {
		--accent: #00eaff;
	}

	:global(body) {
		background: radial-gradient(circle at top, #0a0a0f, #000);
		color: #e6e6e6;
	}
</style>
