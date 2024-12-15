// index.js
const express = require('express');
const pool = require('./database');
const cors = require('cors')
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "1234";

const app = express();

app.use(cors());

// The express.json() function is a built-in middleware function in Express. 
// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

//POST method
app.post('/api/posts/', async (req, res) => {
    try {
        console.log("a post request has arrived");
        const post = req.body;
        const newpost = await pool.query(
            "INSERT INTO \"POSTS\"(\"BODY\", \"DATE\") values ($1, $2)    RETURNING*", [post.BODY, post.DATE]
            // $1, $2, $3 are mapped to the first, second and third element of the passed array (post.title, post.body, post.urllink) 
            // The RETURNING keyword in PostgreSQL allows returning a value from the insert or update statement.
            // using "*" after the RETURNING keyword in PostgreSQL, will return everything
        );
        res.json(newpost);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/api/posts/:id', async (req, res) => {
    try {
        console.log("get a post with route parameter  request has arrived");
        // The req.params property is an object containing properties mapped to the named route "parameters". 
        // For example, if you have the route /posts/:id, then the "id" property is available as req.params.id.
        const { id } = req.params; // assigning all route "parameters" to the id "object"
        const posts = await pool.query( // pool.query runs a single query on the database.
            //$1 is mapped to the first element of { id } (which is just the value of id). 
            "SELECT * FROM \"POSTS\" WHERE \"ID\" = $1", [id]
        );
        res.json(posts.rows[0]); // we already know that the row array contains a single element, and here we are trying to access it
        // The res.json() function sends a JSON response. 
        // This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON.stringify() method.
    } catch (err) {
        console.error(err.message);
    }
});

//Get all posts from database
app.get('/api/posts/', async (req, res) => {
    try {
        console.log("get all posts request has arrived");
        // The req.params property is an object containing properties mapped to the named route "parameters". 
        // For example, if you have the route /posts/:id, then the "id" property is available as req.params.id.
        const posts = await pool.query( // pool.query runs a single query on the database.
            //$1 is mapped to the first element of { id } (which is just the value of id). 
            "SELECT * FROM \"POSTS\""
        );
        res.json(posts.rows); // we already know that the row array contains a single element, and here we are trying to access it
        // The res.json() function sends a JSON response. 
        // This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON.stringify() method.
    } catch (err) {
        console.error(err.message);
    }
});

app.put('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const { BODY, DATE } = req.body; 
        console.log("Update request has arrived with ID:", id);
        console.log("Request body:", req.body);

        const updatepost = await pool.query(
            `UPDATE "POSTS" 
             SET "BODY" = $2, "DATE" = $3 
             WHERE "ID" = $1 RETURNING *`, 
            [id, BODY, DATE]
        );

        res.status(200).json({ message: "Post updated successfully", post: updatepost.rows[0] });
    } catch (err) {
        console.error("Error updating post:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});


app.delete('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        //const post = req.body; // we do not need a body for a delete request
        console.log("delete a post request has arrived");
        const deletepost = await pool.query(
            "DELETE FROM \"POSTS\" WHERE \"ID\" = $1", [id]
        );
        res.json(deletepost);
    } catch (err) {
        console.error(err.message);
    }
});

// Signup Endpoint
app.post('/api/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the USERS table
        const result = await pool.query(
            "INSERT INTO \"USERS\"(\"EMAIL\", \"PASSWORD\") VALUES ($1, $2) RETURNING *", 
            [email, hashedPassword]
        );

        const token = jwt.sign({ id: result.rows[0].ID, email }, SECRET_KEY, { expiresIn: "1h" });

        console.log("user created")

        res.status(201).json({ message: "User created successfully", token });
    } catch (err) {
        if (err.code === '23505') { // Unique constraint violation
            res.status(400).json({ message: "Email already exists" });
        } else {
            console.error(err.message);
            res.status(500).json({ message: "Server Error" });
        }
    }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await pool.query(
            "SELECT * FROM \"USERS\" WHERE \"EMAIL\" = $1", [email]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.rows[0].PASSWORD);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.rows[0].ID, email }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
});
        

//Deleting all posts from database
app.delete('/api/posts/', async (req, res) => {
    try {
        //const post = req.body; // we do not need a body for a delete request
        console.log("delete all posts request has arrived");
        const deleteAllpost = await pool.query(
            "TRUNCATE \"POSTS\""
        );
        res.json(deleteAllpost);
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(port, () => {
    console.log("Server is listening to port " + port)
});
