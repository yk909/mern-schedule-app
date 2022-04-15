import { useSelector } from 'react-redux';
import { countAsignedTotalHours } from '../../constance/helpers';

const CalenderFooter = ({ dateControl, startDate }) => {
	const { shifts } = useSelector(state => state.shift);

	return (
	<div className="section-container footer-row">
		<div className="section-row flex">
			<div className="section-title flex align-center">
				<div className="section-content w-100 flex align-between">
					<div>
						Assigned Total
					</div>
					<div>
						{countAsignedTotalHours(shifts, dateControl.value === 'day' ? startDate : null)}
					</div>
				</div>
			</div>
			{[...Array(
				dateControl.value === "week" ?
					7 
				: dateControl.value === "2week" ?
					14
				: dateControl.value === "4week" ?
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