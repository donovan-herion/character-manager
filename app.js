(async function launch() {
  let database = await fetch(
    "https://character-database.becode.xyz/characters"
  );
  let charactersInApi = await database.json();
  console.table(charactersInApi);

  displayCharacters();

  function displayCharacters() {
    let index = 0;

    //display characters
    charactersInApi.forEach((elem) => {

      let div = document.createElement("div");
      div.classList.add("flex-container");

      let h2 = document.createElement("h2");
      h2.innerHTML = elem.name;

      let p = document.createElement("p");
      p.classList.add("center");
      p.innerHTML = elem.shortDescription;

      let img = document.createElement("img");
      img.src = `data:image/jpeg;base64,${elem.image}`;

      let moreInfo = document.createElement("a");
      moreInfo.innerHTML = "More Info";
      moreInfo.classList.add("more-info-btn");
      moreInfo.setAttribute("data-moreInfo", index);

      let modification = document.createElement("a");
      modification.innerHTML = "Modify";
      modification.classList.add("modification-btn");
      modification.setAttribute("data-modification", index);

      let deleteCharacter = document.createElement("a");
      deleteCharacter.innerHTML = "Delete"
      deleteCharacter.classList.add("delete-character-btn");
      deleteCharacter.setAttribute("data-deleteCharacter", elem.id);

      index++;

      div.appendChild(h2);
      div.appendChild(p);
      div.appendChild(img);
      div.appendChild(moreInfo);
      div.appendChild(modification);
      div.appendChild(deleteCharacter);
      

      let mainContainer = document.querySelector(".main-flex-container");

      mainContainer.appendChild(div);
    });
  }



  //add event listener on the parent of the dynamically created elements (won't work on dynamically created elements directly)

  let main = document.querySelector(".main-flex-container");

  //popup moreInfo
  
  main.addEventListener("click", function (e) {


    if (e.target.classList.contains("more-info-btn")) {
      let indexFromButtonId = e.target.getAttribute("data-moreInfo");

      let body = document.querySelector("body");

      let container = document.createElement("div");
      container.classList.add("container");

      let name = document.createElement("h2");
      name.innerHTML = charactersInApi[indexFromButtonId].name;

      let fullDescription = document.createElement("p");
      fullDescription.innerHTML = charactersInApi[indexFromButtonId].description;

      let image = document.createElement("img");
      image.src = `data:image/jpeg;base64,${charactersInApi[indexFromButtonId].image}`;

      let closeBtn = document.createElement("button");
      closeBtn.classList.add("close-btn");
      closeBtn.innerHTML = "Close window";

      container.appendChild(name);
      container.appendChild(fullDescription);
      container.appendChild(image);
      container.appendChild(closeBtn);

      body.appendChild(container);

      body.addEventListener("click", function (e) {
        if (e.target.classList.contains("close-btn")) {
          body.removeChild(container);
        }
      });
    }

    //Popup Modify

    if (e.target.classList.contains("modification-btn")) {

      let indexFromButtonId = e.target.getAttribute("data-modification");
      console.log("workeddd");

      let body = document.querySelector("body");

      let container = document.createElement("div");
      container.classList.add("container");

      let nameLabel = document.createElement("label");
      nameLabel.innerHTML = "Name of your character";
      let nameInput = document.createElement("input");
      nameInput.value = charactersInApi[indexFromButtonId].name;

      let shortDescriptionLabel = document.createElement("label");
      shortDescriptionLabel.innerHTML = "Short description of the character";
      let shortDescription = document.createElement("input");
      shortDescription.value = charactersInApi[indexFromButtonId].shortDescription;

      let fullDescriptionLabel = document.createElement("label");
      fullDescriptionLabel.innerHTML = "Long description of the character";
      let fullDescription = document.createElement("input");
      fullDescription.value = charactersInApi[indexFromButtonId].description;

      let imageURILabel = document.createElement("label");
      imageURILabel.innerHTML = "Image Link";
      let imageURI = document.createElement("input");
      imageURI.value = charactersInApi[indexFromButtonId].image; // we should probably parse it or do something so that it works

   
      let submitInput = document.createElement("input");
      submitInput.value = "Modify character";
      submitInput.setAttribute('type', 'submit')

      let closeBtn = document.createElement("button");
      closeBtn.classList.add("close-btn");
      closeBtn.innerHTML = "Close window";

      container.appendChild(nameLabel);
      container.appendChild(nameInput);
      container.appendChild(shortDescriptionLabel);
      container.appendChild(shortDescription);
      container.appendChild(fullDescriptionLabel);
      container.appendChild(fullDescription);
      container.appendChild(imageURILabel);
      container.appendChild(imageURI);
      container.appendChild(submitInput)
      container.appendChild(closeBtn);

      body.appendChild(container);

      body.addEventListener("click", function (e) {
        if (e.target.classList.contains("close-btn")) {
          body.removeChild(container);
        }
      });
    }

  //Popup delete 

  if (e.target.classList.contains("delete-character-btn")) {
    
    let confirmBox = confirm("Are you sure?");

    console.log(confirmBox);


    if(confirmBox) {
      
      //delete character
      let indexFromDataDeleteCharacter = e.target.getAttribute("data-deleteCharacter");
      deleteCharacter(indexFromDataDeleteCharacter);

      }

      function deleteCharacter(id) {

        const characterObject = JSON.stringify({

            id: id

          });

          let url = "https://character-database.becode.xyz/characters/" + id;
          
          fetch(url, {
            method: "DELETE",
            headers: new Headers({
              "content-type": "application/json"
            })
          })

          //pas indispensable
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(err => console.error(err));

          window.location.reload()
      }
    }
 });


 // Popup Create character

    // if (e.target.classList.contains("new-character-btn")) {
      let newCharacterBtn = document.querySelector('.new-character-btn')
      
      newCharacterBtn.addEventListener('click', () => {
        
        let body = document.querySelector("body");
        
        let container = document.createElement("div");
        container.classList.add("container");
        
        let nameLabel = document.createElement("label");
        nameLabel.innerHTML = "Name of your character";
        let nameInput = document.createElement("input");
        
        let shortDescriptionLabel = document.createElement("label");
        shortDescriptionLabel.innerHTML = "Short description of the character";
        let shortDescription = document.createElement("input");
        
        let fullDescriptionLabel = document.createElement("label");
        fullDescriptionLabel.innerHTML = "Long description of the character";
        let fullDescription = document.createElement("input");
        
        let imageURILabel = document.createElement("label");
        imageURILabel.innerHTML = "Image Link";
        let imageURI = document.createElement("input");
        
        let submitInput = document.createElement("input");
        submitInput.value = "Create new character";
        submitInput.setAttribute('type', 'submit')
        
        let closeBtn = document.createElement("button");
        closeBtn.classList.add("close-btn");
        closeBtn.innerHTML = "Close window";
        
        container.appendChild(nameLabel);
        container.appendChild(nameInput);
        container.appendChild(shortDescriptionLabel);
        container.appendChild(shortDescription);
        container.appendChild(fullDescriptionLabel);
        container.appendChild(fullDescription);
        container.appendChild(imageURILabel);
        container.appendChild(imageURI);
        container.appendChild(submitInput)
        container.appendChild(closeBtn);
        
        body.appendChild(container);
        
        //create character for real

        submitInput.addEventListener('click', () => {

          // function encodeImageFileAsURL(element) {
          //   var file = element.files[0];
          //   reader = new FileReader();
          //   reader.onloadend = function() {
          //       result = reader.result;
          //       result1 = result.substring(23, result.length)
          //     console.log('RESULT', result1)
          //   }
          //   reader.readAsDataURL(file);
          // }
            
            let nameInputValue = nameInput.value;
            let shortDescriptionValue = shortDescription.value;
            let fullDescriptionValue = fullDescription.value
        
            if(nameInputValue == false || shortDescriptionValue == false || fullDescriptionValue == false){
                alert('The form has to be completed to create a new character'); 
            }else{
        //         addCharact();
        //     }
        //     async function createCharact() {
        //         let newCharact = {
        //             description : newDescription,
        //             shortDescription : newShortDescription,
        //             name : newName,
        //             image : result1,
        //         }
        //         charactArray.push(newCharact);
        //         console.log(charactArray);
                
        //         return newCharact;
        //     };
        
        //     async function addCharact() {
        //         const pushCharact = await fetch("https://character-database.becode.xyz/characters", {
        //             method: "POST",
        //             headers: new Headers({
        //                 "Content-Type": "application/json"
        //             }),
        //             body: JSON.stringify(await createCharact()),
        //         });
        //         return pushCharact;
        //     };
        // });
        // })


        //remove creation character page

        body.addEventListener("click", function (e) {
          if (e.target.classList.contains("close-btn")) {
            body.removeChild(container);
          }
        })
      })
    

  })();
  