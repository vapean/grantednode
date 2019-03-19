const db = require('../db')
const bcrypt = require('bcrypt')

let getAll = (done) => {
    db.get().query('select * from granted.usuarios', (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}


let create = ({ name, surname, gender, age, email, username, password, description, country_origin, province_origin, country_destination, province_destination, study_field, study_level, image, token }, done) => {

    let passwordCrypt = bcrypt.hashSync(password, 10)

    db.get().query('insert into granted.usuarios values (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, surname, gender, age, email, username, passwordCrypt, description, country_origin, province_origin, country_destination, province_destination, study_field, study_level, image, token], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}


let getByUsername = (username, done) => {
    db.get().query('select * from granted.usuarios where username= ?', [username], (err, rows) => {
        console.log(done)
        if (err) return done(err)
        done(null, rows)
    })
}


let insertToken = (token, id, done) => {
    db.get().query('update granted.usuarios set token= ? where id= ?', [token, id], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}


let getUserByToken = (token, done) => {
    db.get().query('select * from granted.usuarios where token= ?', [token], (err, rows) => {
        console.log(done)
        if (err) return done(err)
        done(null, rows)
    })
}


let updateUser= ({ name, surname, gender, age, email, username, description, country_origin, province_origin, country_destination, province_destination, study_field, study_level, image, token }, done) => {
    db.get().query('UPDATE granted.usuarios SET name= ?, surname= ?, gender= ?, age= ?, email= ?, username= ?, description= ?, country_origin= ?, province_origin= ?, country_destination= ?, province_destination= ?, study_field= ?, study_level= ?, image= ?  WHERE token= ?',[name, surname, gender, age, email, username, description, country_origin, province_origin, country_destination, province_destination, study_field, study_level, image, token], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}



module.exports = {
    getAll: getAll,
    create: create,
    getByUsername: getByUsername,
    insertToken: insertToken,
    getUserByToken: getUserByToken,
    updateUser: updateUser
}