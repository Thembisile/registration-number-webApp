module.exports = function (registrations) {

        async function home(req, res) {
                let reg = await registrations.ReadRegData();
                res.render('home', { reg })
        }

        async function RegAddition(req, res) {
                try {
                        let reg = req.body.textField;
                        let RegNum = reg.toUpperCase();
                        let code = RegNum.substring(0, 3);
                        if (RegNum === '') {
                                req.flash('info', 'Please Insert Registration Number To Add :')
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
                        let townsFilter = req.body.townRadio;

                        if (townsFilter === 'All ') {
                                res.redirect('/')
                        }

                        if (townsFilter === 'CA ') {
                                let code = await registrations.selectTownCode(townsFilter);
                                result = code[0].id;
                                let reg = await registrations.selectTownID(result);
                                res.render('home', { reg });
                        }
                        if (townsFilter === 'CAW ') {
                                let code = await registrations.selectTownCode(townsFilter);
                                result = code[0].id;
                                let reg = await registrations.selectTownID(result);
                                res.render('home', { reg });
                        }
                        if (townsFilter === 'CJ ') {
                                let code = await registrations.selectTownCode(townsFilter);
                                result = code[0].id;
                                let reg = await registrations.selectTownID(result);
                                res.render('home', { reg });
                        }
                        if (townsFilter === 'CY ') {
                                let code = await registrations.selectTownCode(townsFilter);
                                result = code[0].id;
                                let reg = await registrations.selectTownID(result);
                                res.render('home', { reg });
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