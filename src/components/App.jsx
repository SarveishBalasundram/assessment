import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostDetail from './PostDetail/PostDetail';
import './App.css';
import MainPage from './MainPage';

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        console.log('Fetched posts:', data);

        const postsWithAuthor = data.posts.map((post) => ({
          ...post,
          author: {
            name: post.author?.name || 'Unknown Author',
            avatar: post.author?.avatar || 'https://via.placeholder.com/40',
          },
        }));

        setPosts(postsWithAuthor);
        setFilteredPosts(postsWithAuthor);

        const getAllUniqueCategories = [
          ...new Set(
            postsWithAuthor.flatMap((post) =>
              post.categories.map((cat) => cat.name)
            )
          ),
        ];
        setCategories(getAllUniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>
            <Link to="/">Post Blogs</Link>
          </h1>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                posts={posts}
                filteredPosts={filteredPosts}
                setFilteredPosts={setFilteredPosts}
                categories={categories}
                loading={loading}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                postsPerPage={postsPerPage}
              />
            }
          />
          <Route path="/post/:id" element={<PostDetail posts={posts} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
