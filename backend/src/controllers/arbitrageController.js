import { fetchSports, fetchOdds } from "../services/oddsService.js";
import { findArbitrageOpportunities } from "../utils/arbitrageFinder.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getArbitrageOpportunities = async (req, res) => {
	try {
		const sports = await fetchSports();
		const oddsData = [];

		for (let i = 0; i < sports.length; i++) {
			const sport = sports[i];
			const odds = await fetchOdds(sport.key);

			const withGroup = odds.map((odd) => ({
				...odd,
				sport_group: sport.group,
			}));

			oddsData.push(...withGroup);
			await rateLimit(i);
		}

		const matches = oddsData.flat();

		const arbitrageOpportunities = findArbitrageOpportunities(matches);

		res.json(arbitrageOpportunities);
	} catch (error) {
		console.error("Error fetching arbitrage opportunities:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

async function rateLimit(index) {
	if ((index + 1) % 30 === 0) {
		await delay(1000);
	}
}
