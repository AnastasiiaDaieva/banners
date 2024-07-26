import refs from "./refs.js";
import offerCard from "./offerCard.js";

const { list, arrow, arrowWrapper, loader } = refs;

const API_URL = "https://veryfast.io/t/front_test_api.php";
const ROTATE_CLASS = "rotate-180";

async function fetchData() {
  try {
    const res = await fetch(API_URL).then((r) => r.json());

    if (!res || res?.state !== "ok") {
      throw new Error("failed");
    }

    return res.result.elements;
  } catch (error) {
    console.error(error);
  }
}

function getBrowserInfo() {
  const userAgent = navigator.userAgent;
  let browserInfo;
  const matchingBrowserData =
    userAgent.match(/(chrome|firefox)\/?\s*(\d+)/i) || [];

  if (matchingBrowserData[1] === "Chrome") {
    browserInfo = userAgent.match(/\bEdg\/(\d+)/);
    if (browserInfo != null) {
      return { name: "Edge", version: browserInfo[1] };
    }
  }
  const name = matchingBrowserData[1];
  const version = matchingBrowserData[2];
  return {
    name: name,
    version: version,
  };
}

function applyStyles(styles, rotate) {
  for (const property in styles) {
    arrow.style[property] = styles[property];
  }

  if (rotate) {
    arrowWrapper.classList.add(ROTATE_CLASS);
  } else {
    arrowWrapper.classList.remove(ROTATE_CLASS);
  }
}

function detectCurrentBrowserAndApplyStyles() {
  const browser = getBrowserInfo();

  switch (browser.name.toLowerCase()) {
    case "chrome":
      if (+browser.version < 115) {
        applyStyles({ bottom: "70px", left: "10px" }, true);
      } else {
        applyStyles({ top: "30px", right: "15px" });
      }
      break;
    case "firefox":
      applyStyles({ top: "30px", right: "35px" });
      break;
    case "edge":
      applyStyles({ top: "30px", right: "25px" });
      break;
    default:
      applyStyles({ top: "30px", right: "10px" });
  }
}

function setUpButtons() {
  const downloadBtns = document.querySelectorAll(".download");
  downloadBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (arrow) {
        setTimeout(() => {
          arrow.style.display = "block";
        }, 1500);
      }
    });
  });
}

function buildCards(res) {
  const html = res?.map(offerCard).join("");
  if (list) {
    list.innerHTML = html;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  loader.style.display = "flex";
  detectCurrentBrowserAndApplyStyles();
  try {
    const res = await fetchData();
    buildCards(res);
    setUpButtons();
  } catch (error) {
    console.log("err", error);
  } finally {
    loader.style.display = "none";
  }
});
