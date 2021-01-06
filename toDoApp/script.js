const form = document.querySelector('form');
const input = document.querySelector('#taskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
const deleteBtn = document.querySelector('delete-item');
let items;

loadItems();
eventListeners();

function eventListeners(){
    form.addEventListener('submit', addNewItem);
    taskList.addEventListener('click',deleteItem);
    btnDeleteAll.addEventListener('click',deleteAll);
}

function loadItems(){
    items=getItemsFromLS();
    items.forEach(function(item){
        createItem(item);
    })
}
function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items=[];
    }else{
        items=JSON.parse(localStorage.getItem('items'));
    }
    return items;
}
function setItemToLS(text){
    items=getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}
function deleteItemsFromLLS(text){
    items=getItemsFromLS();
    items.forEach(function(item,index){
        if(item===text){
            items.splice(index,1);
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}
function createItem(text){
        const li = document.createElement('li');
        li.className="list-group-item list-group-item-secondary";
        li.innerHTML=text;
        const a = document.createElement('a');
        a.className="delete-item float-right";
        a.setAttribute('href','#')
        a.innerHTML="X";
        li.appendChild(a);
        taskList.appendChild(li);
}

function addNewItem(e){

    if(input.value===''){
        alert('Do not forget adding item');
    }else{
        
        createItem(input.value);
        setItemToLS(input.value);
        input.value="";
    }
    
    
    e.preventDefault();
}

function deleteItem(e){
    
    if(e.target.innerHTML==="X"){
        e.target.parentElement.remove();
    }else if(e.target.className==="list-group-item list-group-item-secondary"){
        e.target.className="list-group-item list-group-item-secondary done";
    }else if(e.target.className==="list-group-item list-group-item-secondary done"){
        e.target.className="list-group-item list-group-item-secondary";
    }
    let txt = e.target.parentElement.textContent;
    deleteItemsFromLLS(txt.slice(0,txt.length-1));

    e.preventDefault();
    
}

function deleteAll(e){
    if(confirm('Are you sure')){
        taskList.innerHTML="";
    }
    localStorage.clear();
    
    e.preventDefault();
}