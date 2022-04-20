import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Employees, CreateEmployee, UpdateBusiness, ManagerProtect, AdminProtect } from '../';
import "./styles/BusinessCard.css";

const BusinessCard = ({ businesses, isLoading }) => {
  const { employees } = useSelector(state => state.employee);
  const { user } = useSelector(state => state.auth);
  const { company } = useSelector(state => state.company);
  return (
    <section className="businesses">
      {!isLoading && businesses && (
      businesses.map((business, i) => (
      <div key={`business-card-${i}`} className="business-card">
        <div className="business-card-header">
          <div className="business-card-header-info">
            <div className="business-card-header-info-left">
              <Link to={`/scheduler/${business._id}`}>{business.name}</Link>
            </div>
              { employees && employees.map(employee => (
                (business._id === employee.business || business._id === employee.business._id ) && (
                    employee.user === user._id && (
                    <div key={`permition-${employee._id}`} className="business-card-header-info-right">
                    { company.user === user._id ? (
                      <p>ADMIN</p>
                    ): company.owners.includes(employee.user) ? (
                      <>
                        <p>OWNER</p>
                      </>
                    ): employee.isManager ? (
                      <>
                        <p>MANAGER</p>
                      </>
                    ) : (
                      <>
                        <p>EMPLOYEE</p>
                      </>
                    )}
                    
                    <AdminProtect>
                      <UpdateBusiness
                        business={business}
                      />
                    </AdminProtect>
                    </div>
                  )
                )
              ))}
          </div>
          <div className="business-card-header-info">
            <div className="business-card-header-info-left">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
              </svg>
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
            <div className="busines-card-body-title">
              <p>Employees</p>
            </div>
            <Employees 
              positions={business.positions}
              businesses={businesses}
              business={business}
            />
            <ManagerProtect
              business={business}
            >
              <CreateEmployee
                positions={business.positions}
                business={business}
              />
            </ManagerProtect>
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
          {[...Array(5)].map((_, index) => {
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