const bookmakerLinks = {
	onexbet: "https://1xbet.com",
	sport888: "https://888sport.com",
	betanysports: "https://betanysports.eu",
	betfair_ex_eu: "https://www.betfair.com/exchange/plus/",
	betonlineag: "https://www.betonline.ag",
	betsson: "https://betsson.com",
	betvictor: "https://betvictor.com",
	coolbet: "https://coolbet.com",
	leovegas_se: "https://www.leovegas.com/fi-fi/",
	matchbook: "https://matchbook.com",
	mybookieag: "https://mybookie.ag",
	marathonbet: "https://marathonbet.com",
	nordicbet: "https://nordicbet.com",
	parionssport_fr: "https://www.enligne.parionssport.fdj.fr/",
	pinnacle: "https://pinnacle.com",
	pmu_fr: "https://parisportif.pmu.fr",
	unibet_fr: "https://fi.unibet.com",
	unibet_nl: "https://fi.unibet.com",
	unibet_se: "https://fi.unibet.com",
	williamhill: "https://sports.williamhill.com/betting/en-gb",
	winamax_de: "https://winamax.de",
};

export const findArbitrageOpportunities = (matches) => {
	const arbitrageOpportunities = [];

	matches.forEach((match) => {
		const bestOdds = {};

		match.bookmakers.forEach((bookmaker) => {
			bookmaker.markets[0].outcomes.forEach((outcome) => {
				const outcomeName = outcome.name;
				const odd = outcome.price;

				let link;
				if (bookmaker.markets[0].link) {
					link = bookmaker.markets[0].link;
				} else if (match.link) {
					link = match.link;
				} else {
					link = bookmakerLinks[bookmaker.key];
				}

				if (!bestOdds[outcomeName] || odd > bestOdds[outcomeName].price) {
					bestOdds[outcomeName] = {
						bookmaker: bookmaker.title,
						price: odd,
						link: link,
					};
				}
			});
		});

		if (Object.keys(bestOdds).length > 0) {
			const impliedProbabilities = Object.values(bestOdds).map((outcome) => 1 / outcome.price);
			const totalImpliedProbability = impliedProbabilities.reduce((acc, prob) => acc + prob, 0);

			if (totalImpliedProbability < 1) {
				arbitrageOpportunities.push({
					event: match.home_team + " vs " + match.away_team,
					eventStartTime: match.commence_time,
					league: match.sport_title,
					roi: (1 / totalImpliedProbability - 1) * 100,
					totalImpliedProbability,
					bestOdds,
					sport: match.sport_group,
				});
			}
		}
	});

	arbitrageOpportunities.sort((a, b) => b.roi - a.roi);

	return arbitrageOpportunities;
};
