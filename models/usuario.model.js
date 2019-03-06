const db = require('../db')

let getAll = (done) => {
    db.get().query('select * from granted.usuarios', (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}

let create = ({ name, surname, gender, age, email, username, password, description, country_origin, province_origin, country_destination, province_destination, study_field, study_level, image, token }, done) => {
    db.get().query('insert into usuarios values (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, surname, gender, age, email, username, password, description, country_origin, province_origin, country_destination, province_destination, study_field, study_level, image, token], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}


module.exports = {
    getAll: getAll,
    create:create
}