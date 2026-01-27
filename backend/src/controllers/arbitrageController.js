import { fetchSports, fetchOdds } from "../services/oddsService.js";
import { findArbitrageOpportunities } from "../utils/arbitrageFinder.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getArbitrageOpportunities = async (req, res) => {
	try {
		const sports = await fetchSports();
		const oddsData = [];

		for (let i = 0; i < sports.length; i++) {
			const sport = sports[i];

			// Rate limiting
			if (i > 0) {
				await delay(250);
			}

			const odds = await fetchOdds(sport.key);

			const withGroup = odds.map((odd) => ({
				...odd,
				sport_group: sport.group,
			}));

			oddsData.push(...withGroup);
		}

		const matches = oddsData.flat();

		const arbitrageOpportunities = findArbitrageOpportunities(matches);

		const filteredOpportunities = arbitrageOpportunities.filter((opportunity) => opportunity.roi >= 1);

		res.json(filteredOpportunities);
	} catch (error) {
		console.error("Error fetching arbitrage opportunities:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
