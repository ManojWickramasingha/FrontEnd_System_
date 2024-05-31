import UserCountCard from './UserCountCard';
import { FaUserShield, FaUser } from 'react-icons/fa';

const UserCountSection = ({ usersList }) => {
    let admins = 0;
    let users = 0;

    usersList.forEach((item) => {
        if(item.roles.include('admin')){
            admins++;
        } else if(item.roles.include('user')) {
            users++;
        }
    });

    const userCountData = [
        {count: admins, role: 'admin', icon: FaUserShield , color: '#0B96BC'},
        {count: users, role: 'user', icon: FaUser , color: '#FEC223'}
    ];
    
    return (
        <div className=''>
            {
                userCountData.map((item, index) => (
                    <UserCountCard 
                        key={index}
                        count={item.count}
                        role={item.role}
                        icon={item.icon}
                        color={item.color}
                    />
                ))
            }
        </div>
    )
}

export default UserCountSection