<script>
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/tokens.css';
	import '$lib/styles/global.css';
	import { page } from '$app/stores';

	let { children } = $props();

	const nav = [
		{ href: '/dashboard', label: 'Dashboard' },
		{ href: '/profile', label: 'Profile' }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="topbar">
	<div class="brand">
		<span class="logo">TeamOps</span>
	</div>

	<nav class="nav" aria-label="Primary navigation">
		{#each nav as item (item.href)}
			<a
				href={item.href}
				class={'link ' + ($page.url.pathname.startsWith(item.href) ? 'active' : '')}>{item.label}</a
			>
		{/each}
	</nav>

	<div class="actions" aria-label="Topbar actions">
		<button class="icon-btn" type="button" aria-label="Notifications" title="Notifications">
			<!-- Notification icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-bell-icon lucide-bell"
				><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path
					d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
				/></svg
			>
		</button>

		<button class="icon-btn" type="button" aria-label="Settings" title="Settings">
			<!-- Settings icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-settings-icon lucide-settings"
				><path
					d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"
				/><circle cx="12" cy="12" r="3" /></svg
			>
		</button>
	</div>
</header>
<main class="app">
	{@render children()}
</main>

<nav class="bottom-nav" aria-label="Bottom navigation">
	<a
		href="/dashboard"
		class={'bn-link ' + ($page.url.pathname.startsWith('/dashboard') ? 'active' : '')}
	>
		<span class="bn-icon">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-house-icon lucide-house"
				><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path
					d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
				/></svg
			>
		</span>
		<span class="bn-text">Dashboard</span>
	</a>

	<a
		href="/profile"
		class={'bn-link ' + ($page.url.pathname.startsWith('/profile') ? 'active' : '')}
	>
		<span class="bn-icon">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-circle-user-icon lucide-circle-user"
				><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path
					d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"
				/></svg
			>
		</span>
		<span class="bn-text">Profile</span>
	</a>
</nav>

<style>
	.topbar {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-md);
		padding: var(--spacing-sm) var(--spacing-lg);
		background: var(--color-surface);
		border-bottom: 1px solid rgba(17, 24, 39, 0.08);
		flex-wrap: wrap;
	}

	.brand .logo {
		font-weight: 800;
		letter-spacing: 0.2px;
		color: var(--color-text);
	}

	.nav {
		display: flex;
		gap: var(--spacing-md);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	@media (max-width: 640px) {
		.nav {
			display: none;
		}

		.topbar {
			padding: var(--spacing-sm) var(--spacing-md);
		}
	}

	.link {
		color: var(--color-muted);
		font-weight: 700;
		padding: 8px 12px;
		border-radius: var(--radius-sm);
		text-decoration: none;
	}

	.link:hover {
		background: rgba(17, 24, 39, 0.06);
		color: var(--color-text);
	}

	/* Active state */
	.link.active {
		background: rgba(2, 47, 73, 0.12); /* matches your primary tone */
		color: var(--color-primary);
	}
	.link:hover {
		background: rgba(17, 24, 39, 0.06);
		color: var(--color-text);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.icon-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 999px;
		border: 1px solid rgba(17, 24, 39, 0.08);
		background: var(--color-surface);
		color: var(--color-text);
	}

	.icon-btn:hover {
		background: rgba(17, 24, 39, 0.06);
	}

	.app {
		max-width: 1920px;
		margin: 0 auto;
		padding: var(--spacing-lg) 0;
	}
	/* Bottom nav hidden on desktop */
	.bottom-nav {
		display: none;
	}

	@media (max-width: 640px) {
		.bottom-nav {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: grid;
			gap: var(--spacing-sm);
			grid-template-columns: 1fr 1fr;
			padding: var(--spacing-sm) var(--spacing-md);
			background: var(--color-surface);
			border-top: 1px solid rgba(17, 24, 39, 0.08);
			z-index: 20;
		}

		.bn-link {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 2px;
			padding: 8px 10px;
			border-radius: var(--radius-sm);
			background: rgba(17, 24, 39, 0.04);
			color: var(--color-text);
			text-decoration: none;
			font-weight: 700;
		}

		.bn-link.active {
			background: var(--color-primary-active);
		}

		.bn-icon {
			font-size: 1.1rem;
			line-height: 1;
		}

		.bn-text {
			font-size: 0.75rem;
			font-weight: 700;
		}
		/* Prevent content hiding behind footer */
		.app {
			padding-top: var(--spacing-md);
			padding-bottom: calc(var(--spacing-xl) + 56px);
		}
	}
</style>
