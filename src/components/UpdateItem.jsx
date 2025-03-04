import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateItem = ({ API_URI }) => {
  const [item, setItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState("");
  const [error, setError] = useState(null);

  // Fetch the existing door item when the component mounts
  useEffect(() => {
    axios
      .get(`${API_URI}/1`)  
      .then((response) => {
        setItem(response.data); 
        setUpdatedItem(response.data.name); 
      })
      .catch((error) => {
        setError(error.message); 
      });
  }, [API_URI]);

  // Handle the input change for the updated door name
  const handleInputChange = (e) => {
    setUpdatedItem(e.target.value);
  };

  // Handle the update request when the submit button is clicked
  const handleUpdate = () => {
    if (!item) return; // Avoid updating if there's no item to update

    // Send a PUT request to update the door
    axios
      .put(`${API_URI}/${item.id}`, {
        name: updatedItem, // Send the updated name to the API
      })
      .then((response) => {
        setItem(response.data); // Update the item state with the updated door data
      })
      .catch((error) => {
        setError(error.message); // Handle error if update fails
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Update Door</h2>
      <p>Current Name: {item.name}</p> {/* Display current door name */}
      <input
        type="text"
        value={updatedItem}
        onChange={handleInputChange} // Handle input change
      />
      <button onClick={handleUpdate}>Update</button> {/* Handle update */}
    </div>
  );
};

export default UpdateItem;