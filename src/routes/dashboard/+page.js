export const load = async () => {
	return {
		stats: {
			usageThisMonthGB: 120,
			activeProjects: 5,
			systemHealth: 'Healthy' // Healthy | Degraded | Down
		}
	};
};
