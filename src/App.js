import React, { useEffect, useState } from "react";
import "./App.css";

function getAllLocations(companies) {
  const locs = companies.flatMap(c => c.locations);
  return ["All Cities", ...Array.from(new Set(locs))];
}

function App() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Cities");

  useEffect(() => {
    fetch("/companies data.json")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch(() => setCompanies([]));
  }, []);

  const locations = getAllLocations(companies);

  const filteredCompanies = companies.filter((company) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      company.name.toLowerCase().includes(searchLower) ||
      company.category.toLowerCase().includes(searchLower) ||
      company.locations.some((loc) => loc.toLowerCase().includes(searchLower));
    const matchesLocation =
      selectedLocation === "All Cities" ||
      company.locations.includes(selectedLocation);
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="main-bg">
      <div className="hero-header">
      </div>
      <section className="content-section">
        <div className="filters-bar">
          <input
            className="search-bar"
            type="text"
            placeholder="Search companies by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="location-filters">
            {locations.map((loc) => (
              <button
                key={loc}
                className={`loc-btn${selectedLocation === loc ? " active" : ""}`}
                onClick={() => setSelectedLocation(loc)}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
        <div className="companies-header">
          <h2>Available Companies</h2>
          <span className="companies-count">
            Showing {filteredCompanies.length} companies
          </span>
        </div>
        <div className="companies-grid">
          {filteredCompanies.length === 0 ? (
            <div className="no-data">No companies found.</div>
          ) : (
            filteredCompanies.map((company, idx) => (
              <div className="company-card" key={idx}>
                <h3>{company.name}</h3>
                <span className="category-badge">{company.category}</span>
                <div className="location-list">
                  <span role="img" aria-label="location">📍</span>
                  {company.locations.join(", ")}
                </div>
                <a
                  className="careers-btn"
                  href={company.careers_page}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Careers →
                </a>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
