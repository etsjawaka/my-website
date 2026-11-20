<script lang="ts">
	import { page } from '$app/state';

	const emailTarget = 'post@ione.no';

	let name = $state('');
	let replyEmail = $state('');
	let subject = $state(page.url.searchParams.get('subject') ?? '');
	let message = $state(page.url.searchParams.get('message') ?? '');

	$effect(() => {
		subject = page.url.searchParams.get('subject') ?? '';
		message = page.url.searchParams.get('message') ?? '';
	});

	function submitContactForm(event: SubmitEvent) {
		event.preventDefault();

		const body = [
			`Name: ${name.trim() || 'Not provided'}`,
			`Email: ${replyEmail.trim() || 'Not provided'}`,
			'',
			message.trim()
		].join('\n');

		const mailtoHref = `mailto:${emailTarget}?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(body)}`;
		window.location.href = mailtoHref;
	}
</script>

<svelte:head>
	<title>contact · ione</title>
</svelte:head>

<main class="page" aria-label="Contact page">
	<header>
		<h1 class="page-title">contact</h1>
		<p class="lede">Commissions, climbing walls, tools or just a question. Get in touch.</p>
	</header>

	<section>
		<h2 class="section-title">reach me</h2>
		<div class="grid">
			<article class="card">
				<h3>email</h3>
				<p><a href="mailto:{emailTarget}">{emailTarget}</a></p>
			</article>
			<article class="card">
				<h3>social</h3>
				<ul class="links">
					<li>
						<a href="https://www.youtube.com/@galaxiuschaos" target="_blank" rel="noopener noreferrer"
							>shorts · @galaxiuschaos on YouTube &#8599;</a
						>
					</li>
					<li>
						<a href="https://www.youtube.com/@raebegnirb/videos" target="_blank" rel="noopener noreferrer"
							>videos · ET SAMU on YouTube &#8599;</a
						>
					</li>
					<li>
						<a href="https://www.instagram.com/dobbel_smultring" target="_blank" rel="noopener noreferrer"
							>@dobbel_smultring on Instagram &#8599;</a
						>
					</li>
				</ul>
			</article>
			<article class="card">
				<h3>location</h3>
				<p>Sandve, Karmøy, Norway</p>
			</article>
		</div>
	</section>

	<section>
		<h2 class="section-title">send a message</h2>
		<form class="contact-form" onsubmit={submitContactForm}>
			<label>
				Your name
				<input type="text" name="name" bind:value={name} autocomplete="name" />
			</label>
			<label>
				Your email
				<input type="email" name="replyEmail" bind:value={replyEmail} autocomplete="email" />
			</label>
			<label class="wide">
				Subject
				<input type="text" name="subject" bind:value={subject} required />
			</label>
			<label class="wide">
				Message
				<textarea name="body" rows="6" bind:value={message} required></textarea>
			</label>
			<button class="button" type="submit">send to {emailTarget}</button>
			<p class="note">This opens your own email program with the message filled in.</p>
		</form>
	</section>
</main>

<style>
	.links {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.4rem;
	}

	.contact-form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.9rem 1rem;
		max-width: 760px;
	}

	label {
		display: grid;
		gap: 0.3rem;
		font-size: 0.9rem;
		font-weight: 700;
	}

	.wide {
		grid-column: 1 / -1;
	}

	input,
	textarea {
		width: 100%;
		font: inherit;
		font-weight: 400;
		color: var(--ink);
		padding: 0.6rem 0.7rem;
		border: var(--line);
		border-radius: 0;
		background: var(--paper);
	}

	input:focus,
	textarea:focus {
		outline: 2px solid var(--ink);
		outline-offset: 1px;
	}

	textarea {
		resize: vertical;
	}

	.note {
		grid-column: 1 / -1;
		margin: 0;
		font-size: 0.85rem;
		color: var(--ink-soft);
	}

	@media (max-width: 600px) {
		.contact-form {
			grid-template-columns: 1fr;
		}
	}
</style>
