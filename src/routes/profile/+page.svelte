<script>
	const { data } = $props();
	const user = $derived.by(() => data?.user);

	const statusClass = (status) => {
		const s = status?.toLowerCase();
		if (s === 'suspended') return 'bad';
		if (s === 'trial') return 'warn';
		return 'good';
	};

	const formatDateTime = (value) => {
		const d = new Date(value);

		const day = d.getDate();
		const month = d.toLocaleString(undefined, { month: 'short' });
		const year = d.getFullYear();

		const time = d.toLocaleTimeString(undefined, {
			hour: 'numeric',
			minute: '2-digit'
		});

		return `${day} ${month} ${year}, ${time}`;
	};
</script>

{#if !user}
	<section class="page">
		<section class="hero hero-loading" aria-label="Loading profile">
			<div class="hero-main">
				<div class="avatar sk sk-circle"></div>

				<div class="hero-text">
					<div class="sk sk-line sk-title"></div>
					<div class="sk sk-line sk-subtitle"></div>
					<div class="sk sk-pill"></div>
				</div>
			</div>

			<div class="hero-actions">
				<div class="sk sk-btn"></div>
				<div class="sk sk-btn sk-btn-secondary"></div>
			</div>

			<div class="hero-top">
				<div class="sk sk-logout"></div>
			</div>
		</section>

		<section class="panel">
			<div class="panel-head">
				<h2>Account Details</h2>
				<p class="muted">Key information about your account</p>
			</div>

			<div class="surface">
				<div class="kv">
					<span class="k"><span class="sk sk-line"></span></span>
					<span class="v"><span class="sk sk-line"></span></span>
				</div>
				<div class="kv">
					<span class="k"><span class="sk sk-line"></span></span>
					<span class="v"><span class="sk sk-line"></span></span>
				</div>
				<div class="kv">
					<span class="k"><span class="sk sk-line"></span></span>
					<span class="v"><span class="sk sk-line"></span></span>
				</div>
				<div class="kv">
					<span class="k"><span class="sk sk-line"></span></span>
					<span class="v"><span class="sk sk-line"></span></span>
				</div>
			</div>
		</section>
	</section>
{:else}
	<section class="page">
		<!-- HERO (matches mock) -->
		<section class="hero">
			<div class="hero-main">
				<img class="avatar" src={user.avatar} alt="Avatar" />

				<div class="hero-text">
					<h1>{user.name}</h1>
					<p class="role">{user.role}</p>

					<span class={'pill ' + statusClass(user.status)}>
						{#if statusClass(user.status) === 'good'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 16 16"
								fill="none"
							>
								<path
									d="M8.00016 14.6663C11.6668 14.6663 14.6668 11.6663 14.6668 7.99967C14.6668 4.33301 11.6668 1.33301 8.00016 1.33301C4.3335 1.33301 1.3335 4.33301 1.3335 7.99967C1.3335 11.6663 4.3335 14.6663 8.00016 14.6663Z"
									fill="#2F9A47"
									stroke="#2F9A47"
									stroke-width="1.2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M5.1665 7.99995L7.05317 9.88661L10.8332 6.11328"
									stroke="#fff"
									stroke-width="1.2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						{:else if statusClass(user.status) === 'warn'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 16 16"
								fill="none"
							>
								<path
									d="M8.00016 14.6663C11.6668 14.6663 14.6668 11.6663 14.6668 7.99967C14.6668 4.33301 11.6668 1.33301 8.00016 1.33301C4.3335 1.33301 1.3335 4.33301 1.3335 7.99967C1.3335 11.6663 4.3335 14.6663 8.00016 14.6663Z"
									fill="#F5A623"
									stroke="#F5A623"
									stroke-width="1.2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>

								<!-- Exclamation mark -->
								<path d="M8 4.5V8.5" stroke="#fff" stroke-width="1.2" stroke-linecap="round" />
								<circle cx="8" cy="10.8" r="0.7" fill="#fff" />
							</svg>
						{:else if statusClass(user.status) === 'bad'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 16 16"
								fill="none"
							>
								<path
									d="M8.00016 14.6663C11.6668 14.6663 14.6668 11.6663 14.6668 7.99967C14.6668 4.33301 11.6668 1.33301 8.00016 1.33301C4.3335 1.33301 1.3335 4.33301 1.3335 7.99967C1.3335 11.6663 4.3335 14.6663 8.00016 14.6663Z"
									fill="#D64545"
									stroke="#D64545"
									stroke-width="1.2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>

								<!-- X -->
								<path
									d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5"
									stroke="#fff"
									stroke-width="1.2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						{/if}
						{user.status}
					</span>
				</div>
			</div>

			<div class="hero-actions">
				<button class="btn primary" type="button">Manage Account</button>
				<button class="btn secondary" type="button">Preferences</button>
			</div>
			<div class="hero-top">
				<button class="btn ghost logout" type="button">Logout</button>
			</div>
		</section>

		<!-- DETAILS CARD -->
		<section class="panel">
			<div class="panel-head">
				<h2>Account Details</h2>
				<p class="muted">Key information about your account</p>
			</div>

			<div class="surface">
				<div class="kv">
					<span class="k">Email</span>
					<span class="v">{user.email}</span>
				</div>
				<div class="kv">
					<span class="k">Team</span>
					<span class="v">{user.team}</span>
				</div>
				<div class="kv">
					<span class="k">Plan</span>
					<span class="v">{user.plan}</span>
				</div>
				<div class="kv">
					<span class="k">Last Active</span>
					<span class="v">{formatDateTime(user.lastActive)}</span>
				</div>
			</div>
		</section>
	</section>
{/if}

<style>
	.page {
		display: grid;
		gap: var(--spacing-md);
		padding: 0 var(--spacing-md);
		max-width: 1200px;
		margin: 0 auto;
	}
	.hero-loading {
		background: rgba(17, 24, 39, 0.04);
		color: transparent;
		box-shadow: none;
	}

	/* Reusable skeleton block */
	.sk {
		display: inline-block;
		border-radius: var(--radius-sm);
		background: linear-gradient(90deg, #e9ecef 25%, #f5f5f5 37%, #e9ecef 63%);
		background-size: 400px 100%;
		animation: shimmer 1.2s infinite;
	}

	.sk-circle {
		width: 84px;
		height: 84px;
		border-radius: 999px;
	}

	.sk-line {
		height: 14px;
		width: 100%;
	}

	.sk-title {
		height: 18px;
		width: 220px;
		margin-bottom: 10px;
	}

	.sk-subtitle {
		width: 160px;
		opacity: 0.9;
		margin-bottom: 12px;
	}

	.sk-pill {
		height: 22px;
		width: 90px;
		border-radius: 999px;
	}

	.sk-btn {
		height: 38px;
		width: 150px;
		border-radius: var(--radius-sm);
	}

	.sk-btn-secondary {
		width: 120px;
		opacity: 0.9;
	}

	.sk-logout {
		height: 16px;
		width: 60px;
		border-radius: var(--radius-sm);
	}

	@keyframes shimmer {
		0% {
			background-position: -400px 0;
		}
		100% {
			background-position: 400px 0;
		}
	}

	.hero {
		background: linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
		color: #fff;
		border-radius: var(--radius-lg);
		padding: var(--spacing-xl);
		display: grid;
		gap: var(--spacing-lg);
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
	}

	.hero-skeleton {
		background: rgba(17, 24, 39, 0.04);
	}

	.hero-main {
		display: flex;
		gap: var(--spacing-lg);
		align-items: center;
	}
	.hero-text {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.avatar {
		width: 84px;
		height: 84px;
		border-radius: 999px;
		border: 3px solid rgba(255, 255, 255, 0.25);
		object-fit: cover;
		background: rgba(255, 255, 255, 0.1);
	}

	h1 {
		margin: 0;
		font-size: 1.6rem;
		letter-spacing: 0.2px;
	}

	.role {
		margin: 6px 0 10px;
		color: rgba(255, 255, 255, 0.75);
		font-weight: 600;
	}

	/* Status pill */
	.pill {
		width: fit-content;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 10px 4px 6px;
		border-radius: 999px;
		font-size: 0.85rem;
		font-weight: 800;
		background: rgba(255, 255, 255, 0.16);
		border: 1px solid rgba(255, 255, 255, 0.18);
	}

	.pill.good {
		background: var(--color-success-light);
		color: var(--color-success);
	}
	.pill.warn {
		background: var(--color-warning-light);
		color: var(--color-warning);
	}
	.pill.bad {
		background: var(--color-error-light);
		color: var(--color-error);
	}

	.pill-dot {
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.9);
	}

	/* Buttons */
	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}
	.hero {
		position: relative;
		padding-top: calc(var(--spacing-xl) + 8px); /* reserves space for logout */
	}

	/* Top-right logout */
	.hero-top {
		position: absolute;
		top: var(--spacing-md);
		right: var(--spacing-md);
	}

	.logout {
		color: rgba(255, 255, 255, 0.9);
	}

	.logout:hover {
		color: #fff;
	}

	.btn {
		border: none;
		border-radius: var(--radius-sm);
		padding: 10px 14px;
		font-weight: 800;
		cursor: pointer;
	}

	.btn.primary {
		background: #fff;
		color: var(--color-primary);
	}

	.btn.primary:hover {
		background: rgba(255, 255, 255, 0.92);
	}

	.btn.secondary {
		background: rgba(255, 255, 255, 0.16);
		color: #fff;
		border: 1px solid rgba(255, 255, 255, 0.18);
	}

	.btn.secondary:hover {
		background: rgba(255, 255, 255, 0.22);
	}

	.btn.ghost {
		background: transparent;
		color: rgba(255, 255, 255, 0.85);
		text-decoration: underline;
		padding: 10px 8px;
	}

	.btn.ghost:hover {
		color: #fff;
	}

	/* DETAILS CARD */
	.panel {
		background: var(--color-surface);
		border-radius: var(--radius-lg);
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
	}

	.panel-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		padding: var(--spacing-md);
		gap: var(--spacing-md);
		flex-wrap: wrap;
	}

	h2 {
		margin: 0;
		font-size: 1.1rem;
		color: var(--color-text);
	}

	.muted {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.85rem;
	}

	.surface {
		background: rgba(17, 24, 39, 0.04);
		border-radius: var(--radius-sm);
		display: grid;
	}

	.kv {
		display: grid;
		grid-template-columns: 140px 1fr;
		gap: var(--spacing-md);
		padding: var(--spacing-md);
	}

	.kv:not(:last-child) {
		border-bottom: 1px solid rgba(17, 24, 39, 0.06);
	}

	.k {
		color: var(--color-muted);
		font-weight: 700;
		font-size: 0.9rem;
	}

	.v {
		color: var(--color-text);
		font-weight: 700;
	}

	/* Responsive */
	@media (max-width: 640px) {
		.hero-top {
			position: static;
			display: flex;
			justify-content: flex-end;
		}
		.hero {
			padding: var(--spacing-md);
		}
		.panel-head {
			display: flex;
			flex-direction: column;
			padding: var(--spacing-sm);
			gap: var(--spacing-xs);
		}
		.kv {
			grid-template-columns: 1fr;
			padding: var(--spacing-sm);
			gap: var(--spacing-sm);
		}
	}
</style>
