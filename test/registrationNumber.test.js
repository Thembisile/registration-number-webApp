const assert = require('assert');
const RegistrationConstructor = require('../services/registrations');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://seandamon:Thando2008@localhost:5432/registration';


const pool = new Pool({
    connectionString
});

describe('Registration Numbers', async function(){

    beforeEach(async function(){
        await pool.query("delete from reg;");
    });

    it('should return true if registration matches given prefix for Cape Town', async function(){
      let callReg = RegistrationConstructor(pool);

      await callReg.addReg('CA 5561')

      assert.strictEqual(true, callReg.selectTownID('CA '));

    });
});
    // it('should return true if registration matches given prefix for Bellville', async function(){
    //   let callReg = RegistrationConstructor(pool);
  
    //   assert.strictEqual(callReg.addReg('CY 1254'), true);
    // });
    // it('should return true if registration matches given prefix for George', async function(){
    //   let callReg = RegistrationConstructor(pool);
  
    //   assert.strictEqual(callReg.addReg('CAW 8745'), true)
    // });
    // it('should return true if registration matches given prefix for Paarl', async function(){
    //   let callReg = RegistrationConstructor(pool);
  
    //   assert.strictEqual(callReg.addReg('CJ 8457'), true);
    // });
    // it('should return false if registration is from another town and not from selected towns', async function(){
    //   let callReg = RegistrationConstructor(pool);
  
    //   callReg.addReg('CZ 48636');
  
    //   assert.strictEqual(false, callReg.ReadRegData());
    // });
//   });
//   describe('Filtering registration for Selected Town', async function(){
//     it('should return all registration numbers when filtering the option for "ALL" ', async function(){
//       let callReg = RegistrationConstructor(pool);
  
//       callReg.addReg('CA 123');
//       callReg.addReg('CAW 123');
//       callReg.addReg('CY 123');
//       callReg.addReg('CJ 123');
  
//       assert.deepstrictEqual(callReg.filterByTown('All '), ['CA 123', 'CAW 123', 'CY 123', 'CJ 123'])
//     });
//     it('should return CJ registrations only, if filtered for Paarl, and CAW registrations if filtered for George', async function(){
//       let callReg = RegistrationConstructor(pool);
  
//       callReg.addReg("CJ 1235");
//       callReg.addReg("CAW 2659");
  
//       let callReg2 = RegistrationConstructor(pool);
  
//       callReg2.addReg('CAW 123');
//       callReg2.addReg('CY 541')
  
//       assert.deepstrictEqual(callReg.filterByTown('CJ '), ['CJ 1235']);
//       assert.deepstrictEqual(callReg2.filterByTown('CAW '), ['CAW 123'])
//     });
//     it('should return filtered registration for Cape Town and Bellville and does not repeat a registration', async function(){
//       let callReg = RegistrationConstructor(pool);
  
//       callReg.addReg('CAW 123');
//       callReg.addReg('CA 123');
//       callReg.addReg('CAW 321');
  
//       let callReg2 = RegistrationConstructor(pool);
  
//       callReg.addReg('CY 321');
//       callReg.addReg('CJ 123');
//       callReg.addReg('CY 321');
  
//       assert.deepstrictEqual(callReg.filterByTown("CA "), ['CA 123'])
//       assert.deepstrictEqual(callReg.filterByTown("CY "), ['CY 321'])
//     });
//   });
//   describe('Mapping of Registrations numbers', async function(){
//     it('should not include a registration more than once into the map ', async function(){
//       let callReg = RegistrationConstructor(pool);
  
//       callReg.addReg("CA 123");
//       callReg.addReg("CA 123");
  
//       let callReg2 = RegistrationConstructor(pool);
  
//       callReg2.addReg("CY 123")
//       callReg2.addReg("CY 123")
//       callReg2.addReg("CY 321")
  
//       assert.deepstrictEqual(['CA 123'], callReg.selectTownCode());
//       assert.deepstrictEqual(['CY 123', 'CY 321'], callReg2.selectTownCode());
//     });
//     it('should map registrations from CA, CJ, CAW & CY only', async function(){
//       let callReg = RegistrationConstructor(pool)
  
//       callReg.addReg("CA 123")
//       callReg.addReg("CZ 123")
  
//       assert.deepstrictEqual(callReg.selectTownCode(), ['CA 123'])
  
//       let callReg2 = RegistrationConstructor(pool);
  
//       callReg2.addReg("CY 156")
//       callReg2.addReg("CV 124")
  
//       assert.deepstrictEqual(callReg2 .selectTownCode(), ['CY 156'])
//     });
//   });
//   describe('Initializing Map Registration Numbers', async function(){
//     it('should return initialized map of All registrations', async function(){
  
//       let callReg = RegistrationConstructor(pool['CA 123',
//         'CY 321',
//         'CJ 451',
//         'CAW 4123']);
  
//       assert.deepstrictEqual(callReg.selectTownCode(), ['CA 123',
//         'CY 321',
//         'CJ 451',
//         'CAW 4123'])
//     });
//   });
  