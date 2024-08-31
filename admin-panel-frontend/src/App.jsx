import { useState } from 'react';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <div className="App">
      {user ? <AdminDashboard user={user} /> : <LoginForm onLogin={handleLogin} />}
    </div>
  );
}

export default App;
