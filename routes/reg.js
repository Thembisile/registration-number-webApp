let Registry = require('../services/registrations');

module.exports = function (pool) {
    let regService = Registry(pool);
    async function home(req, res) {
        res.render('home')
    }

    async function Reg(req, res) {
        try {
            let reg = req.body.addButton;
            let RegName = req.body.textField;
            let RegNum = RegName.toUpperCase();

            if (reg.startsWith('CA ') || reg.startsWith('CJ ') || reg.startsWith('CY ') || reg.startsWith('CAW ')) {
                await regService.insertIntoRegDB(reg)
            }
            if (RegNum === '') {
                req.flash('info', 'Please Insert Registration Number To Add')
            }
            else if (RegNum !== '') {
                await regService.addReg(RegNum);
                req.flash('info', RegNum)
            }
            res.redirect('/')
        }
        catch (err) { res.send(err.stack) }
    }

    return {
        home,
        Reg
    }
}