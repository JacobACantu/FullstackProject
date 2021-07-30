const { response } = require('express')
const express = require('express')
const app = express()
const {Pool} = require('pg')

const PORT = process.env.PORT || 5001

app.use(express.static('public'))

const pool = new Pool ({
    user: 'jacob',
    host: 'localhost',
    database: 'favorite_books',
    password: '',
    port: 5432,
})

// GET
app.get('/api/books', async (request, response) => {
    try {
       const {rows} = await pool.query('SELECT * FROM customer_info')
       response.send(rows)
    } catch (error) {
        console.log('server error')
        response.status(500).json(error)
    }
})

// POST
app.post('/api/user', async (request, response) => {
    try {   
        const {name, age} = request.body
        const userInfo = 'INSERT INTO customer_info(name,age) VALUES($1,$2) RETURNING *'
        const values = [name, age]
        const insertCmd = await pool.query(userInfo, values)
        response.status(201).send(insertCmd.rows[0])
    } catch (error) {
        console.log('server error')
        response.status(500).json(error)
    }
})
// // PATCH
app.patch('/api/books/:id', async (request, response) => {
    try {
        const {users} = request.params;
        const {name, age} = request.body
        if ( name == null || typeof age !== 'number' ) {
            response.status(400).send("Bad Request")
        } else {
            const updateCmd = 'UPDATE customer_info SET name = $1, age = $2 WHERE user_id = $3 RETURNING *'
            const values = [name, age]
            await pool.query(updateCmd, values, (err, res) => {
                if (err) {
                    console.log(err.stack)
                }
                response.status(201).send(res.rows[0])
            })
        }
    } catch (error) {
        console.log('Server error')
        response.status(500).json(error)
    }
})

// // DELETE
app.delete('/books/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const deleteCmd = 'DELETE FROM customer_info WHERE user_id = $1 RETURNING *'
        let {rows} = await pool.query(deleteCmd, [id]);
        response.status(200).json(rows[0])
    } catch (error) {
    console.log('Server error')
    response.status(500).json(error)
    }
})
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

