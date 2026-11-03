import { useState } from "react";
import type { Post } from "../types/Post";

export default function PostEditor(posts: Post[], setPosts: (p: () => Post[]) => void) {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [date, setDate] = useState(Date.now())
	const [content, setContent] = useState("")

	return (<form action="/post/new" method="post" className="block">
		<input
			type="text"
			id="post-creation-title"
			placeholder="Your Post Title"
			value={title}
			onChange={e => setTitle(e.target.value)}
		/>
		<div id="post-creation-details">
			Written by
			<input
				type="text"
				id="post-creation-author"
				placeholder="John Doe"
				value={author}
				onChange={e => setAuthor(e.target.value)}
			/>
			on
			<input
				type="datetime-local"
				id="post-creation-date"
				value={date}
				onChange={e => setDate(e.target.valueAsNumber)}
			/>
		</div>
		<textarea
			name="content"
			id="post-creation-content"
			rows={15}
			spellCheck={true}
			value={content}
			onChange={e => setContent(e.target.value)}
		/>
		<input type="submit" value="Create Post" id="post-creation-submit" />
	</form>)
}