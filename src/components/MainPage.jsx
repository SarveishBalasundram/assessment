import PostList from './PostList/PostList';
import CategoryFilter from './CategoryFilter/CategoryFilter';
import Pagination from './Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
//This component acts as the main bridge for other components to be worked on.
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

  //This handles the real-time filter change of the post according to selected categories.
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

  //Used for pagination purposes, and dividing the posts according to the number of pages generated.
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
