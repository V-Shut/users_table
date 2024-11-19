import { useState, useEffect, useRef } from "react";
import "./style.css";
import { Employee } from "../../types";
import departments from "../../data/departments.json";
import countries from "../../data/countries.json";
import statuses from "../../data/statuses.json";
import { NewUserTable } from "../NewUserTab";

interface Props {
  users: Employee[];
  setUsers: (list: Employee[]) => void;
}

export const Users: React.FC<Props> = ({ users, setUsers }) => {
  const [currUsers, setCurrUsers] = useState<Employee[] | undefined>(undefined);
  const [createUserTable, setCreateUserTable] = useState(false);
  const [selectedDeps, setSelectedDeps] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const clearFilters = () => {
    setSelectedDeps([]);
    setSelectedStatus([]);
    setSelectedCountry([]);
  };

  const handleCheckboxChange = (department: string) => {
    setSelectedDeps((prev) =>
      prev.includes(department)
        ? prev.filter((dep) => dep !== department)
        : [...prev, department]
    );
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCountry(value ? [value] : []);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatus(value ? [value] : []);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const filterUsers = () => {
    let filteredUsers = users;

    if (selectedDeps.length > 0) {
      filteredUsers = filteredUsers?.filter((user) =>
        selectedDeps.includes(user.department.value)
      );
    }

    if (selectedStatus.length > 0) {
      filteredUsers = filteredUsers?.filter((user) =>
        selectedStatus.includes(user.status.value)
      );
    }

    if (selectedCountry.length > 0) {
      filteredUsers = filteredUsers?.filter((user) =>
        selectedCountry.includes(user.country.value)
      );
    }

    setCurrUsers(filteredUsers);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setCurrUsers(users);
  }, [users]);

  useEffect(() => {
    if (selectedDeps.length < 3) {
      setSelectedCountry([]);
      setSelectedStatus([]);
    }
    filterUsers();
  }, [selectedDeps, selectedStatus, selectedCountry, users]);

  return (
    <>
      {createUserTable && (
        <NewUserTable
          setCreateUserTable={setCreateUserTable}
          setUsers={setUsers}
          users={users}
        />
      )}
      <div className="users">
        <div className="params">
          <h1 className="users_head">Users</h1>
          <p className="instructions">
            Please add at least 3 departments to be able to proceed to next
            steps.
          </p>
          <div className="params_container">
            <div className="dropdown" ref={dropdownRef}>
              <button className="dropdown_button" onClick={toggleDropdown}>
                Selected {selectedDeps.length}
              </button>
              {isDropdownOpen && (
                <div className="dropdown_menu">
                  {departments.map((el) => (
                    <div key={el.value} className="dropdown_item">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectedDeps.includes(el.value)}
                        onChange={() => handleCheckboxChange(el.value)}
                      />
                      {el.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <select
              className="params_select"
              disabled={selectedDeps.length < 3}
              onChange={handleCountryChange}
              value={selectedCountry}
            >
              <option value="">Select country</option>
              {countries.map((el) => (
                <option key={el.value} value={el.value}>
                  {el.name}
                </option>
              ))}
            </select>

            <select
              className="params_select"
              disabled={selectedDeps.length < 3}
              onChange={handleStatusChange}
              value={selectedStatus}
            >
              <option value="">Select status</option>
              {statuses.map((el) => (
                <option key={el.value} value={el.value}>
                  {el.name}
                </option>
              ))}
            </select>
            <button className="delete button" onClick={clearFilters}>
              <img src="./img/basket.png" alt="delete button" />
            </button>
            <button
              className="add button"
              onClick={() => setCreateUserTable(true)}
            >
              Add User
            </button>
          </div>
        </div>
        <table className="users_table">
          <thead>
            <tr className="table_head">
              <th>Full Name</th>
              <th>Department</th>
              <th>Country</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currUsers?.map((user) => (
              <tr key={user.name}>
                <td className="line name">{user.name}</td>
                <td className="line">{user.department.name}</td>
                <td className="line">{user.country.name}</td>
                <td className="line">{user.status.name}</td>
                <td>
                  <button
                    className="delete_user"
                    onClick={() =>
                      setUsers(
                        users?.filter(
                          (person) =>
                            person.name !== user.name &&
                            person.department.name !== user.department.name
                        )
                      )
                    }
                  >
                    <img src="./img/basket.png" alt="delete user button" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
