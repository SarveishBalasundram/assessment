import { useParams, Link } from 'react-router-dom';
import './PostDetail.css';

//Used to show the detailed individual post information based on id selected.
function PostDetail({ posts }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id === parseInt(id) || p.id === id);

  if (!post) {
    return (
      <div className="post-detail-container">
        <div className="post-notFound">
          <h2>Post not found</h2>
          <Link to="/" className="back-link">
            Back to all posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <Link to="/" className="back-link">
        ← Back to all posts
      </Link>

      <article className="post-detail">
        <span className="post-category">
          {post.categories.map((cat) => cat.name).join(', ')}
        </span>

        <h1 className="post-title">{post.title}</h1>

        <div className="post-main">
          <div className="author-info">
            <img
              src={post.author?.avatar || 'https://via.placeholder.com/40'}
              alt={post.author?.name || 'Author'}
              className="author-avatar"
            />
            <span className="author-name">
              {post.author?.name || 'Anonymous'}
            </span>
          </div>
          <span className="post-date">{post.date || 'Unknown date'}</span>
        </div>

        <div className="post-content">
          <p>{post.content}</p>
        </div>
      </article>
    </div>
  );
}

export default PostDetail;
