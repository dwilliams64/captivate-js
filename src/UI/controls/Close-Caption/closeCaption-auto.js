import { getButtonsList } from "../../uiFunctions";
import { setGlobalValue, fetchGlobal } from "../../../global/globalSettings";

export function ccFunc_auto() {
  if (cpCmndCC === 0) {
    setGlobalValue("isCcOnEnter_auto", true);
    // window.ccOpen = true;
    cpCmndCC = 1;
    cp.hide("ccClose");
    ccToolTip_auto();
  } else {
    cpCmndCC = 0;
    ccToolTip_auto();
    setGlobalValue("isCcOnEnter_auto", true);
  }
}

function ccToolTip_auto() {
  var ccBtnsList = getButtonsList("Closed Caption");

  ccBtnsList.forEach(function (ccBtn) {
    cpCmndCC === 0
      ? ccBtn.setAttribute("title", "Closed Caption Open")
      : ccBtn.setAttribute("title", "Closed Caption Close");
  });
}

export function ccBoxOnEnter_auto() {
  const {
    from: firstFrame,
    to: lastFrame,
    audCC,
  } = fetchGlobal("currentSlide");

  ccToolTip_auto();

  // Checks if variable has changed for cc text hide and show
  cpAPIEventEmitter.addEventListener(
    "CPAPI_VARIABLEVALUECHANGED",
    ccToolTip_auto,
    "cpInfoCurrentFrame"
  );

  // Prevents final cc text caption from closing cc text box
  if (audCC.length) {
    audCC[0].sf = 1;
    audCC[audCC.length - 1].ef = lastFrame - firstFrame;
  }
}
