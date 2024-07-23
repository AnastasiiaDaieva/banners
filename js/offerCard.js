export default function offerCard({
  amount,
  license_name,
  name_prod,
  price_key,
  is_best,
  link,
}) {
  return `
        <li class="offer__card">
          <div class="price__container">
          ${is_best ? `<div class="price__best">Best Value</div>` : ""}
          
          ${
            price_key?.includes("%")
              ? `<div class="price__discount">
          <div class="price__ribbon">
          <div class="ribbon"> <div> <p class="price_discount-amount">${price_key}</p>
              
          <p>OFF</p></div> </div>
          </div>
          </div>`
              : ""
          }
         <div class="price__text-wrapper"> <p class="price__amount">$${amount}</p>
          ${
            price_key?.includes("%")
              ? `<p class="price__original">
          $${+amount * (100 / price_key.replace(/%/g, ""))} 
          </p>`
              : ""
          }</div>
          
          </div>
          <div class="description__container"><p>${name_prod}</p>
          <p class="description__license">${license_name}</p>
         </div> <a href="${link}" target="_blank" class="offer__download">
         <span>Download</span> <img src="../src/img/download.png" alt="Download" height="30" width="30"/>
         </a>
        </li>
      `;
}
