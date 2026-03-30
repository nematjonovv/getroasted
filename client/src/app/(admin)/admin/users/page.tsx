import UsersTable from '@/src/features/admin/components/UsersTable';
import Topbar from '@/src/shared/components/admin/Topbar';

function UsersPage() {
  return (
    <div className="h-full w-full">
      <Topbar pageTitle="Users" />
      <UsersTable />
    </div>
  );
}

export default UsersPage;