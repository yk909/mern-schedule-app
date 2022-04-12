import { EmployeeCard } from '../';
import "./styles/BusinessCard.css";

const BusinessCard = ({ businesses, isLoading }) => {
  return (
    <section className="businesses">
      {!isLoading && businesses && (
      businesses.map((business, i) => (
      <div key={`business-card-${i}`} className="business-card">
        <div className="business-card-header">
          <div className="business-card-header-info">
            <div className="business-card-header-info-left">
              <p>{business.name}</p>
            </div>
            <div className="business-card-header-info-right">
              <p>{business.type}</p>
            </div>
          </div>
          <div className="business-card-header-info">
            <div className="business-card-header-info-left">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
              <p>{business.address}, {business.city} {business.state}, {business.zip}</p>
            </div>
            <div className="business-card-header-info-right">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
              </svg>
              <p>{business.phoneNumber}</p>
            </div>
          </div>
          <div className="business-card-body-info-item">
          </div>
        </div>
        <div className="business-card-body">
          <div className="business-card-body-employees">
            {business.managers.length > 0 && (
            <>
              <div className="busines-card-body-title">
                <p>Manager</p>
              </div>
              {business.managers.map((manager, i) => {
                return (
                  <EmployeeCard 
                    key={`business-card-employee-${i}`}
                    employee={manager}
                  />
                )
              })}
            </>
            )}
            <div className="busines-card-body-title">
              <p>Employees</p>
            </div>
            {business.employees.map((employee, i) => {
              return (
                <EmployeeCard 
                  key={`business-card-employee-${i}`}
                  employee={employee}
                />
              )
            })}
          </div>
        </div>
      </div>
      ))
    )}
    {isLoading && (
      <div className="business-card blink">
        <div className="business-card-header"></div>
        <div className="busines-card-body-title">
          <p>Employees</p>
        </div>
        <div className="business-card-body-employees">
          {[...Array(8)].map((_, index) => {
            return (
              <div key={`loading-employee-card-${index}`} className="business-card-body-employee"></div>
              )
            })}
        </div>
      </div>
    )}
  </section>
  )
}

export default BusinessCard