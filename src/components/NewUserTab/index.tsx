import { useState } from "react";
import "./style.css";
import departments from "../../data/departments.json";
import countries from "../../data/countries.json";
import statuses from "../../data/statuses.json";
import { Country, Department, Employee, Status } from "../../types";

interface Props {
  setCreateUserTable: (value: boolean) => void;
  setUsers: (list: Employee[]) => void;
  users: Employee[];
}

export const NewUserTable: React.FC<Props> = ({ setCreateUserTable, setUsers, users }) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState<Department | null>(null);
  const [country, setCountry] = useState<Country | null>(null);
  const [status, setStatus] = useState<Status | null>(null);

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDepartment =
      departments.find((dep) => dep.name === event.target.value) || null;
    setDepartment(selectedDepartment);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry =
      countries.find((c) => c.name === event.target.value) || null;
    setCountry(selectedCountry);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus =
      statuses.find((s) => s.name === event.target.value) || null;
    setStatus(selectedStatus);
  };

  const addUser = () => {
    if (!name || !department || !country || !status) {
      alert("Please fill in all fields.");
      return;
    }

    const newUser: Employee = {
      name: name,
      status: status,
      department: department,
      country: country,
    };

    setUsers([...users, newUser]);

    setName("");
    setDepartment(null);
    setCountry(null);
    setStatus(null);
    setCreateUserTable(false);
  };

  return (
    <div className="tab_background">
      <div className="user_tab">
        <h1 className="new_user_head">Add User</h1>
        <div className="form">
          <div className="param_container">
            <p className="new_user_param">Full Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form_params"
            />
          </div>

          <div className="param_container">
            <p className="new_user_param">Department</p>
            <select
              value={department ? department.name : ""}
              onChange={handleDepartmentChange}
              className="form_params"
            >
              <option value="">Select a Department</option>
              {departments.map((el) => (
                <option key={el.value} value={el.name}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>

          <div className="param_container">
            <p className="new_user_param">Country</p>
            <select
              value={country ? country.name : ""}
              onChange={handleCountryChange}
              className="form_params"
            >
              <option value="">Select a Country</option>
              {countries.map((el) => (
                <option key={el.value} value={el.name}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>

          <div className="param_container">
            <p className="new_user_param">Status</p>
            <select
              value={status ? status.name : ""}
              onChange={handleStatusChange}
              className="form_params"
            >
              <option value="">Select a Status</option>
              {statuses.map((el) => (
                <option key={el.value} value={el.name}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="buttons_container">
          <button
            className="cancel button"
            onClick={() => setCreateUserTable(false)}
          >
            Cancel
          </button>
          <button className="new_add button" onClick={addUser}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
