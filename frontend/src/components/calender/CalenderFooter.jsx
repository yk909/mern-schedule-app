import { useSelector } from 'react-redux';
import { countAsignedTotalHours } from '../../constance/helpers';

const CalenderFooter = () => {
	const { shifts } = useSelector(state => state.shift);
    const startDate = new Date (useSelector(state => state.local.time.startDate));
    const fromDate = new Date (useSelector(state => state.local.time.fromDate));
    const toDate = new Date (useSelector(state => state.local.time.toDate));
    const dateControl = useSelector(state => state.local.time.dateControl);

	return (
	<div className="section-container footer-row">
		<div className="section-row flex">
			<div className="section-title flex align-center">
				<div className="section-content w-100 flex align-between">
					<div>
						Assigned Total
					</div>
					<div>
						{countAsignedTotalHours(shifts, dateControl === 'day' ? startDate : null, fromDate, toDate)}
					</div>
				</div>
			</div>
			{[...Array(
				dateControl === "week" ?
					7 
				: dateControl === "2week" ?
					14
				: dateControl === "4week" ?
					28
				: 24
			).keys()].map((i) => {
				return (
					<div key={`footer-row-${i}`} className="col section-holder">
						<div className="shift flex h-100 align-center">
							{ i }
						</div>
					</div>
				)
			})}
		</div>
	</div>
	)
}

export default CalenderFooter