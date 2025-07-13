const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())

app.get("/", (req, res) => {
    response(200, "API SIAP", "Success", res)
})

app.get("/mahasiswa", (req, res) => {
    const sql = "SELECT * FROM mahasiswa"
    db.query(sql, (err, fields) => {
        if (err) throw err
        response(200, fields, "ini message", res)
    })
})

app.get("/mahasiswa/:nim", (req, res) => {
    const nim = req.params.nim
    const sql = `SELECT * FROM mahasiswa where nim = ${nim}`
    db.query(sql, (err, fields) => {
        if (err) throw err
        response(200, fields, "get detail", res)
    })
})

app.post("/mahasiswa", (req, res) => {
    const { nim, nama_lengkap, kelas, alamat } = req.body
    const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (${nim}, '${nama_lengkap}', '${kelas}', '${alamat}')`

    db.query(sql, (err, fields) => {
        if (err) response(500, "invalid", "error", res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId,
            }
            response(200, data, "mahasiswa mengirim", res)
        } else {
            console.log("data tidak masuk")
        }
    })
})

app.put("/mahasiswa", (req, res) => {
    const { nim, nama_lengkap, kelas, alamat } = req.body
    const sql = `UPDATE mahasiswa SET nama_lengkap = '${nama_lengkap}', kelas = '${kelas}', alamat= '${alamat}' WHERE nim = ${nim}`

    db.query(sql, (err, fields) => {
        if (err) response(500, "invalid", "error", res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                message: fields.message,
            }
            response(200, data, "update data success", res)
        } else {
            response(404, "nim tidak ada", "error", res)
        }
    })
})

app.delete("/mahasiswa", (req, res) => {
    const { nim } = req.body
    const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`
    db.query(sql, (err, fields) => {
        if (err) response(500, "invalid", "error", res)
        if (fields?.affectedRows) {
            const data = {
                isDeleted: fields.affectedRows,
            }
            response(200, data, "hapus mahasiswa berhasil", res)
        } else {
            response(404, "nim tidak ada", "error", res)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// const response = require('./response')

// app.use(bodyParser.json())


// app.get('/', (req, res) => {
//     const sql = "select * from mahasiswa"

//     db.query(sql, (error, result) => {
//         response(200, result, "get all daata from mahasiswa", res)
//     })
// })

// app.get('/find', (req, res) => {
//     const sql = `SELECT nama_lengkap FROM mahasiswa where nim = ${req.query.nim}`

//     db.query(sql, (error, result) => {
//         response(200, result, "find mahasiswa name", res)
//     })
//     console.log('find nim: ', req.query.nim)
// })



// app.post('/login', (req, res) => {
//     console.log({ requesDariLuar: req.body })
//     const username = req.body.username
//     if (username === usernameFromDbExist) {
//         res.status(400).send("username tidak ada")
//     }
// })

// app.put('/username', (req, res) => {
//     console.log({ updateData: req.body })
//     res.send('update berhasil')
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
