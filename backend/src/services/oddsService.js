import axios from "axios";

const apiKey = process.env.ODDS_API_KEY;

const allowedBookmakers = [
	"onexbet",
	"sport888",
	"betanysports",
	"betfair_ex_eu",
	"betonlineag",
	"betsson",
	"betvictor",
	"coolbet",
	"leovegas_se",
	"matchbook",
	"mybookieag",
	"marathonbet",
	"nordicbet",
	"parionssport_fr",
	"pinnacle",
	"pmu_fr",
	"unibet_fr",
	"unibet_nl",
	"unibet_se",
	"williamhill",
	"winamax_de",
];

const filterBookmakers = (odds) => {
	return odds.map((match) => ({
		...match,
		bookmakers: Array.isArray(match.bookmakers) ? match.bookmakers.filter((b) => allowedBookmakers.includes(b.key)) : [],
	}));
};

export const fetchSports = async () => {
	try {
		const { data } = await axios.get("https://api.the-odds-api.com/v4/sports", {
			params: {
				apiKey,
				outrights: "false",
			},
		});

		return data;
	} catch (error) {
		console.error("Failed to fetch sports:", error.message);
		throw error;
	}
};

export const fetchOdds = async (sportKey) => {
	try {
		const { data } = await axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
			params: {
				apiKey,
				regions: "eu",
				markets: "h2h",
				oddsFormat: "decimal",
				dateFormat: "iso",
				includeLinks: "true",
				includeSids: "true",
			},
		});

		return filterBookmakers(data);
	} catch (error) {
		console.error(`Failed to fetch odds for ${sportKey}:`, error.message);
		throw error;
	}
};
