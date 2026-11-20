<svelte:head>
	<title>about · ione</title>
</svelte:head>

<main class="page" aria-label="About page">
	<header>
		<h1 class="page-title">about</h1>
		<p class="lede">Espen Tangen Samuelsen. Artist working in metal, paint and digital form.</p>
	</header>

	<section>
		<h2 class="section-title">disciplines</h2>
		<ul class="disciplines">
			<li>
				<h3>blacksmithing</h3>
				<p>forging · tools · objects</p>
			</li>
			<li>
				<h3>metalwork</h3>
				<p>welding · casting · jewellery</p>
			</li>
			<li>
				<h3>sculpture</h3>
				<p>metal · mixed materials</p>
			</li>
			<li>
				<h3>painting</h3>
				<p>oil · canvas</p>
			</li>
			<li>
				<h3>drawing</h3>
				<p>anatomy · sketching · studies</p>
			</li>
			<li>
				<h3>digital form</h3>
				<p>3D modelling · CNC machining · 3D printing</p>
			</li>
		</ul>
	</section>

	<section>
		<h2 class="section-title">elsewhere</h2>
		<ul class="links">
			<li>
				<a href="https://www.thingiverse.com/espen/designs" target="_blank" rel="noopener noreferrer"
					>3D designs · Thingiverse &#8599;</a
				>
			</li>
			<li>
				<a href="https://www.youtube.com/@raebegnirb/videos" target="_blank" rel="noopener noreferrer"
					>videos · ET SAMU on YouTube &#8599;</a
				>
			</li>
			<li>
				<a href="https://www.youtube.com/@galaxiuschaos" target="_blank" rel="noopener noreferrer"
					>shorts · @galaxiuschaos on YouTube &#8599;</a
				>
			</li>
		</ul>
	</section>

	<p class="more"><a href="/art">art</a> · <a href="/art-cv">cv</a></p>
</main>

<style>
	.disciplines {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		border-top: var(--line);
		border-left: var(--line);
	}

	.disciplines li {
		padding: 1.1rem 1.2rem 1.3rem;
		border-right: var(--line);
		border-bottom: var(--line);
	}

	.disciplines h3 {
		margin: 0 0 0.3rem;
		font-size: 1.25rem;
		text-transform: lowercase;
	}

	.disciplines p {
		margin: 0;
		color: var(--ink-soft);
	}

	.links {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.5rem;
	}

	.more {
		margin: 0;
	}
</style>
