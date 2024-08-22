import AdminSideNav from "@/components/Admin Components/Admin SideNav/AdminSideNav";

const Dashboard = ({ children }) => {
  return (
    <div className="block md:flex w-full h-full justify-between bg-[#EEEEEE] dark:bg-gray-900">
      <AdminSideNav />
      <div className="ml-[3.2rem] w-auto md:w-full ">{children}</div>
    </div>
  );
};

export default Dashboard;
