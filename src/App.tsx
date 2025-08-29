import { useState, useEffect } from "react";
import InputField from "./assets/components/InputField";
import DataTable from "./assets/components/DataTable";

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  // Sample user data
  type User = { id: number; name: string; email: string; age: number };
  const data: User[] = [
    { id: 1, name: "Alice", email: "alice@email.com", age: 25 },
    { id: 2, name: "Bob", email: "bob@email.com", age: 30 },
    { id: 3, name: "Charlie", email: "charlie@email.com", age: 22 },
    { id: 4, name: "David", email: "david@email.com", age: 28 },
  ];

  const columns: {
    key: string;
    title: string;
    dataIndex: keyof User;
    sortable?: boolean;
  }[] = [
    { key: "id", title: "ID", dataIndex: "id", sortable: true },
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "email", title: "Email", dataIndex: "email" },
    { key: "age", title: "Age", dataIndex: "age", sortable: true },
  ];
  


  // Filter data based on search term
  const filteredData = data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply/remove dark class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors p-4 flex flex-col items-center space-y-10">
      {/* Sign Up Form */}
      <form className="relative p-10 md:p-20 bg-white dark:bg-gray-900 shadow-md rounded-2xl space-y-4 w-full max-w-md transition-colors">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 text-sm px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>

        <h1 className="text-center text-2xl font-bold text-gray-800 dark:text-gray-100">
          Sign Up
        </h1>

        <InputField
          label="Name"
          placeholder="Your name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <InputField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText="We'll never share your email."
          variant="outlined"
          size="md"
          clearable
        />

        <InputField
          label="Password"
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPasswordToggle
        />


        <button className="w-full py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
          Continue
        </button>
      </form>

      {/* DataTable Card */}
      <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md w-full max-w-4xl space-y-4 transition-colors">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Users Table
        </h2>

        {/* Search Input */}
        <InputField
          label="Search Users"
          placeholder="Type name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          clearable
        />

        {/* Filtered DataTable */}
        <DataTable<User>
          data={filteredData}
          columns={columns}
          variant="striped"
          selectable
          rowsPerPage={2}
        />

      </div>
    </div>
  );
}

export default App;
