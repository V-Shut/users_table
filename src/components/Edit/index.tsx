import "./style.css";

export const EditPage = () => {
  return (
    <div className="edit">
      <div className="edit_head">edit user</div>

      <div className="details_container">
        <div className="user_container">
          <p className="select_name">User</p>
          <select name="" id=""></select>
        </div>
        <h1 className="details_name">User Information</h1>
        <div className="select_grid">
          <div className="select_container">
            <p className="select_name">Full Name</p>
            <select name="" id=""></select>
          </div>
          <div className="select_container">
            <p className="select_name">Department</p>
            <select name="" id=""></select>
          </div>
          <div className="select_container">
            <p className="select_name">Country</p>
            <select name="" id=""></select>
          </div>
          <div className="select_container">
            <p className="select_name">Status</p>
            <select name="" id=""></select>
          </div>
        </div>
      </div>

      <div className="button_container">
        <button className="undo button">Undo</button>
        <button disabled className="save button">Save</button>
      </div>
    </div>
  );
};
