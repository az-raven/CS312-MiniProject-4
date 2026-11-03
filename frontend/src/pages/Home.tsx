import { Block } from "../components/Block";
import MainContainer from "../components/MainContainer";
import type { Post } from "../types/Post";
import RenderPost from "../components/RenderPost";
import PostEditor from "../components/PostEditor";

export default function Home(posts: Post[], setPosts: (p: () => Post[]) => void) {
	return MainContainer(Block(<>
		{ PostEditor(posts, setPosts) }
		{ posts.map(RenderPost) }
	</>));
}