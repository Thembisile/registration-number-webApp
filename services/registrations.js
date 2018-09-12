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
    
    async function insertIntoRegDB(registration){
        await pool.query('INSERT INTO towns (town_name) values ($1)', [registration])
    }

    async function readRegistration(reg) {
        let outcome = await pool.query('SELECT * FROM towns where town_name=$1', [reg]);
        return outcome.rows;
    }


    return{
        insertIntoRegDB,
        readRegistration,
        addReg
    }
}