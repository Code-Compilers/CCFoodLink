import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Donation.css"; // Import the CSS file for styling

const Donation = () => {
  const [formData, setFormData] = useState({
    donorName: "",
    contactDetails: "",
    foodCategory: [],
    deliveryOption: "",
    physicalAddress: "",
    description: "",
  });

  const foodCategories = ["Grains", "Vegetables", "Fruits", "Dairy", "Protein"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (category) => {
    setFormData((prev) => ({
      ...prev,
      foodCategory: prev.foodCategory.includes(category)
        ? prev.foodCategory.filter((item) => item !== category)
        : [...prev.foodCategory, category],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/donations/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, foodCategory: formData.foodCategory.join(",") }),
    });
    if (response.ok) {
      alert("Donation submitted!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="donorName" placeholder="Name of Donor" onChange={handleChange} required />
      <input name="contactDetails" placeholder="Contact Details" onChange={handleChange} required />

      <fieldset>
        <legend>Food Category</legend>
        {foodCategories.map((category) => (
          <label key={category}>
            <input type="checkbox" onChange={() => handleCheckboxChange(category)} />
            {category}
          </label>
        ))}
      </fieldset>

      <select name="deliveryOption" onChange={handleChange}>
        <option value="">Select Delivery Option</option>
        <option value="Delivery">Delivery</option>
        <option value="Collect">Collect</option>
      </select>

      <input name="physicalAddress" placeholder="Physical Address" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />

      <button type="submit">Donate</button>
    </form>
  );
};

export default DonationForm;
