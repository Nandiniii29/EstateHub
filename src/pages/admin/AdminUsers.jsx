import { useApp } from '../../context/AppContext.jsx';

const sampleUsers = [
  {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    role: 'user',
    joined: 'Jan 2026',
    status: 'Active',
  },
  {
    name: 'Priya Nair',
    email: 'priya.nair@example.com',
    role: 'user',
    joined: 'Feb 2026',
    status: 'Active',
  },
  {
    name: 'Rohit Malhotra',
    email: 'rohit.malhotra@example.com',
    role: 'user',
    joined: 'Mar 2026',
    status: 'Active',
  },
  {
    name: 'Simran Kaur',
    email: 'simran.kaur@example.com',
    role: 'user',
    joined: 'Apr 2026',
    status: 'Active',
  },
];

export default function AdminUsers() {
  const { user } = useApp();

  const currentUser = user
    ? {
        name: user.name,
        email: user.email,
        role: user.role || 'user',
        joined: 'Today',
        status: 'Active',
      }
    : null;

  const allUsers = currentUser
    ? [currentUser, ...sampleUsers]
    : sampleUsers;

  return (
    <div className="admin-users-page">
      <div className="admin-card-heading">
        <div>
          <h2>Registered Users</h2>
          <p>
            View the user accounts currently represented in the EstateHub
            dashboard.
          </p>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {allUsers.map((entry) => (
              <tr key={entry.email}>
                <td>
                  <div className="admin-user-name">
                    <span className="admin-user-avatar">
                      {entry.name.charAt(0).toUpperCase()}
                    </span>

                    <strong>{entry.name}</strong>
                  </div>
                </td>

                <td>{entry.email}</td>

                <td>
                  <span className="admin-role">
                    {entry.role}
                  </span>
                </td>

                <td>{entry.joined}</td>

                <td>
                  <span className="admin-status">
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
    </div>
  );
}