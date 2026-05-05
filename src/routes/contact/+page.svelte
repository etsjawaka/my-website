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

<main aria-label="Contact page">
	<section class="page-panel">
		<h1>contact</h1>

		<div class="card-grid">
			<article class="card">
				<h2>email</h2>
				<p><a href="mailto:post@ione.no">post@ione.no</a></p>
			</article>
			<article class="card">
				<h2>social</h2>
				<p>
					YouTube:
					<a href="https://www.youtube.com/@galaxiuschaos" target="_blank" rel="noreferrer"
						>@galaxiuschaos</a
					>
				</p>
				<p>
					Instagram:
					<a href="https://www.instagram.com/dobbel_smultring" target="_blank" rel="noreferrer"
						>@dobbel_smultring</a
					>
				</p>
			</article>
			<article class="card">
				<h2>location</h2>
				<p>Sandve, Norway</p>
			</article>
			<article class="card contact-form-card">
				<h2>buy request</h2>
				<form class="contact-form" onsubmit={submitContactForm}>
					<label>
						Your name
						<input type="text" name="name" bind:value={name} autocomplete="name" />
					</label>
					<label>
						Your email
						<input type="email" name="replyEmail" bind:value={replyEmail} autocomplete="email" />
					</label>
					<label>
						Subject
						<input type="text" name="subject" bind:value={subject} required />
					</label>
					<label>
						Message
						<textarea name="body" rows="5" bind:value={message} required></textarea>
					</label>
					<button type="submit">Send to post@ione.no</button>
				</form>
			</article>
		</div>
	</section>
</main>

<style>
	main {
		min-height: 100vh;
		background: var(--bg-color, #e8e8e5);
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 1.5rem;
		padding: clamp(4.8rem, 8vw, 5.8rem) 1rem 2rem;
	}

	.page-panel {
		width: min(920px, 100%);
		justify-self: center;
		display: grid;
		gap: 0.9rem;
		padding: clamp(1rem, 2.8vw, 1.35rem);
		border: 1px solid rgba(117, 98, 68, 0.35);
		border-radius: 18px;
		background: rgba(255, 255, 255, 0.45);
		box-shadow: 0 10px 24px rgba(44, 37, 25, 0.08);
	}

	h1 {
		margin: 0;
		font-size: clamp(1.35rem, 3vw, 1.95rem);
		font-weight: 600;
		letter-spacing: 0.02em;
		text-transform: lowercase;
		color: rgba(88, 73, 46, 0.96);
	}

	p {
		margin: 0;
		line-height: 1.5;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.8rem;
	}

	.card {
		padding: 0.8rem;
		border-radius: 12px;
		border: 1px solid rgba(117, 98, 68, 0.25);
		background: rgba(248, 246, 241, 0.7);
		opacity: 0;
		transform: translateY(10px);
		animation: card-rise 420ms ease forwards;
	}

	.card:nth-child(1) { animation-delay: 60ms; }
	.card:nth-child(2) { animation-delay: 130ms; }
	.card:nth-child(3) { animation-delay: 200ms; }
	.card:nth-child(4) { animation-delay: 270ms; }

	.contact-form-card {
		grid-column: 1 / -1;
	}

	h2 {
		margin: 0 0 0.3rem;
		font-size: 0.95rem;
		text-transform: lowercase;
		letter-spacing: 0.02em;
	}

	a {
		color: rgba(88, 73, 46, 0.96);
		text-decoration: none;
		border-bottom: 1px solid rgba(88, 73, 46, 0.36);
		transition: border-color 180ms ease, color 180ms ease;
	}

	a:hover {
		color: rgba(63, 51, 32, 0.98);
		border-color: rgba(63, 51, 32, 0.7);
	}

	.contact-form {
		display: grid;
		gap: 0.6rem;
	}

	label {
		display: grid;
		gap: 0.3rem;
		font-size: 0.9rem;
	}

	input,
	textarea {
		width: 100%;
		font: inherit;
		color: rgba(44, 37, 25, 0.95);
		padding: 0.55rem 0.65rem;
		border-radius: 10px;
		border: 1px solid rgba(117, 98, 68, 0.35);
		background: rgba(255, 255, 255, 0.75);
	}

	textarea {
		resize: vertical;
	}

	button {
		width: fit-content;
		padding: 0.48rem 0.75rem;
		border-radius: 999px;
		border: 1px solid rgba(88, 73, 46, 0.5);
		background: rgba(88, 73, 46, 0.1);
		color: rgba(63, 51, 32, 0.98);
		font: inherit;
		font-weight: 700;
		cursor: pointer;
	}

	button:hover {
		background: rgba(88, 73, 46, 0.2);
	}

	@keyframes card-rise {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card {
			animation: none;
			opacity: 1;
			transform: none;
		}
	}

	@media (max-width: 760px) {
		main {
			padding-top: 4.3rem;
			gap: 1.25rem;
		}

		.page-panel {
			padding: 0.95rem;
		}

		.card-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
