module.exports = function (registrations) {

        async function home(req, res) {
                let reg = await registrations.ReadRegData();
                res.render('home', { reg })
        }

        async function RegAddition(req, res) {
                try {
                        let reg = req.body.textField;;
                        let RegNum = reg.toUpperCase();
                        let code = RegNum.substring(0, 3);
                        if (RegNum === '') {
                                req.flash('info', 'Please Insert Registration Number To Add')
                        }
                        else {
                                await registrations.addReg(RegNum, code);
                        }
                        res.redirect('/')
                }
                catch (err) { res.send(err.stack) }
        }

        async function regNumbers(req, res) {
                try {
                        let townsFilter = req.body.townsFilter;

                        if (townsFilter === 'CA ') {
                                await registrations.selectTownCode();
                                let reg_numbers = registrations.selectTownID();
                                let = reg_numbers.rows;
                                res.render('home', reg)
                        }
                }
                catch (err) {
                        res.send(err.stack)
                }
        }

        return {
                home,
                RegAddition,
                regNumbers
        }
}