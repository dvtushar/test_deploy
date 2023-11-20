require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id order by id asc");
        res.status(200).json({
            status: 'success',
            results: results.rowCount,
            data: {
                restaurants: results.rows,
            },
        });
    } catch (error) {
        console.log(error);
    }
});

// get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const restaurant = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1", [req.params.id]);
        const reviews = await db.query("select * from reviews where restaurant_id = $1", [req.params.id]);
        res.status(200).json({
            status: 'success',
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows,
            },
        });
    } catch (error) {
        console.log(error);
    }
});

// create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("insert into restaurants (name, location, price_range, image, description) values ($1, $2, $3, $4, $5) returning *", [req.body.name, req.body.location, req.body.price_range, req.body.image, req.body.description]);
        res.status(201).json({
            status: 'success',
            data: {
                restaurant: results.rows[0],
            },
        });
    } catch (error) {
        console.log(error);
    }
});

// update a restaurant
app.put("/api/v1/restaurants/:id", async  (req, res) => {
    try {
        const results = await db.query("update restaurants SET name = $1, location = $2, price_range = $3, image = $4, description = $5 where id = $6 returning *", [req.body.name, req.body.location, req.body.price_range, req.body.image, req.body.description, req.params.id]);
        res.status(200).json({
            status: 'success',
            data: {
                restaurant: results.rows[0],
            },
        });
    } catch (error) {
        console.log(error);
    }
});

// delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("delete from restaurants where id = $1 returning *", [req.params.id]);
    } catch (error) {
        console.log(error);
    }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const newReview = await db.query(
            "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
            [req.params.id, req.body.name, req.body.review, req.body.rating]
        );
        res.status(201).json({
            status: "success",
            data: {
            review: newReview.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

