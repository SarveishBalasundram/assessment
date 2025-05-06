import { useEffect, useState } from 'react';
import './CategoryFilter.css';

// Used as a filter where user can select more than one category as a filter for posts.
function CategoryFilter({ categories, onFilterChange, searchParams }) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const categoriesParam = searchParams.get('categories');
    if (categoriesParam) {
      const initialSelected = categoriesParam.split(',');
      setSelectedCategories(initialSelected);
      onFilterChange(initialSelected);
    }
  }, []);

  const handleCategoryChange = (category) => {
    let newSelected;

    if (selectedCategories.includes(category)) {
      newSelected = selectedCategories.filter((c) => c !== category);
    } else {
      newSelected = [...selectedCategories, category];
    }

    setSelectedCategories(newSelected);
    onFilterChange(newSelected);
  };

  return (
    <div className="category-filter">
      <h3>Filter by Category</h3>
      <div className="category-option">
        {categories.map((category) => (
          <label key={category} className="checkbox-categories">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
