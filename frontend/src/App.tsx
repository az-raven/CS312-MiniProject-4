import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import type { Post } from './types/Post';
import Home from './pages/Home';

function App() {
	const [posts, setPosts] = useState([] as Post[]);

	useEffect(() => {
		refreshPosts().then(p => setPosts(p))
	}, [])

  return (
    <>
      { Header() }
      { Home(posts, setPosts) }
    </>
  )
}

async function refreshPosts() {
  const res = await fetch("/api/v1/posts")
  const json = await res.json()

  if (!json.success) {
    return []
  } else {
    return json.posts
  }
}

export default App
