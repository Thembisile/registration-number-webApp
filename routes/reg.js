// let Registry = require('../services/registrations');

// module.exports = function (pool) {

//     // let regService = Registry(pool);

//     async function home(req, res) {
//         let reg = await pool.query('SELECT regnumbers FROM reg;');
//         let regDisplay = reg.rows;
//         res.render('home', {regDisplay})
//     }

    // async function RegAddition(req, res) {
    //     try {
            // let reg = req.body.addButton;
            // let RegName = req.body.textField;
            // let RegNum = RegName.toUpperCase();
            // let code = RegNum.substring(0, 3).trim();

            // if (reg.startsWith('CA ') || reg.startsWith('CJ ') || reg.startsWith('CY ') || reg.startsWith('CAW ')) {
            //     let outcome = await regService.readRegistration();
            //     if (outcome.rowCount === 0) {
            //         let regCode = await pool.query('SELECT id FROM towns WHERE town_name=$1', [code]);
            //         outcome = await pool.query('INSERT INTO reg (regnumbers, id) VALUES ($1, $2)', [RegNum, regCode.rows[0].id]);
            //     }
            // }
            // else if (RegNum === '') {
            //     req.flash('info', 'Please Insert Registration Number To Add')
            // }
            // else if (RegNum !== '') {
            //     await regService.addReg(RegNum);
            //     req.flash('info', RegNum)
            // }
    //         res.redirect('/')
    //     }
    //     catch (err) { res.send(err.stack) }
    // }

    // async function reg_numbers(req, res) {
    //     try {
    //         let regNumber = await regService.ReadRegData();
    //         res.render('reg_numbers', { regNumber })
    //     }
    //     catch (err) {
    //         res.send(err.stack)
    //     }
    // }

    // return {
    //     home,
        // RegAddition
        // reg_numbers
//     }
// }