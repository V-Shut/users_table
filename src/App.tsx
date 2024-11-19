import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { EditPage } from "./components/Edit";
import { Users } from "./components/Users";
import { useEffect, useState } from "react";
import countryList from "./data/countries.json";
import departmentsList from "./data/departments.json";
import statusesList from "./data/statuses.json";
import usersList from "./data/users.json";
import { Country, Department, Employee, Status } from "./types";

function App() {
  const [users, setUsers] = useState<Employee[] | undefined>(undefined);
  const [departments, setDepartments] = useState<Department[] | undefined>(undefined);
  const [countries, setCountries] = useState<Country[] | undefined>(undefined);
  const [statuses, setStatuses] = useState<Status[] | undefined>(undefined);

  useEffect(() => {
    setUsers(usersList);
    setDepartments(departmentsList);
    setCountries(countryList);
    setStatuses(statusesList);
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<EditPage />} />
        <Route path="/users" element={<Users users={users}/>} />
      </Routes>
    </Router>
  );
}

export default App;
