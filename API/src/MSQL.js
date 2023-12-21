const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hackathonsang'
})

function getJob() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM job', (err, record, fields) => {
            if (err) {
                console.log("11111111 lỗi")
                return
            }
            resolve(record)
        })
    })
}
function ADDJob(a) {
    var sql = `INSERT INTO job (nameJob,status) VALUES ('${a}','Chưa Hoàn Thành')`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("thêm thành công");
    });

}
function DELETEJob(id) {
    var sql = `DELETE FROM job WHERE id = '${id}'`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("xoa thanh cong");
    });
}

function EditJob(id, value, status) {
    var sql = `UPDATE job SET nameJob = '${value}' WHERE id = '${id}'`;
    // const values=[id,value]
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("da sua");
    });
    if (status == "Chưa Hoàn Thành") {
        var sql = `UPDATE job SET status = "Hoàn Thành" WHERE id ='${id}'`;
        const values = [id, value]
        connection.query(sql, values, function (err, result) {
            if (err) throw err;
            console.log("da sua");
        });
    } else {
        var sql = `UPDATE job SET status = 'Chưa Hoàn Thành' WHERE id = '${id}'`;
        const values = [id, value]
        connection.query(sql, values, function (err, result) {
            if (err) throw err;
            console.log("da sua");
        });
    }
}


module.exports = {
    getJob,
    ADDJob,
    DELETEJob,
    EditJob
}