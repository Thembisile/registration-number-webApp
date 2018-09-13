module.exports = function(pool){

    async function addReg(reg){
        let listOfRegs = ['CA ', 'CJ ', 'CY ', 'CAW ']

        if (reg != '') {
            if (reg === undefined) {
                for (let i = 0; i < listOfRegs.length; i++) {
                    if (reg.startsWith(listOfRegs[i])) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
    
    async function insertIntoRegDB(RegNum, regCode){
        await pool.query('INSERT INTO reg (regnumbers, id) VALUES ($1, $2)', [RegNum, regCode.rows[0].id])
    }

    async function readRegistration(reg) {
        let outcome = await pool.query('SELECT * FROM reg where town_id=$1', [reg]);
        return outcome.rows;
    }

    async function ReadRegData(){
        let outcome = await pool.query('SELECT * FROM towns;');
        return outcome.rows;
    }

    return{
        insertIntoRegDB,
        readRegistration,
        addReg,
        ReadRegData
    }
}