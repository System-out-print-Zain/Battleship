import shipPlacementDisplayer from "./shipPlacementDisplay";
import shipPlacementInitializer from "./shipPlacementInit";

const shipPlaceScreenLoader = (() => {
    async function load(player){
      shipPlacementDisplayer.display(player);
      await shipPlacementInitializer.initShipPlaceScreen(player);
    }
    return {load};
  })();
  
  export default shipPlaceScreenLoader;