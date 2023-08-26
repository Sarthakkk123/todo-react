import React, { useState } from "react";

function TodoList() {
  const [activity, setActivity] = useState("");
  const [listData, setListData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState(""); // New state to track edited text

  function addActivity() {
    setListData((prevListData) => {
      const updatedList = [...prevListData, activity];
      setActivity("");
      return updatedList;
    });
  }

  function removeActivity(activityToRemove) {
    const updatedListData = listData.filter((elem) => {
      return elem !== activityToRemove;
    });
    setListData(updatedListData);
  }

  function startEditing(index, initialText) {
    setEditingIndex(index);
    setEditedText(initialText);
  }

  function saveEdit(index) {
    const updatedListData = [...listData];
    updatedListData[index] = editedText;
    setListData(updatedListData);
    setEditingIndex(null);
    setEditedText("");
  }

  function cancelEdit() {
    setEditingIndex(null);
    setEditedText("");
  }

  function removeAll() {
    setListData([]);
  }

  return (
    <div className="container">
      <div className="header">TODO LIST</div>
      <div className="input-container">
        <input type="text" className="add-input"
          placeholder="Add Activity" value={activity}
          onChange={(e) => setActivity(e.target.value)} />
        <button type="button" className="add-button"
          onClick={addActivity} disabled={activity.trim() === ""} >
          Add
        </button>
      </div>

      <p className="list-heading">Here is your list {": )"}</p>

      {listData.length !== 0 &&
        listData.map((data, index) => (
          <div className="listData" key={data}>
            <div className="activity">
              {editingIndex === index ? (
                <div>
                  <input className="user-input" type="text" value={editedText}
                    onChange={(e) => setEditedText(e.target.value)} />
                </div>
              ) : (
                <div>{data}</div>
              )}
            </div>
            <div className="buttons">
              {editingIndex === index ? (
                <React.Fragment>
                  <button type="button" className="update-button"
                    onClick={() => saveEdit(index)} >
                    Update
                  </button>
                  <button type="button" className="cancel-button" onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button type="button" className="edit-button"
                    onClick={() => startEditing(index, data)} >
                    Edit
                  </button>
                  <button type="button" className="remove-button"
                    onClick={() => removeActivity(data)} >
                    Remove
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>
        ))}
      {listData.length > 0 && (
        <button className="remove-all-button" onClick={removeAll}>
          Remove All
        </button>
      )}
    </div>
  );
}

export default TodoList;
