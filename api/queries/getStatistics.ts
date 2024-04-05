import type { Handler } from 'express';
import type { StatisticsView } from '../../views/StatisticsView';

const getStatistics = ({
	statisticsView,
}: {
	statisticsView: StatisticsView;
}): Handler => {
	return (_req, res) => {
		const statistics = statisticsView.readAll();
		res.status(200).json(statistics);
	};
};

export { getStatistics };
