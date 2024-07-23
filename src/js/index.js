import refs from "./refs.js";
import offerCard from "./offerCard.js";

const { list, arrow, loader } = refs;

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
  const ua = navigator.userAgent;
  let tem;
  const M = ua.match(/(opera|chrome|firefox|edge)\/?\s*(\d+)/i) || [];
  if (/trident/i.test(ua)) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: "IE", version: tem[1] || "" };
  }
  if (M[1] === "Chrome") {
    tem = ua.match(/\bOPR|Edge\/(\d+)/);
    if (tem != null) {
      return { name: "Opera", version: tem[1] };
    }
  }
  const name = M[1];
  const version = M[2];
  return {
    name: name,
    version: version,
  };
}

const browser = getBrowserInfo();

function applyStyles(styles) {
  for (const property in styles) {
    arrow.style[property] = styles[property];
  }
}

console.log(browser.name);

switch (browser.name.toLowerCase()) {
  case "chrome":
    applyStyles({ bottom: "0", left: "50%", transform: "translateX(-50%)" });
    break;
  case "firefox":
    applyStyles({ top: "30px", left: "85%" });
    break;
  case "edge":
    applyStyles({ bottom: "0", right: "10px" });
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
    console.log(downloadBtns);
    downloadBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (arrow) {
          setTimeout(() => {
            arrow.style.display = "block";
          }, 1500);
        }
      });
    });

    console.log(res);
  } catch (error) {
    console.log("err", error);
  } finally {
    loader.style.display = "none";
  }
});
