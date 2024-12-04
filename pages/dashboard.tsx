import UserDashboard from '../components/UserDashboard'; // Make sure the import path is correct

const DashboardPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <UserDashboard /> {/* This renders the UserDashboard component */}
    </div>
  );
};

export default DashboardPage;
