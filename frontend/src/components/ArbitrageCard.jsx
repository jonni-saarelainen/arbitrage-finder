import styles from "./ArbitrageCard.module.css";
import { bookmakerLogos } from "../constants/bookmakerLogos";
import { useState } from "react";

const ArbitrageCard = (props) => {
	const { arbitrageOpportunity, wager } = props;
	const { roi, sport, league, event, eventStartTime, bestOdds } = arbitrageOpportunity;
	const profit = roi * (wager / 100);
	const [showCopyNotification, setShowCopyNotification] = useState(false);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

	const formattedProfit = profit.toLocaleString("de-DE", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	const formattedStartTime = formatEventDate(eventStartTime);

	const formattedEvent = formatEvent(event);

	const handleCopyEvent = async (e) => {
		try {
			setMousePos({ x: e.clientX, y: e.clientY });
			await navigator.clipboard.writeText(formattedEvent);
			setShowCopyNotification(true);
			setTimeout(() => setShowCopyNotification(false), 1000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<div className={styles.card}>
			<div className={styles.roiContainer}>
				<div className={styles.vContainer}>
					<h2 className={styles.roi}>{roi.toFixed(2)}%</h2>
					<p>
						Profit: <b>+{formattedProfit}€</b>
					</p>
				</div>
			</div>
			<div className={styles.eventContainer}>
				<p>
					{sport} / {league}
				</p>
				<h3 className={styles.event} onClick={handleCopyEvent} title="Copy to clipboard">
					{formattedEvent}
				</h3>
				<p>{formattedStartTime}</p>
			</div>
			<div className={styles.bestOddsContainer}>
				{Object.entries(bestOdds).map(([name, bet]) => {
					const logoSrc = bookmakerLogos[bet.bookmakerKey] ?? bookmakerLogos.fallback;
					const formattedName = formatName(name);
					const formattedOdds = formatOdds(bet.price);
					const stake = (wager / (arbitrageOpportunity.totalImpliedProbability * bet.price)).toLocaleString("de-DE", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					});
					return (
						<div key={name} className={styles.oddContainer}>
							<h4>{formattedName}</h4>
							<div className={styles.stakeContainer}>
								<p>Stake -</p>
								<h4>{stake}€</h4>
							</div>
							<a href={bet.link} target="_blank" rel="noopener noreferrer" className={styles.bookmakerLinkButton}>
								<img className={styles.bookmakerLogo} src={logoSrc}></img>
								<h4>{formattedOdds}</h4>
							</a>
						</div>
					);
				})}
			</div>
			{showCopyNotification && (
				<div className={styles.snackbar} style={{ top: `${mousePos.y - 60}px`, left: `${mousePos.x - 80}px` }}>
					Copied to clipboard
				</div>
			)}
		</div>
	);
};

const formatEventDate = (isoDateString) => {
	const date = new Date(isoDateString);
	if (Number.isNaN(date.getTime())) {
		return "Invalid date";
	}

	const day = date.getDate();
	const month = date.toLocaleString(undefined, { month: "long" });
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");

	return `${day}. ${month}, ${hours}:${minutes}`;
};

const formatEvent = (event) => {
	return event.replace(/\s+vs\s+/i, " - ");
};

const formatName = (name) => {
	if (name.toLowerCase() !== "draw") {
		return `${name} - Win`;
	} else {
		return name;
	}
};

const formatOdds = (odds) => {
	return odds.toFixed(2);
};

export default ArbitrageCard;
