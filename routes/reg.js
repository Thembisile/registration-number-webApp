module.exports = function (registrations) {

        async function home(req, res) {
                let reg = await registrations.ReadRegData();
                res.render('home', { reg })
        }

        async function RegAddition(req, res) {
                try {
                        let reg = req.body.textField;
                        let RegNum = reg.toUpperCase();
                        let code = RegNum.substring(0, 3).trim();

                        if (RegNum === '') {
                                req.flash('info', 'Please Insert Registration Number To Add :')
                        }

                        else {
                                let regAddition = await registrations.addReg(RegNum, code);

                                if (regAddition === 'Found') {
                                        req.flash('success', 'Successfully Added!')
                                }
                                if (regAddition === 'Duplicate') {
                                        req.flash('info', 'Registration Already Exists')
                                }
                                if (regAddition === 'Non-exist') {
                                        req.flash('info', 'Invalid Registration')
                                }
                        }
                        res.redirect('/')
                }
                catch (err) {

                }
        }

        async function regNumbers(req, res) {
                try {
                        let townsFilter = req.body.townRadio;
                        let unavailableTowns = await registrations.selectTownID(townsFilter)
                        if (unavailableTowns === 'Unavailable') {
                                req.flash('info', 'Oops! No Towns To Filter')
                        }

                        if (townsFilter === 'All') {
                                res.redirect('/')
                        }

                        if (townsFilter === 'CA') {
                                let code = await registrations.selectTownCode(townsFilter);
                                result = code[0].id;
                                let reg = await registrations.selectTownID(result);
                                res.render('home', { reg });
                        }
                        if (townsFilter === 'CW') {
                                let code = await registrations.selectTownCode(townsFilter);
                                result = code[0].id;
                                let reg = await registrations.selectTownID(result);
                                res.render('home', { reg });
                        }

                        if (townsFilter === 'CJ') {
                                let code = await registrations.selectTownCode(townsFilter);
                                result = code[0].id;
                                let reg = await registrations.selectTownID(result);
                                res.render('home', { reg });
                        }
                        if (townsFilter === 'CY') {
                                let code = await registrations.selectTownCode(townsFilter);
                                result = code[0].id;
                                let reg = await registrations.selectTownID(result);
                                res.render('home', { reg });
                        }
                        if (townsFilter === 'CAW') {
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

        async function clearData(req, res) {
                let clearData = await registrations.clearDB();
                if (clearData === 'Cleared') {
                        req.flash('success', 'Successfully Cleared!')
                }
                res.redirect('/')
        }

        return {
                home,
                RegAddition,
                regNumbers,
                clearData
        }
}