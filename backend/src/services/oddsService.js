import axios from "axios";

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
		bookmakers: match.bookmakers.filter((bookmaker) => {
			return allowedBookmakers.includes(bookmaker.key);
		}),
	}));
};

export const fetchSports = async (apiKey) => {
	try {
		const response = await axios.get("https://api.the-odds-api.com/v4/sports", {
			params: {
				apiKey,
				outrights: "false",
			},
		});

		const sports = response.data;

		return sports;
	} catch (error) {
		if (error.response) {
			console.log("Error status", error.response.status);
			console.log(error.response.data);
		} else {
			console.log("Error", error.message);
		}
	}
};

export const fetchOdds = async (sportKey, apiKey) => {
	try {
		const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
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

		const odds = filterBookmakers(response.data);

		return odds;
	} catch (error) {
		if (error.response) {
			console.log("Error status", error.response.status);
			console.log(error.response.data);
		} else {
			console.log("Error", error.message);
		}
	}
};

export const fetchOddsData = async () => {};
