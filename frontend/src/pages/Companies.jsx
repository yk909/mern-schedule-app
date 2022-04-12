import { useSelector } from 'react-redux';
import { CompanyCard, CreateCompany } from '../components';

const Companies = () => {
  const { companies, isLoading } = useSelector(state => state.company);

  return (
    <>
      <CompanyCard 
        isLoading={isLoading}
        companies={companies} 
      />
      <CreateCompany />
    </>
  )
}

export default Companies