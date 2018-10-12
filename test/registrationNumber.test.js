const assert = require('assert');
const RegistrationConstructor = require('../services/registrations');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://seandamon:Thando2008@localhost:5432/registration';


const pool = new Pool({
    connectionString
});

describe('Registration Numbers', async function () {

    beforeEach(async function () {
        await pool.query("delete from reg;");
    });

    it('Should return the entered registration number', async function () {
        let getReg = RegistrationConstructor(pool);

        registration = await getReg.addReg('CA 123', 'CA');

        assert.strictEqual(registration, 'Found');
    });

    it('Should not return the same registration number entered', async function () {
        let getReg = RegistrationConstructor(pool);

        registration = await getReg.addReg('CA 123', 'CA');
        registration2 = await getReg.addReg('CA 123', 'CA');

        assert.strictEqual(registration2, 'Duplicate');
    });
    it('Should return all filtered registration numbers', async function () {
        let getReg = RegistrationConstructor(pool)

        registration = await getReg.addReg('CF 123', 'CF');


        assert.strictEqual(registration, 'Non-exist')

    });
    it('Should check if all registrations exist', async function () {
        let getReg = RegistrationConstructor(pool)

        registration = await getReg.addReg('CJ 123', 'CJ')
        registration = await getReg.addReg('CA 123', 'CA')
        registration = await getReg.addReg('CY 123', 'CY')

        let readAll = await getReg.ReadRegData()

        assert.strictEqual(readAll.length, 3)
    });
    it('Should check the town if its existing', async function () {
        let getReg = RegistrationConstructor(pool)

        registration = await getReg.AllTowns()

        assert.strictEqual(registration.length, 5)
    })
});
