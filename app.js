const WHATSAPP_NUMBER="573237127014";
const menu=[
{category:"Perros calientes",items:[
["Sencillo",7000,"Pan de mantequilla, salchicha, verduras, mozzarella y salsas"],
["Choriperro",12000,"Pan de mantequilla, salchicha, chorizo, chimichurri, verduras, mozzarella y salsas"],
["Pollodog",13000,"Pan de mantequilla, salchicha, pollo, verduras, mozzarella y salsas"],
["Gemelo",10000,"Pan de mantequilla, doble salchicha, verduras, mozzarella y salsas"],
["Suizo",15000,"Pan de mantequilla, salchicha suiza, verduras, mozzarella y salsas"],
["Italiano",9000,"Pan de mantequilla, salchicha, jamón, verduras, mozzarella y salsas"],
["Medio Suizo",12000,"Pan de mantequilla, media suiza, verduras, mozzarella y salsas"],
["Italo-Suizo",17000,"Pan de mantequilla, suiza, jamón, verduras, mozzarella y salsas"]]},
{category:"Salchipapas",items:[
["Sencilla",13000,"Papa, salchicha, salsas de la casa"],["Salchipollo",18000,"Papa, salchicha, pollo, salsas"],
["Salchicerdo",18000,"Papa, salchicha, cerdo, salsas de la casa"],["Choripapa",18000,"Papa, salchicha, chorizo de cerdo, salsas"],
["Suiza",17000,"Papa, salchicha, salchicha suiza, salsas"],["Butipapa",16000,"Papa, salchicha, butifarra, salsas"],
["Choripollo",22000,"Papa, salchicha, chorizo y pollo, salsas"],["Mixta",23000,"Papa, salchicha, pollo y cerdo, salsas"]]},
{category:"Burgers",items:[
["Classic",18000,"Pan brioche, carne, tocineta, cebolla caramelizada, mozzarella, vegetales y salsa (con papas)"],
["Doble Sabor",24000,"Pan brioche, carne, pollo, tocineta, cebolla caramelizada, mozzarella, vegetales y salsa (con papas)"],
["La Brutal",27000,"Pan brioche, carne, pollo, suiza, tocineta, cebolla caramelizada, mozzarella, vegetales y salsa (con papas)"],
["King",26000,"Pan brioche, doble carne, tocineta, cebolla caramelizada, mozzarella, vegetales y salsa (con papas)"],
["Texana",23000,"Pan brioche, carne, tocineta, aros de cebolla, mozzarella, vegetales y salsa (con papas)"]]},
{category:"Chorizos",items:[
["Sencilla",8000,"Chorizo de cerdo artesanal acompañado de bollo o papa francesa, limón, chimichurri y salsas"],
["Doble",14000,"Doble chorizo de cerdo artesanal acompañado de bollo o papa francesa, limón, chimichurri y salsas"]]},
{category:"Salvajadas",items:[
["Duo Salvaje",35000,"Papa, salchicha, chorizo de cerdo, butifarra, pollo, gratinado (maíz o jamón)"],
["La Atrevida",45000,"Papa, salchicha, chorizo de cerdo, butifarra, pollo, cerdo, gratinado (maíz o jamón)"],
["Sixva",65000,"Papa, salchicha, chorizo de cerdo, butifarra, pollo, cerdo, gratinado, maíz y jamón"]]},
{category:"Desgranados",items:[
["Pollo",18000,"Bollo, pollo, chongo, maíz, gratinado"],["Cerdo",18000,"Bollo, cerdo, chongo, maíz, gratinado"],
["Chorizo",18000,"Bollo, chorizo, chongo, maíz, gratinado"],["PA 2'",32000,"Bollo, chorizo, pollo, chongo, maíz, gratinado, tocineta"]]},
{category:"Asados",items:[
["Pechuga a la plancha",18000,"Acompañada de papas a la francesa o bollo, ensalada"],
["Pechuga gratinada",21000,"Acompañada de papas a la francesa o bollo, ensalada"],
["Carne asada",20000,"Acompañada de papas a la francesa o bollo, ensalada"],
["La Parrillera",35000,"Carne, pechuga, chorizo artesanal, papas francesa, bollo, chimichurri, salsas"]]},
{category:"Bebidas",items:[["Coca-Cola personal",2500,""],["Coca-Cola litro",6000,""],["Cerveza",3000,""]]},
{category:"Adicionales",items:[["Pollo",5000,""],["Cerdo",5000,""],["Gratinado",5000,""],["Chorizo de cerdo",5000,""],["Papas",4000,""],["Maíz",2000,""],["Jamón",2000,""],["Tocineta",3000,""]]}
];

function customizationFor(category,desc){
 const r=[];
 if(category==="Asados")r.push("Sin ensalada");
 if(category==="Perros calientes"){r.push("Sin lechuga");r.push("Sin piña")}
 if(category==="Salchipapas"){r.push("Sin lechuga");r.push("Sin piña");if(/ma[ií]z/i.test(desc))r.push("Sin maíz")}
 return r;
}
const money=n=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(n);
let activeCategory="Todos",cart=JSON.parse(localStorage.getItem("nacha_cart")||"[]"),pendingProduct=null,editingIndex=null;
const menuEl=document.querySelector("#menu"),categoriesEl=document.querySelector("#categories"),searchEl=document.querySelector("#search"),customizer=document.querySelector("#customizer"),cartPanel=document.querySelector("#cartPanel");

function renderCategories(){const names=["Todos",...menu.map(x=>x.category)];categoriesEl.innerHTML=names.map(n=>`<button class="category ${n===activeCategory?"active":""}" data-category="${n}">${n}</button>`).join("")}
function renderMenu(){
 const q=searchEl.value.trim().toLowerCase(),sections=activeCategory==="Todos"?menu:menu.filter(s=>s.category===activeCategory);let html="";
 sections.forEach(s=>{const items=s.items.filter(i=>!q||`${i[0]} ${i[2]}`.toLowerCase().includes(q));if(!items.length)return;
 html+=`<section class="menu-section"><div class="section-title"><h2>${s.category}</h2><span>${items.length} opciones</span></div><div class="menu-grid">
 ${items.map(i=>`<article class="card"><div><div class="card__top"><h3>${i[0]}</h3><span class="price">${money(i[1])}</span></div>${i[2]?`<p class="desc">${i[2]}</p>`:""}</div>
 <button class="add" data-name="${encodeURIComponent(i[0])}" data-price="${i[1]}" data-category="${encodeURIComponent(s.category)}" data-desc="${encodeURIComponent(i[2])}">+ Agregar</button></article>`).join("")}</div></section>`});
 menuEl.innerHTML=html||`<div class="empty">No encontramos productos con esa búsqueda.</div>`;
}
function saveCart(){localStorage.setItem("nacha_cart",JSON.stringify(cart));renderCart()}
function openCustomizer(product,index=null){
 pendingProduct=product;editingIndex=index;document.querySelector("#customizerTitle").textContent=product.name;document.querySelector("#customizerDescription").textContent=product.desc||"";
 const rules=customizationFor(product.category,product.desc),existing=index!==null?(cart[index].mods||[]):[],box=document.querySelector("#customizerOptions");
 box.innerHTML=rules.length?`<div class="option-group"><h3>¿Cómo lo quieres?</h3><div class="option-list">${rules.map(r=>`<label class="option"><input type="checkbox" data-mod="${r}" ${existing.includes(r)?"checked":""}><span>${r}</span></label>`).join("")}</div><p class="helper">Estas modificaciones no tienen costo adicional.</p></div>`:`<div class="option-group"><p class="helper">Este producto no tiene modificaciones especiales. Puedes agregarlo directamente.</p></div>`;
 customizer.classList.add("open");customizer.setAttribute("aria-hidden","false");
}
function closeCustomizer(){customizer.classList.remove("open");customizer.setAttribute("aria-hidden","true");pendingProduct=null;editingIndex=null}
function confirmProduct(){
 if(!pendingProduct)return;const mods=[...document.querySelectorAll("#customizerOptions input[data-mod]:checked")].map(x=>x.dataset.mod);
 if(editingIndex!==null)cart[editingIndex].mods=mods;
 else cart.push({name:pendingProduct.name,price:pendingProduct.price,category:pendingProduct.category,desc:pendingProduct.desc,qty:1,mods});
 saveCart();closeCustomizer();openCart();
}
function changeQty(i,d){cart[i].qty+=d;if(cart[i].qty<=0)cart.splice(i,1);saveCart()}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.qty*x.price,0);document.querySelector("#cartCount").textContent=count;document.querySelector("#cartTotal").textContent=money(total);
 document.querySelector("#cartItems").innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-row"><div class="cart-row__top"><div><strong>${x.qty}x ${x.name}</strong><small>${money(x.qty*x.price)} · ${x.category}</small></div></div>${x.mods?.length?`<small>Modificaciones: ${x.mods.join(", ")}</small>`:""}<div class="cart-row__actions"><div class="qty"><button data-minus="${i}">−</button><b>${x.qty}</b><button data-plus="${i}">+</button></div><div><button class="edit-item" data-edit="${i}">Modificar</button><button class="remove-item" data-remove="${i}">Eliminar</button></div></div></div>`).join(""):`<div class="empty">Tu pedido está vacío.</div>`;
}
function openCart(){cartPanel.classList.add("open");cartPanel.setAttribute("aria-hidden","false")}
function closeCart(){cartPanel.classList.remove("open");cartPanel.setAttribute("aria-hidden","true")}

categoriesEl.addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;renderCategories();renderMenu()});
menuEl.addEventListener("click",e=>{const b=e.target.closest(".add");if(!b)return;openCustomizer({name:decodeURIComponent(b.dataset.name),price:+b.dataset.price,category:decodeURIComponent(b.dataset.category),desc:decodeURIComponent(b.dataset.desc)})});
document.querySelector("#confirmProduct").addEventListener("click",confirmProduct);document.querySelector("#closeCustomizer").addEventListener("click",closeCustomizer);document.querySelector("#customizerBackdrop").addEventListener("click",closeCustomizer);
document.querySelector("#cartItems").addEventListener("click",e=>{if(e.target.dataset.minus!==undefined)changeQty(+e.target.dataset.minus,-1);if(e.target.dataset.plus!==undefined)changeQty(+e.target.dataset.plus,1);if(e.target.dataset.edit!==undefined)openCustomizer(cart[+e.target.dataset.edit],+e.target.dataset.edit);if(e.target.dataset.remove!==undefined){cart.splice(+e.target.dataset.remove,1);saveCart()}});
searchEl.addEventListener("input",renderMenu);document.querySelector("#cartButton").addEventListener("click",openCart);document.querySelector("#closeCart").addEventListener("click",closeCart);document.querySelector("#cartBackdrop").addEventListener("click",closeCart);
document.querySelector("#orderType").addEventListener("change",e=>{const d=e.target.value==="Domicilio";document.querySelector("#addressField").style.display=d?"block":"none";document.querySelector("#customerAddress").required=d});
document.querySelector("#whatsappButton").addEventListener("click",()=>{
 if(!cart.length)return alert("Agrega al menos un producto.");
 const name=document.querySelector("#customerName").value.trim(),phone=document.querySelector("#customerPhone").value.trim(),type=document.querySelector("#orderType").value,address=document.querySelector("#customerAddress").value.trim(),payment=document.querySelector("#paymentMethod").value,notes=document.querySelector("#orderNotes").value.trim();
 if(!name)return alert("Por favor, indica el nombre de la persona.");if(!phone)return alert("Por favor, indica un número de contacto.");if(type==="Domicilio"&&!address)return alert("Por favor, indica la dirección de entrega.");
 const total=cart.reduce((s,x)=>s+x.qty*x.price,0);
 const lines=["🍔 NACHA FAST FOOD","","Hola, quiero realizar el siguiente pedido:","",...cart.map(x=>`${x.qty}x ${x.name}${x.mods?.length?` (${x.mods.join(", ")})`:""} ........ ${money(x.qty*x.price)}`),"",`TOTAL: ${money(total)}`,"",`Nombre: ${name}`,`Número de contacto: ${phone}`,`Tipo de pedido: ${type==="Domicilio"?"🛵 Domicilio":"🏪 Recoger en tienda"}`,`Dirección: ${type==="Domicilio"?address:"No aplica"}`,`Método de pago: ${payment==="Efectivo"?"💵 Efectivo":"🏦 Transferencia"}`,`Observaciones: ${notes||"Ninguna"}`];
 window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`,"_blank");
});
renderCategories();renderMenu();renderCart();document.querySelector("#orderType").dispatchEvent(new Event("change"));