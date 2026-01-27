import { useState } from "react";
import { fetchArbitrageOpportunities } from "../api/arbitrageApi";

export function useArbitrage() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	async function refresh() {
		try {
			setLoading(true);
			setError(null);
			const result = await fetchArbitrageOpportunities();
			setData(result);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}

	return {
		data,
		loading,
		error,
		refresh,
	};
}
