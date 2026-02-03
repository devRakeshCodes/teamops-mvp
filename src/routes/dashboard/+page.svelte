<script>
	import { onMount } from 'svelte';

	const { data } = $props();

	let loading = $state(true);

	let usageTrend = $state([]); // [{ label, value }]
	let activity = $state([]); // [{ id, text, time }]
	let alerts = $state([]); // [{ id, level, title }]

	onMount(async () => {
		await new Promise((r) => setTimeout(r, 800));

		usageTrend = [
			{ label: 'Week 1', value: 60 },
			{ label: 'Week 2', value: 80 },
			{ label: 'Week 3', value: 70 },
			{ label: 'Week 4', value: 100 }
		];

		activity = [
			{ id: 1, text: 'John added a new task', time: '10 mins ago' },
			{ id: 2, text: 'Deployed new version', time: '1 hour ago' },
			{ id: 3, text: 'Subscription renewed', time: '1 day ago' }
		];

		alerts = [
			{ id: 1, level: 'high', title: 'Server Load High' },
			{ id: 2, level: 'high', title: 'Backup Pending' },
			{ id: 3, level: 'medium', title: 'Update Available' }
		];
		loading = false;
	});

	// Map system health
	const healthClass = (systemHealth) => {
		const h = systemHealth?.toLowerCase();
		if (h === 'degraded') return 'warn';
		if (h === 'down') return 'bad';
		return 'good';
	};

	// Bar height normalization
	const maxTrendValue = $derived.by(() => {
		if (!usageTrend.length) return 1;
		return Math.max(...usageTrend.map((d) => d.value), 1);
	});

	const bars = $derived.by(() =>
		usageTrend.map((d) => ({
			...d,
			percent: Math.round((d.value / maxTrendValue) * 100)
		}))
	);
</script>

<section class="page">
	<!-- Summary statistics (SSR) -->
	<section class="stats" aria-label="Summary statistics">
		<div class="stat">
			<span class="label">Usage This Month</span>
			<span class="value">{data.stats.usageThisMonthGB} <span class="unit">GB</span> </span>
		</div>

		<div class="stat">
			<span class="label">Active Projects</span>
			<span class="value">{data.stats.activeProjects}</span>
		</div>

		<div class="stat">
			<span class="label">System Status</span>
			<span class={'pill ' + healthClass(data.stats.systemHealth)}>
				<span class="pill-dot">
					<!-- SVG icon -->
					{#if healthClass(data.stats.systemHealth) === 'good'}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 16 16"
							fill="none"
							><path
								d="M8.00016 14.6663C11.6668 14.6663 14.6668 11.6663 14.6668 7.99967C14.6668 4.33301 11.6668 1.33301 8.00016 1.33301C4.3335 1.33301 1.3335 4.33301 1.3335 7.99967C1.3335 11.6663 4.3335 14.6663 8.00016 14.6663Z"
								fill="#2F9A47"
								stroke="#2F9A47"
								stroke-width="1.2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/><path
								d="M5.1665 7.99995L7.05317 9.88661L10.8332 6.11328"
								stroke="#fff"
								stroke-width="1.2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/></svg
						>
					{:else if healthClass(data.stats.systemHealth) === 'warn'}
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
					{:else if healthClass(data.stats.systemHealth) === 'bad'}
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
				</span>
				{data.stats.systemHealth}
			</span>
		</div>
	</section>

	<div class="mid-grid">
		<!-- Usage Overview (CSR) -->
		<section class="panel">
			<div class="panel-head">
				<h2>Usage Overview</h2>
			</div>

			{#if loading}
				<div class="chart-skeleton" aria-label="Loading chart"></div>
			{:else if bars.length === 0}
				<p class="empty">No usage data available.</p>
			{:else}
				<div class="chart" role="img" aria-label="Usage bar chart">
					{#each bars as b (b.label)}
						<div class="bar">
							<div class="bar-track">
								<div
									class="bar-fill"
									style="height: {b.percent}%;"
									title="{b.label}: {b.value}"
								></div>
							</div>
							<div class="bar-label">{b.label}</div>
						</div>
					{/each}
				</div>
			{/if}
		</section>
		<section class="panel">
			<div class="panel-head">
				<h2>Alerts</h2>
			</div>

			{#if loading}
				<ul class="alerts" aria-label="Loading alerts">
					<li class="alert skeleton-row"></li>
					<li class="alert skeleton-row"></li>
					<li class="alert skeleton-row"></li>
				</ul>
			{:else if alerts.length === 0}
				<p class="empty">
					No alerts. All good!
					<span class="empty-icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 16 16"
							fill="none"
							><path
								d="M8.00016 14.6663C11.6668 14.6663 14.6668 11.6663 14.6668 7.99967C14.6668 4.33301 11.6668 1.33301 8.00016 1.33301C4.3335 1.33301 1.3335 4.33301 1.3335 7.99967C1.3335 11.6663 4.3335 14.6663 8.00016 14.6663Z"
								fill="#2F9A47"
								stroke="#2F9A47"
								stroke-width="1.2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/><path
								d="M5.1665 7.99995L7.05317 9.88661L10.8332 6.11328"
								stroke="#fff"
								stroke-width="1.2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/></svg
						>
					</span>
				</p>
			{:else}
				<ul class="alerts" aria-label="Alerts list">
					{#each alerts as a (a.id)}
						<li class="alert">
							<span class={'dot ' + a.level} aria-hidden="true"></span>
							<span class="alert-text">{a.title}</span>
							<span class="chev" aria-hidden="true">›</span>
						</li>
					{/each}
				</ul>
			{/if}
		</section>
	</div>
	<!-- Recent Activity (CSR) -->
	<section class="activity-panel">
		<div class="activity-panel-head">
			<h2>Recent Activity</h2>
		</div>

		<div class="activity-surface">
			{#if loading}
				<ul class="list">
					<li class="row skeleton-row"></li>
					<li class="row skeleton-row"></li>
					<li class="row skeleton-row"></li>
				</ul>
			{:else if activity.length === 0}
				<p class="empty">No recent activity.</p>
			{:else}
				<ul class="list">
					{#each activity as item (item.id)}
						<li class="row activity-row">
							<span class="activity-dot"></span>
							<span class="row-text">{item.text}</span>
							<small class="row-time">{item.time}</small>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</section>
</section>

<style>
	.page {
		display: grid;
		gap: var(--spacing-md);
		padding: 0 var(--spacing-md);
	}
	.subtitle {
		margin-top: var(--spacing-xs);
		color: var(--color-muted);
	}

	/* Top stats */
	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: var(--spacing-md);
	}

	.stat {
		background: var(--color-surface);
		padding: var(--spacing-md);
		border-radius: var(--radius-lg);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
	}

	.label {
		display: block;
		font-size: 0.85rem;
		color: var(--color-muted);
		margin-bottom: var(--spacing-xs);
	}

	.value {
		font-size: 1.5rem;
		font-weight: 650;
		color: var(--color-text);
	}
	.unit {
		font-size: 0.85rem;
	}

	.pill {
		display: inline-flex;
		justify-content: flex-start;
		align-items: center;
		gap: 6px;
		padding: 4px 8px 4px 6px;
		border-radius: 999px;
		font-size: 0.85rem;
		font-weight: 700;
	}

	.pill-dot {
		display: inline-flex;
		justify-content: center;
		align-items: center;
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

	/* Panels */
	.panel {
		height: 100%;
		background: var(--color-surface);
		padding: var(--spacing-lg);
		border-radius: var(--radius-lg);
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
	}

	.panel-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--spacing-md);
		flex-wrap: wrap;
		margin-bottom: var(--spacing-md);
	}

	.activity-panel {
		height: 100%;
		background: var(--color-surface);
		border-radius: var(--radius-md);
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
	}

	.activity-panel-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--spacing-md);
		flex-wrap: wrap;
		height: auto;
		padding: var(--spacing-md);
	}
	/* Inner surface like the mock */
	.activity-surface {
		/* margin-top: var(--spacing-sm); */
		background: rgba(17, 24, 39, 0.04);
		border-radius: var(--radius-sm);
		/* padding: var(--spacing-sm) var(--spacing-md); */
	}

	/* Activity rows refinement */
	.activity-row {
		display: grid;
		grid-template-columns: 10px 1fr auto;
		align-items: center;
		gap: var(--spacing-sm);
		padding: 12px 16px;
	}

	.activity-row:not(:last-child) {
		border-bottom: 1px solid rgba(17, 24, 39, 0.06);
	}

	.activity-dot {
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background: var(--color-primary);
	}

	h2 {
		margin: 0;
		font-size: 1.1rem;
	}

	.muted {
		color: var(--color-muted);
		font-size: 0.85rem;
		margin: 0;
	}

	.empty {
		color: var(--color-muted);
		margin: 0;
		padding: var(--spacing-sm) 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.empty-icon {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		margin-left: 8px;
	}

	.mid-grid {
		display: grid;
		grid-template-columns: 1.35fr 1fr;
		gap: var(--spacing-md);
		align-items: start;
	}

	@media (max-width: 900px) {
		.mid-grid {
			grid-template-columns: 1fr;
		}
	}

	/* Chart */
	.chart {
		display: flex;
		align-items: flex-end;
		gap: var(--spacing-sm);
		height: 180px;
		margin-top: var(--spacing-md);
	}

	.bar {
		flex: 1;
		min-width: 44px;
		text-align: center;
	}

	.bar-track {
		height: 150px;
		background: rgba(17, 24, 39, 0.06);
		border-radius: var(--radius-lg);
		display: flex;
		align-items: flex-end;
		overflow: hidden;
	}

	.bar-fill {
		width: 100%;
		background: var(--color-primary);
		border-radius: var(--radius-lg);
		transition: height 200ms ease;
	}

	.bar-label {
		margin-top: 6px;
		font-size: 0.75rem;
		color: var(--color-muted);
	}

	.chart-skeleton {
		height: 180px;
		border-radius: var(--radius-lg);
		background: linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%);
		background-size: 400px 100%;
		animation: shimmer 1.2s infinite;
	}

	@keyframes shimmer {
		0% {
			background-position: -400px 0;
		}
		100% {
			background-position: 400px 0;
		}
	}

	.alerts {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: var(--spacing-sm);
	}

	.alert {
		display: grid;
		grid-template-columns: 16px 1fr 16px;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		border-radius: var(--radius-sm);
		background: rgba(17, 24, 39, 0.04);
		transition:
			background 0.15s ease,
			transform 0.1s ease;
		cursor: pointer;
	}
	.alert:hover {
		background: rgba(17, 24, 39, 0.07);
		transform: translateY(-1px);
	}

	.alert-text {
		color: var(--color-text);
		font-weight: 600;
		font-size: 0.95rem;
		line-height: 1.2;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 999px;
		display: inline-block;
	}

	/* Severity mapping */
	.dot.high {
		background: var(--color-error);
	}
	.dot.medium {
		background: var(--color-warning);
	}
	.dot.low {
		background: var(--color-success);
	}

	.chev {
		color: var(--color-muted);
		font-size: 1.2rem;
		line-height: 1;
		justify-self: end;
	}

	/* Activity list */
	.list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.row {
		display: flex;
		justify-content: space-between;
		gap: var(--spacing-md);
		padding: var(--spacing-sm) var(--spacing-md);
		border-bottom: 1px solid rgba(17, 24, 39, 0.08);
	}

	.row:last-child {
		border-bottom: none;
	}

	.row-text {
		color: var(--color-text);
	}

	.row-time {
		color: var(--color-muted);
		white-space: nowrap;
	}
	.activity-row {
		display: grid;
		grid-template-columns: 10px 1fr auto;
		align-items: center;
	}
	.activity-dot {
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background: var(--color-primary);
	}

	.skeleton-row {
		height: 18px;
		border-radius: var(--radius-sm);
		background: linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%);
		background-size: 400px 100%;
		animation: shimmer 1.2s infinite;
	}

	/* Mobile */
	@media (max-width: 520px) {
		.page {
			gap: var(--spacing-sm);
		}
		.stats {
			gap: var(--spacing-sm);
		}
		.mid-grid {
			gap: var(--spacing-sm);
		}
		.panel {
			padding: var(--spacing-md);
		}
		.bar {
			min-width: 36px;
		}
		.row {
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
		.row-text {
			flex: 1;
		}
	}
</style>
