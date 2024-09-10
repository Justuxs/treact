import React, { useState, useEffect } from "react";
import axios from "axios";
import AdvertisementTypeAPI from "API/AdvertisementTypeAPI";

const CreateAdvertisement = () => {
  const [advertisement, setAdvertisement] = useState({
    title: "",
    description: "",
    price: "",
    isPrice: false,
    advertisementTypeId: "",
  });

  const [advertisementTypes, setAdvertisementTypes] = useState([]);

  useEffect(() => {
    const fetchAdvertisementTypes = async () => {
      try {
        const response = await AdvertisementTypeAPI.getAdvertisementTypes();
        if (response.IsSuccess) {
          console.log(response);
          console.log(response.Data);
          setAdvertisementTypes(response.Data);
        } else {
          console.error(
            "Error fetching advertisement types",
            response.ErrorMessage
          );
        }
      } catch (error) {
        console.error("Error fetching advertisement types", error);
      }
    };
    fetchAdvertisementTypes(); // Call the async function
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdvertisement({
      ...advertisement,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken"); // Assuming JWT token is stored in local storage

    axios
      .post("/api/advertisement", advertisement, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("Advertisement created successfully!");
        // Optionally, redirect or clear form
      })
      .catch((error) => {
        console.error("Error creating advertisement", error);
        alert("Failed to create advertisement");
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 tw="text-2xl font-semibold text-gray-800 mb-6">
        Create Advertisement
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={advertisement.title}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            name="description"
            value={advertisement.description}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price:
          </label>
          <input
            type="number"
            name="price"
            value={advertisement.price}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="isPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Is Price Negotiable:
          </label>
          <input
            type="checkbox"
            name="isPrice"
            checked={advertisement.isPrice}
            onChange={handleInputChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        </div>

        <div tw="mb-6">
          <label
            htmlFor="advertisementTypeId"
            className="block text-sm font-medium text-gray-700"
          >
            Advertisement Type:
          </label>
          <select
            name="advertisementTypeId"
            value={advertisement.advertisementTypeId}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Type</option>
            {advertisementTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Advertisement
        </button>
      </form>
    </div>
  );
};

export default CreateAdvertisement;
