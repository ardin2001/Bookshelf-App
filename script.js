let storageKey = "bookshelf";
const id_user = document.getElementById("id_user");
const search = document.getElementById("search")

search.addEventListener("keyup",(e) =>{
    const keywords = e.target.value.toLowerCase();
    let items = document.querySelectorAll(".card-data");
    items.forEach(element => {
        const title = element.getElementsByClassName("content")[0].firstElementChild.innerHTML.toLowerCase()
        if(title.indexOf(keywords) != -1){
            element.setAttribute("style","display : flex;")
        }else{
            element.setAttribute("style","display : none !important;")
        }
    });
});

const save = () => {
    if(id_user.value == undefined){
        let data = {
            id : new Date().getTime(),
            title : document.getElementById("title").value,
            author : document.getElementById("author").value,
            year : parseInt(document.getElementById("year").value),
            isComplete : Boolean(parseInt(document.getElementById("status").value))
        }
        let userData = []
        if (localStorage.getItem(storageKey) !== null) {
            userData = JSON.parse(localStorage.getItem(storageKey));
        }
        userData.push(data)
        localStorage.setItem(storageKey, JSON.stringify(userData));
    }
    else{
        let userData = []
        if (localStorage.getItem(storageKey) !== null) {
            userData = JSON.parse(localStorage.getItem(storageKey));
        }
        userData.forEach(((element,i) => {
            if(element.id == id_user.value){
                element.title = document.getElementById("title").value,
                element.author = document.getElementById("author").value,
                element.year = parseInt(document.getElementById("year").value),
                element.isComplete = Boolean(parseInt(document.getElementById("status").value))
            }
        }))
        localStorage.setItem(storageKey, JSON.stringify(userData));
    }
}

const render = () =>{
    const userData = JSON.parse(localStorage.getItem(storageKey));
    const undone = document.querySelector(".undone")
    const done = document.querySelector(".done")
    const h2done = document.createElement("h2");
    const h2undone = document.createElement("h2");
    h2done.innerText = "Buku Selesai Dibaca";
    h2undone.innerText = "Buku Belum Selesai Dibaca";
    undone.innerHTML = ""
    undone.appendChild(h2undone)
    done.innerHTML = ""
    done.appendChild(h2done)
    if(userData != undefined) {
        userData.forEach((element,i) => {
            if(element.isComplete == true){
                const databases = `<div class="content">
                    <h3>${element.title}</h3>
                    <p>Nama Pengarang : ${element.author}</p>
                    <p>Tahun Terbit : ${element.year}</p>
                </div>
                <div class="btn">
                    <button onclick="Delete(${i})" class="btn-delete">Hapus</button>
                    <button onclick="Edit(${i})" class="btn-edit">Edit</button>
                    <button onclick="Status(${i})" class="btn-undone">Belum Selesai</button>
                </div>`
                const container = document.createElement("div");
                container.setAttribute("class","card-data")
                container.innerHTML= databases
                done.appendChild(container)
            }
            else{
                const databases = `<div class="content">
                    <h3>${element.title}</h3>
                    <p>Nama Pengarang : ${element.author}</p>
                    <p>Tahun Terbit : ${element.year}</p>
                </div>
                <div class="btn">
                    <button onclick="Delete(${i})" class="btn-delete">Hapus</button>
                    <button onclick="Edit(${i})" class="btn-edit">Edit</button>
                    <button onclick="Status(${i})" class="btn-done">Selesai</button>
                </div>`
                const container = document.createElement("div");
                container.setAttribute("class","card-data")
                container.innerHTML= databases
                undone.appendChild(container)
            }
        });
    }         
}

const Status = (id) =>{
    let userData = []
    if (localStorage.getItem(storageKey) !== null) {
        userData = JSON.parse(localStorage.getItem(storageKey));
    }
    userData.forEach((element,i) =>{
        if(i == id) {
            if(element.isComplete){
                element.isComplete = false
            }
            else{
                element.isComplete = true
            }
        }
    })
    localStorage.setItem(storageKey, JSON.stringify(userData));
    render()
}

const Delete = (id) =>{
    let userData = []
    if (localStorage.getItem(storageKey) !== null) {
        userData = JSON.parse(localStorage.getItem(storageKey));
    }
    userData.splice(id,1)
    localStorage.setItem(storageKey, JSON.stringify(userData));
    render()
}
const database = () =>{
    let userData = []
    if (localStorage.getItem(storageKey) !== null) {
        userData = JSON.parse(localStorage.getItem(storageKey));
    }
    return userData
}
const Edit = id =>{
    let userData = []
    let u_title = document.getElementById("title")
    let u_author = document.getElementById("author")
    let u_year = document.getElementById("year")
    let id_user = document.getElementById("id_user")
    let u_status = document.getElementById("status")
    if (localStorage.getItem(storageKey) !== null) {
        userData = JSON.parse(localStorage.getItem(storageKey));
    }
    userData.forEach((element,i) => {
        if(i == id){
            u_title.value = element.title
            u_author.value = element.author
            u_year.value = element.year
            u_status.value = element.isComplete
            id_user.value = element.id
        }
        
    })
    localStorage.setItem(storageKey, JSON.stringify(userData));
    render()
}

document.body.onload = render;