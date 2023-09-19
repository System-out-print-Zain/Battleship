import shipPlaceScreenLoader from "./gameUIs/shipPlaceUI";
import battleScreenLoader from "./gameUIs/battleUI";
import startScreenLoader from "./gameUIs/startUI";
import endScreenLoader from "./gameUIs/endUI";

const displayController = (() => {
    function loadShipPlaceScreen(){
        shipPlaceScreenLoader.load();
    }
    function loadBattleScreen(){
        battleScreenLoader.load();
    }
    function loadStartScreen(){
        startScreenLoader.load();
    }
    function loadEndScreen(){
        endScreenLoader.load();
    }

    return {loadBattleScreen, loadEndScreen, loadStartScreen, loadShipPlaceScreen};
})();

export default displayController;