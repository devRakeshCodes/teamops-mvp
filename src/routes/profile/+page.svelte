<script>
	import Skeleton from '$lib/components/Skeleton.svelte';

	export let data;
	const { user } = data;
</script>

{#if !user}
	<Skeleton />
{:else}
	<section class="profile">
		<div class="header">
			<img src={user.avatar} alt="avatar" class="avatar" />
			<div>
				<h1>{user.name}</h1>
				<p>{user.role}</p>
				<span class="status">{user.status}</span>
			</div>
		</div>

		<div class="details">
			<p><strong>Email:</strong> {user.email}</p>
			<p><strong>Team:</strong> {user.team}</p>
			<p><strong>Plan:</strong> {user.plan}</p>
			<p><strong>Last Active:</strong> {new Date(user.lastActive).toLocaleString()}</p>
		</div>

		<div class="actions">
            <!-- Placeholder actions -->
			<button class="primary" disabled>Manage Account</button>
			<button class="secondary" disabled>Preferences</button>
		</div>
	</section>
{/if}

<style>
	.profile {
		max-width: 600px;
		margin: 0 auto;
		padding: 1rem 3rem;
		background: #fff;
		padding: var(--spacing-lg);
		border-radius: var(--radius-md);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.header {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-lg);
	}

	.avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}

	.status {
		background: #3c8e98;
		color: white;
		font-size: 0.8rem;
		padding: 2px 6px;
		border-radius: var(--radius-sm);
	}

	.details p {
		margin: var(--spacing-xs) 0;
	}

	.actions button {
		margin-right: var(--spacing-sm);
		padding: 8px 16px;
		border: none;
		border-radius: var(--radius-sm);
		background: var(--color-primary);
		color: #fff;
	}

	.actions .secondary {
		background: var(--color-secondary);
	}
	.actions .primary:hover {
		background: var(--color-primary-hover);
	}
	.actions .secondary:hover {
		background: var(--color-secondary-hover);
	}
	.actions button:last-child {
		margin-right: 0;
	}
</style>
