const CalenderFooter = ({dateControl}) => {
	return (
	<div className="section-container">
		<div className="section-row flex bg-x-light">
			<div className="section-title flex align-center">
				<div className="section-content bg-xx-light w-100 flex align-between">
					<div>
						<div>
							Assigned Total
						</div>
						<div>
							28.00 hours
						</div>
					</div>
					<div className="btn-icon" title="Add New Employee">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
							<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
						</svg>
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
					<div key={i} className="col section-holder">
						<div className="shift flex h-100 bg-light align-center">
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