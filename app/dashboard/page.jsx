
import DashboardCom from '@/components/dashboard';
import { addtask, deleteUser } from '../lib/action';

const Dashboard = () => {
    
    return (
        <div>
            <DashboardCom deleteUser={deleteUser} addUser={addtask}/>
        </div>
    );
};

export default Dashboard;