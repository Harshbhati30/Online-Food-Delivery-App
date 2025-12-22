import React, { useState } from "react";
import { categories } from "../../assets/assets";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import "./Explore.css";

const Explore = () => {
  const [category, setCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  return (
    <div className="explore-page">
      {/* Search Section */}
      <div className="search-section">
        <div className="container">
          <div className="search-header">
            <h2 className="search-title">
              Find Your Favorite Food
              <span className="search-title-dot"></span>
            </h2>
            <p className="search-subtitle">
              Discover delicious dishes from our extensive menu
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="search-form"
              >
                <div className="search-wrapper">
                  {/* Category Filter */}
                  <div className="category-filter">
                    <i className="bi bi-filter-circle filter-icon"></i>
                    <select
                      className="category-select"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                      value={category}
                    >
                      <option value="All">All Categories</option>
                      <option value="Briyani">Briyani</option>
                      <option value="Cake">Cake</option>
                      <option value="Pizza">Pizza</option>
                      <option value="Burger">Burger</option>
                      <option value="Spring Rolls">Spring Rolls</option>
                      <option value="Ice-Cream">Ice-Cream</option>
                      <option value="Salad">Salad</option>
                      <option value="Non-Veg">Non-Veg</option>
                    </select>
                  </div>

                  {/* Search Input */}
                  <div className="search-input-wrapper">
                    <i className="bi bi-search search-icon"></i>
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search for dishes, cuisines, or ingredients..."
                      onChange={(e) => setSearchText(e.target.value)}
                      value={searchText}
                    />
                    {searchText && (
                      <button
                        type="button"
                        className="clear-btn"
                        onClick={() => setSearchText("")}
                      >
                        <i className="bi bi-x-circle-fill"></i>
                      </button>
                    )}
                  </div>

                  {/* Search Button */}
                  <button className="search-btn" type="submit">
                    <i className="bi bi-search"></i>
                    <span className="search-btn-text">Search</span>
                  </button>
                </div>

                {/* Active Filters Display */}
                {(category !== "All" || searchText) && (
                  <div className="active-filters">
                    <span className="filter-label">Active filters:</span>
                    {category !== "All" && (
                      <span className="filter-tag">
                        <i className="bi bi-tag-fill"></i>
                        {category}
                        <button
                          className="remove-filter"
                          onClick={() => setCategory("All")}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </span>
                    )}
                    {searchText && (
                      <span className="filter-tag">
                        <i className="bi bi-search"></i>
                        "{searchText}"
                        <button
                          className="remove-filter"
                          onClick={() => setSearchText("")}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </span>
                    )}
                    <button
                      className="clear-all-filters"
                      onClick={() => {
                        setCategory("All");
                        setSearchText("");
                      }}
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Food Display Section */}
      <FoodDisplay category={category} searchText={searchText} />
    </div>
  );
};

export default Explore;