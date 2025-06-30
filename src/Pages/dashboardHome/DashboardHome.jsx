import DashboardCharts from './dashboardHomeComponents/dashboardChart/DashboardCharts'
import UserManageDash from './dashboardHomeComponents/userManage/UserManageDash'
import OverView from './dashboardHomeComponents/overViewInformation/OverView'

const DashboardHome = () => {
  return (
    <div className="bg-black h-screen overflow-y-auto scrollbar-none">
      <div className="mb-20">
        <OverView />
        <div className="mt-2   rounded-lg ">
          <DashboardCharts />
        </div>
        <div className="mt-2   rounded-lg bg-gray-200 ">
          <UserManageDash />
        </div>
      </div>
    </div>
  )
}

export default DashboardHome
