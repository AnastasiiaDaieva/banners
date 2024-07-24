import refs from "./refs.js";
import offerCard from "./offerCard.js";

const { list, arrow, arrowWrapper, loader } = refs;

async function fetchData() {
  try {
    const res = await fetch("https://veryfast.io/t/front_test_api.php").then(
      (r) => r.json()
    );

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
    userAgent.match(/(chrome|safari|firefox)\/?\s*(\d+)/i) || [];

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

const browser = getBrowserInfo();

function applyStyles(styles, rotate) {
  for (const property in styles) {
    arrowWrapper.style[property] = styles[property];
  }

  if (rotate) {
    arrow.classList.add("rotate-180");
  } else {
    arrow.classList.remove("rotate-180");
  }
}

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

document.addEventListener("DOMContentLoaded", async () => {
  loader.style.display = "flex";
  try {
    const res = await fetchData();

    const html = res.map(offerCard).join("");

    list.innerHTML = html;
    const downloadBtns = document.querySelectorAll(".offer__download");
    downloadBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (arrowWrapper) {
          setTimeout(() => {
            arrowWrapper.style.display = "block";
          }, 1500);
        }
      });
    });
  } catch (error) {
    console.log("err", error);
  } finally {
    loader.style.display = "none";
  }
});
