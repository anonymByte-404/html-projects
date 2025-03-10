async function fetchPosts() {
  const response = await fetch('http://localhost:3000/posts')
  const posts = await response.json()
  const postsContainer = document.getElementById('posts-container')

  posts.forEach(post => {
    const article = document.createElement('article')
    article.innerHTML = `
      <h2>${post.title}</h2>
      <img src="${post.image}" alt="${post.title}">
      <p>${post.content}</p>
    `
    postsContainer.appendChild(article);
  })
}

document.getElementById('post-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value
  const content = document.getElementById('content').value;
  const image = document.getElementById('image').value

  const newPost = { title, content, image }

  const response = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  })

  const result = await response.json()
  document.getElementById('message').innerText = result.message

  document.getElementById('post-form').reset()
})

fetchPosts()
