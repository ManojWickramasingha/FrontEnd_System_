import CreateOrganizationPage from '../../../components/OrganizationComponenets/CreateOrganizationPage';

const UserOrganizationPage = () => {

    return (
        <div className='pageTemplate2'>
            <h1 className='text-3xl font-bold'>Organization</h1>
            <div>
                <CreateOrganizationPage />
            </div>
        </div>
    )
}

export default UserOrganizationPage