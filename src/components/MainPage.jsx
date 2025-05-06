import PostList from './PostList/PostList';
import CategoryFilter from './CategoryFilter/CategoryFilter';
import Pagination from './Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

function MainPage({
  posts,
  filteredPosts,
  setFilteredPosts,
  categories,
  loading,
  currentPage,
  setCurrentPage,
  postsPerPage,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (selectedCategories) => {
    if (selectedCategories.length === 0) {
      setFilteredPosts(posts);
      setSearchParams({});
    } else {
      const filtered = posts.filter((post) =>
        post.categories.some((cat) => selectedCategories.includes(cat.name))
      );
      setFilteredPosts(filtered);

      setSearchParams({ categories: selectedCategories.join(',') });
    }
    setCurrentPage(1);
  };

  const lastPostNo = currentPage * postsPerPage;
  const firstPageNo = lastPostNo - postsPerPage;
  const currentPosts = Array.isArray(filteredPosts)
    ? filteredPosts.slice(firstPageNo, lastPostNo)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mainContent">
      <CategoryFilter
        categories={categories}
        onFilterChange={handleFilterChange}
        searchParams={searchParams}
      />

      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : (
        <>
          <PostList posts={currentPosts} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={filteredPosts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
}
export default MainPage;
