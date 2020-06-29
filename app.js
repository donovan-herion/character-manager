(async function launch() {
    let database = await fetch("https://character-database.becode.xyz/characters");
    let charactersInApi = await database.json();
    console.table(charactersInApi);

    displayCharacters()
  

function displayCharacters() {
    
    let index = 0

    charactersInApi.forEach(elem => {
        
        //create html template
        
        let div = document.createElement('div')
        div.classList.add('flex-container')
        
        let h2 = document.createElement('h2')
        h2.innerHTML = elem.name
        
        let p = document.createElement('p')
        p.classList.add('center')
        p.innerHTML = elem.shortDescription
        
        let img = document.createElement('img')
        img.src= `data:image/jpeg;base64,${elem.image}`
        
        let moreInfo = document.createElement('a')
        moreInfo.innerHTML="More Info"
        moreInfo.classList.add('more-info-btn')
        moreInfo.id = index
        index++
        
        let modification = document.createElement('a')
        modification.innerHTML="Modify"
        modification.setAttribute('href', 'modification.html')
        
        let newCharacter = document.createElement('a')
        newCharacter.innerHTML="Create New"
        newCharacter.setAttribute('href', 'new-character.html')
        
        div.appendChild(h2)
        div.appendChild(p)
        div.appendChild(img)
        div.appendChild(moreInfo)
        div.appendChild(modification)
        div.appendChild(newCharacter)
        
        // display template in dom
        
        let mainContainer = document.querySelector('.main-flex-container')
        
        mainContainer.appendChild(div)
        
        
    })
}


//add event listener on the parent of the dynamically created elements (won't work on dynamically created elements directly)

let main = document.querySelector(".main-flex-container")


main.addEventListener('click', function(e) {
    if(e.target.classList.contains('more-info-btn')) {
        
            let indexFromButtonId = e.target.id            
            
            let body = document.querySelector('body')
            
            let container = document.createElement("div")
            container.classList.add('container')

            let name = document.createElement("h2")
            name.innerHTML = charactersInApi[indexFromButtonId].name

            let fullDescription = document.createElement("p")
            fullDescription.innerHTML = charactersInApi[indexFromButtonId].description

            let image = document.createElement("img")
             image.src = `data:image/jpeg;base64,${charactersInApi[indexFromButtonId].image}`

            let closeBtn = document.createElement('button')
            closeBtn.classList.add('close-btn')
            closeBtn.innerHTML = 'Close window'
            
            
            container.appendChild(name)
            container.appendChild(fullDescription)
            container.appendChild(image)
            container.appendChild(closeBtn)
            
            body.appendChild(container)
            
            body.addEventListener('click', function(e) {
                if(e.target.classList.contains('close-btn')) {
                    
                    body.removeChild(container)
                    
                }
                
            })
      
    }
    
});


})()