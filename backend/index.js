// config
const PORT = 8080;

// imports
const express = require('express');
const { StatusCodes } = require('http-status-codes');

// mock db - users
const users = {
	admin: {
		username: "admin",
		password: "1234"
	},
	rose: {
		username: "rose",
		password: "1234"
	}

};

// mock db - posts
const posts = [
	{
		title: "My Blog Post",
		author: "rose",
		created: new Date("Mon Sep 14 2026 17:45:11 GMT-0700 (Mountain Standard Time)"),
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
];

// create base app
const app = express();
// apply static file serving to send frontend to client
app.use(express.static("../frontend/dist"));

// create router for api specifically
const apiRouter = express.Router();
// apply middleware to parse 
apiRouter.use(express.json());

// apply router to base route
app.use("/api/v1/", apiRouter);

apiRouter.route("/posts")
	// GET /api/v1/posts - list all posts
	.get(async (_, res) => {
		// return all posts formatted as JSON
		res.status(StatusCodes.OK).json({
			success: true,
			code: "success",
			message: "Successfully fetched posts.",
			posts,
		});
	})
	// POST /api/v1/posts - create new post
	.post(async (req, res) => {
		// ensure body is present, minimal validation as this is an mvp
		if (!req.body) {
			return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
				success: false,
				code: "no_body",
				message: "This endpoint requires an HTTP body encoded as application/json, but you did not provide one.",
				posts,
			});
		}

		// TODO auth

		const { title, created, content } = req.body;

		posts.push({
			title,
			author: "rose", // TODO auth
			created: new Date(created),
			content,
		});
		posts.sort((a, b) => a.created - b.created);

		res.status(200).json({
			success: true,
			code: "success",
			message: "Successfully created post.",
			posts,
		});
	});

apiRouter.route("/posts/:id")
	// POST /api/v1/posts/:id - edit post
	.post(async (req, res) => {
		// parse params
		const { id } = req.params;

		// minimal body validation
		if (!req.body) {
			return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
				success: false,
				code: "no_body",
				message: "This endpoint requires an HTTP body encoded as application/json, but you did not provide one.",
				posts,
			});
		}

		// TODO auth

		// get body
		const { title, content, created } = req.body;

		posts[id].title = title;
		posts[id].content = content;
		posts[id].created = new Date(created);

		return res.status(200).json({
			success: true,
			code: "success",
			message: "Post successfully edited.",
			posts,
		})
	})
	// DELETE /api/v1/posts/:id - delete post
	.delete(async (req, res) => {
		// parse params
		const { id } = req.params;

		// TODO auth
		
		// remove post
		posts.splice(id, 1);

		res.status(200).json({
			success: true,
			code: "success",
			message: "Successfully deleted post.",
			posts,
		});
	});

apiRouter.route("/users")
	// POST /api/v1/users - create user (sign up)
	.post(async (req, res) => {
		// minimal validation on body
		if (!req.body) {
			return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
				success: false,
				code: "no_body",
				message: "This endpoint requires an HTTP body encoded as application/json, but you did not provide one.",
			});
		}

		const { username, password } = req.body;

		// prevent duplicates
		if (Object.keys(users).findIndex(username.toLowerCase()) !== -1) {
			return res.status(StatusCodes.CONFLICT).json({
				success: false,
				code: "username_taken",
				message: "You are attempting to create an account with a username that is taken. Please choose another username.",
			});
		}

		users[username.toLowerCase()] = {
			username,
			password,
		};

		res.status(200).json({
			success: false,
			code: "success",
			message: "Account successfully created. You may now log in."
		});
	});

apiRouter.route("/sessions")
	// POST /api/v1/sessions - create session (sign in)
	.post(async (req, res) => {
		// TODO auth
	});


// start server
app.listen(PORT);
