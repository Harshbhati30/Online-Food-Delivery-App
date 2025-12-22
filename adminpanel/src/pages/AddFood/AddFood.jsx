import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { addFood } from "../../services/foodService";
import { toast } from "react-toastify";
import "./AddFood.css";

const AddFood = () => {
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error("Please upload an image");
      return;
    }
    try {
      await addFood(data, image);
      toast.success("Food Added Successfully");
      setData({ name: "", description: "", category: "", price: "" });
      setImage(null);
    } catch (error) {
      toast.error("Error in adding food");
    }
  };

  return (
    <div className="add-food-container">
      <div className="add-food-header">
        <h2 className="page-title">
          <i className="bi bi-plus-circle"></i>
          Add New Food Item
        </h2>
        <p className="page-subtitle">Fill in the details to add a new food item to your menu</p>
      </div>

      <div className="add-food-content">
        <div className="add-food-card">
          <div className="image-upload-section">
            <label htmlFor="image" className="image-upload-label">
              <div className="image-preview">
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="Preview" className="preview-img" />
                ) : (
                  <div className="upload-placeholder">
                    <i className="bi bi-cloud-upload"></i>
                    <span>Click to upload image</span>
                    <small>PNG, JPG up to 5MB</small>
                  </div>
                )}
              </div>
              {image && (
                <button 
                  type="button" 
                  className="change-image-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setImage(null);
                  }}
                >
                  <i className="bi bi-arrow-repeat"></i>
                  Change Image
                </button>
              )}
            </label>
            <input
              type="file"
              id="image"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="form-section">
            <div className="form-grid">
              {/* Food Name */}
              <div className="form-group full-width">
                <label htmlFor="name" className="form-label">
                  <i className="bi bi-pencil"></i>
                  Food Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="name"
                  placeholder="e.g., Chicken Biryani"
                  required
                  name="name"
                  onChange={onChangeHandler}
                  value={data.name}
                />
              </div>

              {/* Description */}
              <div className="form-group full-width">
                <label htmlFor="description" className="form-label">
                  <i className="bi bi-card-text"></i>
                  Description
                </label>
                <textarea
                  className="form-textarea"
                  id="description"
                  rows="4"
                  required
                  placeholder="Describe your food item..."
                  name="description"
                  onChange={onChangeHandler}
                  value={data.description}
                ></textarea>
              </div>

              {/* Category */}
              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  <i className="bi bi-tag"></i>
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  className="form-select"
                  onChange={onChangeHandler}
                  value={data.category}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Briyani">Biryani</option>
                  <option value="Cake">Cake</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Burger">Burger</option>
                  <option value="Spring Rolls">Spring Rolls</option>
                  <option value="Ice-Cream">Ice-Cream</option>
                  <option value="Salad">Salad</option>
                  <option value="Non-Veg">Non-Veg</option>
                </select>
              </div>

              {/* Price */}
              <div className="form-group">
                <label htmlFor="price" className="form-label">
                  <i className="bi bi-currency-rupee"></i>
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  className="form-input"
                  placeholder="200"
                  id="price"
                  onChange={onChangeHandler}
                  value={data.price}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button 
                type="button" 
                className="btn-cancel"
                onClick={() => {
                  setData({ name: "", description: "", category: "", price: "" });
                  setImage(null);
                }}
              >
                <i className="bi bi-x-circle"></i>
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-submit"
                onClick={onSubmitHandler}
              >
                <i className="bi bi-check-circle"></i>
                Save Food Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;