  const sections = ['Store', 'Inventary', 'Estadistics']; 
  const products = JSON.parse(localStorage.getItem('productssaved')) || [];
  const continer = document.getElementById('productscontiner')
  const formulary = document.getElementById('window');
  const sell = document.getElementById('Sell');
  const billcontiner = document.getElementById('billcontiner');
  const bill = document.getElementById('bill');
  const total = document.getElementById('total');
  const sales = JSON.parse(localStorage.getItem('salesmade')) || [];
  const salescontiner = document.getElementById('salezcontiner');
  const saleinfo = document.getElementById('saleinfo');
  const resultscontainer = document.getElementById('searchresults');
  var savedbill = [];
  var billitems = 0;
  billcontiner.style.display = 'none';
  formulary.style.display = 'none';
  sell.style.display = 'none';
  saleinfo.style.display = 'none';
  (products.length == 0) ? document.getElementById('mensage').style.display = 'block' : document.getElementById('mensage').style.display = 'none';
  var totalamount = 0;
  renderproducts();
  changesection('Store');
  rendersales();

function changesection(section){
const element = Array.from( document.getElementsByTagName('section'))
element.forEach(e => {if(e.id == section){e.style.display = 'block';}
else{e.style.display = 'none';}})
}

function Addproduct(){
    const window = document.getElementById('A1')
    window.style.display = 'none';
    const window2 = document.getElementById('window')
    window2.style.display = 'block';
}

function submit(){
    const productname = document.getElementById('Productname');
    const productdescription = document.getElementById('Productdescription');
    const Productprice = document.getElementById('Productprice');
    products.push({name: productname.value, description: productdescription.value, price: Productprice.value});
    renderproducts();
    formulary.style.display = 'none';
    const window = document.getElementById('A1')
    window.style.display = 'block';
    const inputs = Array.from(document.getElementsByClassName('product inputfield'));
    inputs.forEach(input => {input.value = ''});
    saveproducts();
}
function renderproducts(){
    continer.innerHTML = '';
    products.forEach((Item, index) => {
    const product = document.createElement('span');
    product.innerHTML = `<h1>${Item.name}</h1>
    <p>${Item.description}</p>    
    <h2>$${Item.price}</h2>
    <button onclick="deleteproduct(${index})">Delete</button>`;
    continer.appendChild(product);})

}
function deleteproduct(index){
    products.splice(index,1);
    renderproducts();
    saveproducts();
}

function Sell(){
    const button = document.getElementById('To sell');
    const sellsection = document.getElementById('Sell');
    sellsection.style.display = 'block';
    button.style.display = 'none';
    billcontiner.style.display = 'block';
}  

function Searchproduct(){
    const search = document.getElementById('producttosearch');
    const result = products.filter(i=> i.name == search.value);
    resultscontainer.innerHTML = '';
    result.forEach(item=> {
        const product = document.createElement('span');
        product.innerHTML = `<h1>${item.name}</h1>
        <p>${item.description}</p>    
        <h2>$${item.price}</h2>
        <button onclick="addtobill('${item.name}','${item.description}','${item.price}')">Add to bill</button>`;
        resultscontainer.appendChild(product);
    });
search.value = '';
}
function addtobill(name, description, price){
    const billproduct = products.find(i=> i.name == name && i.description == description && i.price == price);
    const billitem = document.createElement('li');
    billitem.innerHTML = `<h1 class="billproduct">${billproduct.name}</h1>
    <h2 class="billproduct">$${billproduct.price}</h2>`;
    bill.appendChild(billitem);
    totalamount += billproduct.price*1;
    total.innerText = Number(`${totalamount.toFixed(2)}`);
    billitems += 1;
    savedbill.push({name: billproduct.name, price: billproduct.price, description: billproduct.description});
}

function clearbill(){
    bill.innerHTML = '';
    totalamount = 0;
    total.innerText = '0';
    sell.style.display = 'none';
    const button = document.getElementById('To sell');
    button.style.display = 'block';
    billcontiner.style.display = 'none';
    savedbill = [];
    billitems = 0;
}

function confirmationofsell(){
    resultscontainer.innerHTML = '';
    sell.style.display = 'none';
    const button = document.getElementById('To sell');
    button.style.display = 'block';
    billcontiner.style.display = 'none';
    sales.push({sale: savedbill, total: totalamount, items: billitems});
    saveproducts();
    rendersales();
    bill.innerHTML = '';
    total.innerText = '0';
    totalamount = 0;  
    savedbill = [];
    billitems = 0;
}

function rendersales(){
    salescontiner.innerHTML = '';
    sales.forEach((sale,index) => {
        const saleitem = document.createElement('span');
        saleitem.innerHTML = `<h3>Sale ${index + 1}</h3>
        <p>Items sold: ${sale.items}</p>
        <p>Total amount: $${sale.total.toFixed(2)}</p>
        <button onclick="viewsaleitems(${index})">View information</button>`;
        salescontiner.appendChild(saleitem);
    });

}

function viewsaleitems(index){
    saleinfo.style.display = 'block';
    const windowsale = document.getElementById('windowsale');
    windowsale.innerHTML = '';
    sales[index].sale.forEach(item => {
        const saleitem = document.createElement('span');
        saleitem.innerHTML = `<h1 class="billproduct">Product: ${item.name}</h1>
        <p >Description: ${item.description}</p>
        <h2>Price: $${item.price}</h2>`;        
        windowsale.appendChild(saleitem); 
    });
    windowsale.innerHTML += `<h2>Total items sold: ${sales[index].items}</h2>
    <h2>Total amount: $${sales[index].total.toFixed(2)}</h2>`;
}

function hideinfo(){
    saleinfo.style.display = 'none';
}

function saveproducts(){
    localStorage.setItem('productssaved', JSON.stringify(products));
    localStorage.setItem('salesmade', JSON.stringify(sales));
}