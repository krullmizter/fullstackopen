const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  });
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorCounts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  const maxAuthor = Object.keys(authorCounts).reduce((a, b) => {
    return authorCounts[a] > authorCounts[b] ? a : b;
  });

  return {
    author: maxAuthor,
    blogs: authorCounts[maxAuthor],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const authorLikes = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  const maxAuthor = Object.keys(authorLikes).reduce((a, b) => {
    return authorLikes[a] > authorLikes[b] ? a : b;
  });

  return {
    author: maxAuthor,
    likes: authorLikes[maxAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
