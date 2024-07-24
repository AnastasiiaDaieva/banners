export default function offerCard({amount:i,license_name:s,name_prod:e,price_key:a,is_best:c,link:d}){return`<li class="offer__card">
          <div class="price__container">
          ${c?'<div class="price__best">Best Value</div>':""}
          
          ${a?.includes("%")?`<div class="price__discount">
          <div class="price__ribbon">
          <div class="ribbon"> <div> <p class="price_discount-amount">${a}</p>
              
          <p>OFF</p></div> </div>
          </div>
          </div>`:""}
         <div class="price__text-wrapper"> <p class="price__amount">$${i}</p>
          ${a?.includes("%")?`<p class="price__original">
          $${+i*(100/a.replace(/%/g,""))} 
          </p>`:""}</div>
          
          </div>
          <div class="description__container"><p>${e}</p>
          <p class="description__license">${s}</p>
         </div> <a href="${d}" target="_blank" class="offer__download">
         <span>Download</span> <img src="../src/img/download.png" alt="Download" height="30" width="30"/>
         </a>
        </li>`}