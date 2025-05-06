import { Link } from 'react-router-dom';
import './PostList.css';

function PostList({ posts }) {
  if (posts.length === 0) {
    return (
      <div className="Nullposts">No posts found matching your criteria.</div>
    );
  }

  return (
    <section className="posts-grid">
      {posts.map((post) => (
        <article key={post.id} className="post-card no-image">
          <div className="post-header">
            <span className="post-category">
              {post.categories.map((cat) => cat.name).join(', ')}
            </span>
            <h2 className="post-title">{post.title}</h2>
          </div>

          <div className="post-meta">
            <img
              src={post.author?.avatar || 'https://via.placeholder.com/40'}
              alt={post.author?.name || 'Author'}
              className="author-avatar"
            />
            <span className="author-name">
              {post.author?.name || 'Unknown Author'}
            </span>
          </div>

          <p className="post-excerpt">
            {post.summary
              ? post.summary.substring(0, 200)
              : 'No content available'}
            ...
          </p>

          <Link to={`/post/${post.id}`} className="read-more">
            Read More →
          </Link>
        </article>
      ))}
    </section>
  );
}

export default PostList;
