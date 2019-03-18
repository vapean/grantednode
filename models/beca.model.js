const db = require('../db')

let getAll = (done) => {
    db.get().query('select * from granted.becas', (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}

let getBecasByFiltro = ({ date, typology, country_origin, province_origin, country_destination, province_destination, study_field, study_level }, done) => {
    let partefija = "SELECT * FROM granted.becas WHERE 1=1 "
    if (date) {
        partefija += "AND `date` LIKE '%" + date + "%' ";
    }
    if (typology) {
        partefija += "AND `typology` LIKE '%" +typology+ "%' "
    }
    if (country_origin) {
       // (`country_origin` LIKE '%guinea%' AND `country_origin` LIKE '%colombia%')
        partefija += "AND ("
        for (let i = 0; i < country_origin.length; i++)
        {
            if (i == 0)
            {
                partefija += "`country_origin` LIKE '%" +country_origin[i]+ "%'"
            }
            else
            {
                partefija += " OR `country_origin` LIKE '%" +country_origin[i]+ "%'"
            }
        }
        partefija += ")"
        
    }
    // if (province_origin) {
    //     partefija += "AND `province_origin` LIKE '%" +province_origin+ "%' "
    // }
    if (country_destination) {
        // partefija += "AND `country_destination` LIKE '%" + country_destination + "%' "
        
        partefija += "AND ("
        for (let i = 0; i < country_destination.length; i++)
        {
            if (i == 0)
            {
                partefija += "`country_destination` LIKE '%" +country_destination[i]+ "%'"
            }
            else
            {
                partefija += " OR `country_destination` LIKE '%" +country_destination[i]+ "%'"
            }
        }
        partefija += ")"
    }
    // if (province_destination) {
    //     partefija += "AND `province_destination` LIKE '%" +province_destination+ "%' "
    // }
    if (study_field) {
        // partefija += "AND `study_field` LIKE '%" + study_field + "%' "
        
        partefija += "AND ("
        for (let i = 0; i < study_field.length; i++)
        {
            if (i == 0)
            {
                partefija += "`study_field` LIKE '%" +study_field[i]+ "%'"
            }
            else
            {
                partefija += " OR `study_field` LIKE '%" +study_field[i]+ "%'"
            }
        }
        partefija += ")"
        
    }
    if (study_level) {
        // partefija += "AND `study_level` LIKE '%" +study_level+ "%' "

        partefija += "AND ("
        for (let i = 0; i < study_level.length; i++)
        {
            if (i == 0)
            {
                partefija += "`study_level` LIKE '%" +study_level[i]+ "%'"
            }
            else
            {
                partefija += " OR `study_level` LIKE '%" +study_level[i]+ "%'"
            }
        }
        partefija += ")"
    }
    // console.log(country_origin)
    console.log(partefija)

    db.get().query(partefija,  (err, rows) => {
        console.log(done)
        if (err) return done(err) 
        
        done(null, rows)
    })


    // db.get().query('SELECT * FROM granted.becas WHERE `date`LIKE ? AND `typology` LIKE ? AND `country_origin` LIKE ? AND `province_origin`LIKE ? AND `country_destination` LIKE ? AND`province_destination`LIKE ? AND`study_field` LIKE ? AND `study_level`LIKE ?', [' % ' + date + ' % ', ' % ' + typology + ' % ', ' % ' + country_origin + ' % ', ' % ' + province_origin + ' % ', ' % ' + country_destination + ' % ', ' % ' + province_destination + ' % ', ' % ' + study_field + ' % ', ' % ' + study_level + ' % '], (err, rows) => {
    //     console.log(done)
    //     if (err) return done(err)
    //     done(null, rows)
    // })
}


module.exports = {
    getAll: getAll,
    getBecasByFiltro
}