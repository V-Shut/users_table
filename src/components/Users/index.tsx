import { Country, Department, Employee, Status } from "../../types";
import "./style.css";

interface Props {
  users: Employee[] | undefined;
  departments: Department[] | undefined;
  countries: Country[] | undefined;
  statuses: Status[] | undefined;
}

export const Users: React.FC<Props> = ({
  users,
  departments,
  countries,
  statuses,
}) => {
  return (
    <div className="users">
      <div className="params">
        <h1 className="users_head">users</h1>
        <p className="instructions">
          Please add at least 3 departmetns to be able to proceed next steps.
        </p>
        <div className="params_container">
          <select className="params_select" name="" id="">
            departments
          </select>
          <select className="params_select" name="" id="">
            country
          </select>
          <select className="params_select" name="" id="">
            statuses
          </select>
          <button className="delete button">
            <img src="./img/basket.png" alt="delete button" />
          </button>
          <button className="add button">Add User</button>
        </div>
      </div>
      <table className="users_table">
        <thead>
          <tr className="table_head">
            <th>Full Name</th>
            <th>Department</th>
            <th>Country</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr>
              <td className="line name">{user.name}</td>
              <td className="line">{user.department.name}</td>
              <td className="line">{user.country.name}</td>
              <td className="line">{user.status.name}</td>
              <button className="delete_user">
                <img src="./img/basket.png" alt="delete user button" />
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
