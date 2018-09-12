module.exports = function (pool) {
    
    async function addRegistration(reg) {
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

    function getRegistry() {
        return registry;
    }

    function filterByTown(town){

        let registrationNums = Object.keys(mapOfReg);
    
        if (town === "Filter ") {
          let nothing = registrationNums.clear();
    
          return nothing;
        }
    
        if (town === "All ") {
          return registrationNums;
        }
        let filterTown = registrationNums.filter(function(Num, storedNum){
    
          return Num.startsWith(town)
        });
        location.hash = town;
    
        return filterTown;
      }

    return {
        addRegistration,
        getRegistry,
        filterByTown
    }

}