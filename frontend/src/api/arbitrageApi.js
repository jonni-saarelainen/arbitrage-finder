import axios from "axios";

export const fetchArbitrageOpportunities = async () => {
	const { data } = await axios.get("http://localhost:5000/api/arbitrage/arbitrageOpportunities");

	return data;
};
