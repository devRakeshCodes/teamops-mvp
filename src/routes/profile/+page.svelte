<script>
	import Skeleton from '$lib/components/Skeleton.svelte';

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
		<div class="hero hero-skeleton">
			<Skeleton />
			<Skeleton />
		</div>

		<section class="panel">
			<div class="panel-head">
				<h2>Account Details</h2>
			</div>
			<div class="surface">
				<Skeleton />
				<Skeleton />
				<Skeleton />
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
						<span class="pill-dot"></span>
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

	/* HERO like the mock */
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

	/* Status pill (matches dashboard style) */
	.pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 10px;
		border-radius: 999px;
		font-size: 0.85rem;
		font-weight: 800;
		color: #fff;
		background: rgba(255, 255, 255, 0.16);
		border: 1px solid rgba(255, 255, 255, 0.18);
	}

	.pill.good {
		background: var(--color-success);
	}
	.pill.warn {
		background: var(--color-warning);
	}
	.pill.bad {
		background: var(--color-error);
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

	/* inner surface like mock */
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
		.page {
			gap: var(--spacing-sm);
		}
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
