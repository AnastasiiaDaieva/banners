export default function offerCard({
  amount,
  license_name,
  name_prod,
  price_key,
  is_best,
  link,
}) {
  return `<li class="offers__card">
      <div class="price">
        ${is_best ? `<div class="price__best">Best Value</div>` : ""}
        ${
          price_key?.includes("%")
            ? `<div class="price__discount">
      <div class="price__discount-ribbon">
        <div class="price__discount-ribbon-wrapper">
          <div class="price__discount-text">
            <p class="price__discount-amount">${price_key}</p>
            <p class="price__discount-off">OFF</p>
          </div>
        </div>
      </div>
    </div>`
            : ""
        }
        <div class="price__main">
          <p class="price__main-amount">$${amount}</p>
          ${
            price_key?.includes("%")
              ? `<p class="price__main-original">
          $${+amount * (100 / price_key.replace(/%/g, ""))} 
          </p>`
              : ""
          }
        </div>
      </div>
      <div class="description">
        <p>${name_prod}</p>
        <p class="description__license">${license_name}</p>
      </div>
      <a href="${link}" target="_blank" class="download">
        <span class="download__text">Download</span>
        <img
          src="../src/img/download.png"
          alt="Download"
          height="30"
          width="30"
        />
      </a>
    </li>`;
}
