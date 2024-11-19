import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { EditPage } from "./components/Edit";
import { Users } from "./components/Users";
import { useEffect, useState } from "react";
import usersList from "./data/users.json";
import { Employee } from "./types";

function App() {
  const [users, setUsers] = useState<Employee[] | undefined>(undefined);

  useEffect(() => {
    setUsers(usersList);
  }, []);

  if (users) {
    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<EditPage users={users} setUsers={setUsers}/>} />
          <Route
            path="/users"
            element={<Users users={users} setUsers={setUsers} />}
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
