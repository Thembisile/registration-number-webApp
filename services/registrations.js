module.exports = function (pool) {

    async function addReg(RegNum, code) {
        let regCode = await pool.query('SELECT * FROM towns WHERE reg=$1', [code]);
        console.log(RegNum);
        if (regCode.rows.length != 0) {

            let regNumber = await pool.query('SELECT * FROM reg WHERE reg_numbers=$1', [RegNum])

            if (regNumber.rows.length === 0) {
                await insertIntoRegDB(RegNum, regCode.rows[0].id);
                return 'Found';
            }
            else {
                return 'Duplicate'
            }
        }
        else {
            return 'Non-exist'
        }
    }

    async function readTowns(code) {
        await pool.query('SELECT * FROM towns WHERE reg=$1', [code])
    }

    async function insertIntoRegDB(RegNum, regCode) {
        await pool.query('INSERT INTO reg (reg_numbers, town_id) VALUES ($1, $2)', [RegNum, regCode]);
    }

    async function selectTownCode(regis) {
        outcome = await pool.query('SELECT id FROM towns WHERE reg=$1', [regis]);
        return outcome.rows;
    }

    async function selectTownID(town_id) {
        results = await pool.query('SELECT reg_numbers FROM reg WHERE town_id=$1', [town_id])
        return results.rows;
    }

    async function readRegistration(reg) {
        let outcome = await pool.query('SELECT * FROM reg where reg_numbers=$1', [reg]);
        outcome.rows;
    }

    async function ReadRegData() {
        let outcome = await pool.query('SELECT * FROM reg;');
        return outcome.rows;
    }

    async function AllTowns() {
        outcome = await pool.query('SELECT * FROM towns;')
        return outcome.rows
    }

    async function clearDB() {
        let clearData = await pool.query('DELETE FROM reg;');
        if (clearData !== 0) {
            await pool.query('DELETE FROM reg;');
            return 'Cleared'
        }
        return clearData;
    }

    return {
        insertIntoRegDB,
        readRegistration,
        addReg,
        ReadRegData,
        selectTownCode,
        selectTownID,
        clearDB,
        readTowns,
        AllTowns
    }
}