const mysql = require('mysql')
let pool= null
let connect = (done) => {
    // pool = mysql.createPool({
    //       host:'127.0.0.1',
    //       user: 'root',
    //       password: 'root',
    //       port: 8889,
    //       database: 'granted'
    // })

    pool = mysql.createPool({
        host:'localhost',
        user: 'grantedw_admin',
        password: 'Caba22lla',
        port: 3306,
        database: 'grantedw_production'
  })
    done()
}

let get = () => {
    return pool
}

module.exports = {
    connect: connect,
    get: get
}
