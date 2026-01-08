import { fetchSports, fetchOdds } from "../services/oddsService.js";
import { findArbitrageOpportunities } from "../utils/arbitrageFinder.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getArbitrageOpportunities = async (req, res) => {
	try {
		const apiKey = req.query.apiKey;

		if (!apiKey) {
			return res.status(400).json({ error: "API key is required" });
		}

		const sports = await fetchSports(apiKey);
		const oddsData = [];

		for (const sport of sports) {
			const odds = await fetchOdds(sport.key, apiKey);

			odds.forEach((odd) => {
				odd.sport_group = sport.group;
			});

			oddsData.push(...odds);

			await rateLimit(sports.indexOf(sport));
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
