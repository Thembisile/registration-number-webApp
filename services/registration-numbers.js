module.exports = function (pool) {
    var registry = '';
    var mapOfReg = {};
    async function addRegistration() {
        var listOfRegs = ['CA ', 'CJ ', 'CY ', 'CAW ']

        if (reg != '') {
            if (mapOfReg[reg] === undefined) {
                for (var i = 0; i < listOfRegs.length; i++) {
                    if (reg.startsWith(listOfRegs[i])) {

                        mapOfReg[reg] = 0;
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

        var registrationNums = Object.keys(mapOfReg);
    
        if (town === "Filter ") {
          var nothing = registrationNums.clear();
    
          return nothing;
        }
    
        if (town === "All ") {
          return registrationNums;
        }
        var filterTown = registrationNums.filter(function(Num, storedNum){
    
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