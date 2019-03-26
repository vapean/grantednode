const db = require('../db')
const Promise = require('bluebird')

let getAll = (done) => {
    db.get().query('select * from becas', (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}

let getBecasByFiltro = ({ date, typology, country_origin, province_origin, country_destination, province_destination, study_field, study_level }, done) => {
    let partefija = "SELECT * FROM becas WHERE 1=1 "
    console.log("Juan", country_origin);
    // if (date != null && date!= "") {
    //     partefija += " AND `date` LIKE '%" + date + "%' ";
    // }
    // if (typeof typology !== 'undefined') {
    //     partefija += " AND `typology` LIKE '%" + typology + "%' "
    // } 
    if (country_origin.length != 0) {
        // (`country_origin` LIKE '%guinea%' AND `country_origin` LIKE '%colombia%')

        partefija += " AND ("
        for (let i = 0; i < country_origin.length; i++) {
            if (i == 0) {
                partefija += "`country_origin` LIKE '%" + country_origin[i] + "%'"
            }
            else {
                partefija += " OR `country_origin` LIKE '%" + country_origin[i] + "%'"
            }
        }
        partefija += ")"

    }
    // if (province_origin) {
    //     partefija += "AND `province_origin` LIKE '%" +province_origin+ "%' "
    // }
    if (country_destination.length != 0) {
        // partefija += "AND `country_destination` LIKE '%" + country_destination + "%' "

        partefija += " AND ("
        for (let i = 0; i < country_destination.length; i++) {
            if (i == 0) {
                partefija += "`country_destination` LIKE '%" + country_destination[i] + "%'"
            }
            else {
                partefija += " OR `country_destination` LIKE '%" + country_destination[i] + "%'"
            }
        }
        partefija += ")"
    }
    // if (province_destination) {
    //     partefija += "AND `province_destination` LIKE '%" +province_destination+ "%' "
    // }
    if (study_field.length != 0) {
        // partefija += "AND `study_field` LIKE '%" + study_field + "%' "

        partefija += " AND ("
        for (let i = 0; i < study_field.length; i++) {
            if (i == 0) {
                partefija += "`study_field` LIKE '%" + study_field[i] + "%'"
            }
            else {
                partefija += " OR `study_field` LIKE '%" + study_field[i] + "%'"
            }
        }
        partefija += ")"

    }
    if (study_level.length != 0) {
        // partefija += "AND `study_level` LIKE '%" +study_level+ "%' "
        partefija += " AND ("
        for (let i = 0; i < study_level.length; i++) {
            if (i == 0) {
                partefija += "`study_level` LIKE '%" + study_level[i] + "%'"
            }
            else {
                partefija += " OR `study_level` LIKE '%" + study_level[i] + "%'"
            }
        }
        partefija += ")"

    }

    console.log(partefija)

    db.get().query(partefija, (err, rows) => {
        // console.log(done)
        if (err) return done(err)
        console.log(err)
        done(null, rows)
    })
}


let getBecasFav = (token) => {
    return new Promise((resolve, reject) => {
        db.get().query('SELECT * FROM `tabla_indices_becas_usuarios` WHERE fk_usuarios = (SELECT usuarios.id from usuarios where token=?)', [token], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

let addBecaFav = (fk_becas, token, done) => {
    db.get().query('INSERT INTO `tabla_indices_becas_usuarios` (`fk_becas`, `fk_usuarios`) VALUES (?, (SELECT usuarios.id from usuarios where token= ?))', [fk_becas, token], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}

let deleteBecaFav = (fk_becas, token, done) => {
    db.get().query('DELETE FROM `tabla_indices_becas_usuarios` WHERE `fk_becas`= ? AND `fk_usuarios`= (SELECT usuarios.id FROM usuarios WHERE token= ?)', [fk_becas, token], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}


let getBecasFavUsuario = (token) => {
    return new Promise((resolve, reject) => {
        db.get().query('SELECT * FROM `tabla_indices_becas_usuarios`, `becas` WHERE fk_becas= becas.`id` AND fk_usuarios = (SELECT usuarios.id from usuarios where token=?)', [token], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}


getBecasById = (beca_id, done) => {
    db.get().query('SELECT * FROM becas WHERE beca_id = ?', [beca_id], (err, rows) => {
        console.log(done)
        if (err) return done(err)
        done(null, rows)
    })
}




module.exports = {
    getAll: getAll,
    getBecasByFiltro: getBecasByFiltro,
    addBecaFav: addBecaFav,
    getBecasFav: getBecasFav,
    deleteBecaFav: deleteBecaFav,
    getBecasFavUsuario: getBecasFavUsuario,
    getBecasById:getBecasById
}