import { useEffect, useState } from "react";
import { Employee, Department, Country, Status } from "../../types";
import departments from "../../data/departments.json";
import countries from "../../data/countries.json";
import statuses from "../../data/statuses.json";
import "./style.css";

interface Props {
  users: Employee[];
  setUsers: (list: Employee[]) => void;
}

export const EditPage: React.FC<Props> = ({ users, setUsers }) => {
  const [choosedUser, setChoosedUser] = useState<Employee | null>(null);
  const [inputText, setInputText] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  const [checkChanges, setCheckChanges] = useState(false);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUser =
      users.find((user) => user.name === event.target.value) || null;
    setChoosedUser(selectedUser);

    if (selectedUser) {
      setSelectedDepartment(selectedUser.department);
      setSelectedCountry(selectedUser.country);
      setSelectedStatus(selectedUser.status);
      setInputText(selectedUser.name);
    } else {
      setSelectedDepartment(null);
      setSelectedCountry(null);
      setSelectedStatus(null);
      setInputText("");
    }
  };

  const changeUserData = () => {
    if (
      !inputText ||
      !selectedDepartment ||
      !selectedCountry ||
      !selectedStatus
    ) {
      return;
    }

    const newList = users.map((person) => {
      if (person.name === choosedUser?.name) {
        return {
          name: inputText,
          status: selectedStatus,
          department: selectedDepartment,
          country: selectedCountry,
        };
      } else {
        return person;
      }
    });

    setUsers(newList);

    setChoosedUser(null);
    setSelectedDepartment(null);
    setSelectedCountry(null);
    setSelectedStatus(null);
    setInputText("");
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleUndo = () => {
    if (choosedUser) {
      setSelectedDepartment(choosedUser.department);
      setSelectedCountry(choosedUser.country);
      setSelectedStatus(choosedUser.status);
      setInputText(choosedUser.name);
    }
  };

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDept =
      departments.find(
        (department) => department.name === event.target.value
      ) || null;
    setSelectedDepartment(selectedDept);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCntry =
      countries.find((country) => country.name === event.target.value) || null;
    setSelectedCountry(selectedCntry);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSts =
      statuses.find((status) => status.name === event.target.value) || null;
    setSelectedStatus(selectedSts);
  };

  useEffect(() => {
    if (
      choosedUser &&
      (choosedUser.name !== inputText ||
        choosedUser.country?.name !== selectedCountry?.name ||
        choosedUser.department?.name !== selectedDepartment?.name ||
        choosedUser.status?.name !== selectedStatus?.name)
    ) {
      setCheckChanges(true);
    } else {
      setCheckChanges(false);
    }
  }, [
    inputText,
    selectedDepartment,
    selectedCountry,
    selectedStatus,
    choosedUser,
  ]);

  return (
    <div className="edit">
      <div className="edit_head">Edit User</div>

      <div className="details_container">
        <div className="user_container">
          <p className="select_name">User</p>
          <select name="User" id="" onChange={handleUserChange}>
            <option value="default">Choose user</option>
            {users.map((el) => (
              <option key={el.name} value={el.name}>
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <h1 className="details_name">User Information</h1>
        <div className="select_grid">
          <div className="select_container">
            <p className="select_name">Full Name</p>
            <input
              type="text"
              value={inputText}
              onChange={handleNameChange}
              className="change_name"
            />
          </div>
          <div className="select_container">
            <p className="select_name">Department</p>
            <select
              name="Department"
              onChange={handleDepartmentChange}
              value={selectedDepartment?.name || ""}
            >
              <option value="">Choose department</option>
              {departments.map((department) => (
                <option key={department.name} value={department.name}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div className="select_container">
            <p className="select_name">Country</p>
            <select
              name="Country"
              onChange={handleCountryChange}
              value={selectedCountry?.name || ""}
            >
              <option value="">Choose country</option>
              {countries.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="select_container">
            <p className="select_name">Status</p>
            <select
              name="Status"
              onChange={handleStatusChange}
              value={selectedStatus?.name || ""}
            >
              <option value="">Choose status</option>
              {statuses.map((status) => (
                <option key={status.name} value={status.name}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="button_container">
        {checkChanges && (
          <button className="undo button" onClick={() => handleUndo()}>
            Undo
          </button>
        )}
        <button className="save button" onClick={changeUserData}>
          Save
        </button>
      </div>
    </div>
  );
};
