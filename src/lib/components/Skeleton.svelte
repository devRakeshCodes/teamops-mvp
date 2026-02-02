<div class="skeleton"></div>

<style>
	.skeleton {
		background: #e2e8f0;
		border-radius: var(--radius-sm);
		height: 1rem;
		margin-bottom: var(--spacing-sm);
		animation: pulse 1.5s infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}
</style>
