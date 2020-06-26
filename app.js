(async function launch() {
    

    let database = await fetch("https://character-database.becode.xyz/characters");
    let res = await database.json();
    console.table(res);
})()

//create and display single character window 
let moreInfoBtn = document.querySelectorAll(".more-info-btn")

for (let i=0; i<moreInfoBtn.length; i++) {
    moreInfoBtn[i].addEventListener('click', ()=> {

    console.log('worked')
    
    let body = document.querySelector('body')

    let container = document.createElement("div")
    container.classList.add('container')
    let name = document.createElement("h2")
    name.innerHTML = 'Name of the character'
    let fullDescription = document.createElement("p")
    fullDescription.innerHTML = 'Full character description to be displayed here'
    let image = document.createElement("img")
    image.src ="wireframe-character-project.png"

    let closeBtn = document.createElement('button')
    closeBtn.classList.add('close-btn')
    closeBtn.innerHTML = 'Close window'
    

    container.appendChild(name)
    container.appendChild(fullDescription)
    container.appendChild(image)
    container.appendChild(closeBtn)

    body.appendChild(container)

    console.log(document.querySelector(".close-btn"))
    document.querySelector(".close-btn").addEventListener('click', () => {
        body.removeChild(container)
        })
    })
}