import type { Post } from "../types/Post";

export default function RenderPost(post: Post) {
	return (
		<article className="block">
			<h2 className="post-title">{ post.title }</h2>
			<span className="post-details">Written by {post.title} on { post.created.toString() }</span>
			<p className="post-content">
				{ post.content }
			</p>
			<form action="/post/<%= i %>/delete" method="post" className="action-container">
				<a href="/editor/<%= i %>" className="inline-button">Edit</a>
				<input type="submit" value="Delete" className="inline-button"/>
			</form>
		</article>
	)
}