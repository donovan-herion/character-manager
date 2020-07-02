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

      let cancelButtonDiv = document.createElement("div");
      cancelButtonDiv.classList.add("cancelButtonDiv");

      let deleteCharacter = document.createElement("a");
      deleteCharacter.innerHTML = "<img src='assets/image/cancel.png'>"
      deleteCharacter.classList.add("delete-character-btn");
      deleteCharacter.setAttribute("data-deleteCharacter", elem.id);

      let p = document.createElement("p");
      p.classList.add("center");
      p.innerHTML = elem.shortDescription;

      let imgDiv = document.createElement("div");
      imgDiv.classList.add("imgDiv");

      let img = document.createElement("img");
      img.src = `data:image/jpeg;base64,${elem.image}`;

      //Création d'une div afin de placer les boutons côte à côte 
      let buttonGroupDiv = document.createElement("div");
      buttonGroupDiv.classList.add("buttonGroupDiv");

      let moreInfo = document.createElement("a");
      moreInfo.innerHTML = "<img src='assets/image/icons8-info-256.png'>";
      moreInfo.classList.add("more-info-btn");
      moreInfo.setAttribute("data-moreInfo", index);

      let modification = document.createElement("a");
      modification.innerHTML = "<img src='assets/image/icons8-modifier-160.png'>";
      modification.classList.add("modification-btn");
      modification.setAttribute("data-modification", index);
      modification.setAttribute("data-modification-id", elem.id);

      

      index++;
      div.appendChild(cancelButtonDiv);
      cancelButtonDiv.appendChild(deleteCharacter);
      div.appendChild(imgDiv);
      imgDiv.appendChild(img);
      div.appendChild(h2);
      div.appendChild(p);
      div.appendChild(buttonGroupDiv);
      //Insertion des boutons au sein de la Div, reliée au container
      buttonGroupDiv.appendChild(moreInfo);
      buttonGroupDiv.appendChild(modification);


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
      container.classList.add("container-info");

      let name = document.createElement("h2");
      name.innerHTML = charactersInApi[indexFromButtonId].name;
      name.classList.add("name-info");

      let fullDescriptionDiv = document.createElement("div");
      fullDescriptionDiv.classList.add("full-description-div");

      let fullDescription = document.createElement("p");
      fullDescription.innerHTML = charactersInApi[indexFromButtonId].description;
      fullDescription.classList.add("full-description");

      let imageDivInfo = document.createElement("div");
      imageDivInfo.classList.add("image-div-info");

      let image = document.createElement("img");
      image.src = `data:image/jpeg;base64,${charactersInApi[indexFromButtonId].image}`;
      image.classList.add("image-info");

      let closeBtn = document.createElement("a");
      closeBtn.classList.add("close-btn-info");
      closeBtn.innerHTML = "<img src='assets/image/cancel.png'>";

      let closeBtnInfoDiv = document.createElement("div");
      closeBtnInfoDiv.classList.add("close-btn-info-div");




      container.appendChild(closeBtn);
      closeBtn.appendChild(closeBtnInfoDiv);
      container.appendChild(name);
      container.appendChild(imageDivInfo);
      imageDivInfo.appendChild(image);
      container.appendChild(fullDescriptionDiv);
      fullDescriptionDiv.appendChild(fullDescription);
      

      body.appendChild(container);

      body.addEventListener("click", function (e) {
        if (e.target.classList.contains("close-btn-info")) {
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

      //Division du container en deux

      let leftContainer = document.createElement("div");
      leftContainer.classList.add("leftContainer");


      let nameLabel = document.createElement("label");
      nameLabel.innerHTML = "Name of your character";
      let nameInput = document.createElement("input");
      nameInput.classList.add("nameInput");
      nameInput.value = charactersInApi[indexFromButtonId].name;

      let shortDescriptionLabel = document.createElement("label");
      shortDescriptionLabel.innerHTML = "Short description";
      let shortDescription = document.createElement("textarea");
      shortDescription.classList.add("shortDescription");
      shortDescription.value = charactersInApi[indexFromButtonId].shortDescription;

      let fullDescriptionLabel = document.createElement("label");
      fullDescriptionLabel.innerHTML = "Long description";
      let fullDescription = document.createElement("textarea");
      fullDescription.classList.add("fullDescription");
      fullDescription.value = charactersInApi[indexFromButtonId].description;

      let rightContainer = document.createElement("div");
      rightContainer.classList.add("rightContainer");

      let imageURILabel = document.createElement("label");
      imageURILabel.innerHTML = "Image Link";
      let imageURI = document.createElement("input");
      imageURI.classList.add("imageURI");
      imageURI.value = charactersInApi[indexFromButtonId].image; // we should probably parse it or do something so that it works

      let submitInputModifyDiv = document.createElement("div");
      submitInputModifyDiv.classList.add("submit-input-modify-div");

      let submitInput = document.createElement("input");
      submitInput.classList.add("submit-input-modify")
      submitInput.value = "Saves changes";
      submitInput.setAttribute('type', 'submit');

      // let closeBtnModifyDiv = document.createElement("div");
      // closeBtnModifyDiv.classList.add("close-btn-modify-div");
      
      // let closeBtn = document.createElement("button");
      // closeBtn.classList.add("close-btn-modify");
      // closeBtn.innerHTML = "Cancel";

      let closeBtn = document.createElement("a");
      closeBtn.classList.add("close-btn-create");
      closeBtn.innerHTML = "<img src='assets/image/cancel.png'>";

      let closeBtnModifyDiv = document.createElement("div");
      closeBtnModifyDiv.classList.add("close-btn-info-div");

      container.appendChild(rightContainer);
      container.appendChild(leftContainer);
      leftContainer.appendChild(nameLabel);
      leftContainer.appendChild(nameInput);
      leftContainer.appendChild(shortDescriptionLabel);
      leftContainer.appendChild(shortDescription);
      leftContainer.appendChild(fullDescriptionLabel);
      leftContainer.appendChild(fullDescription);
      rightContainer.appendChild(imageURILabel);
      rightContainer.appendChild(imageURI);
      rightContainer.appendChild(submitInputModifyDiv);
      submitInputModifyDiv.appendChild(submitInput)
      let modifyInput = document.createElement("input");
      modifyInput.value = "Modify character";
      modifyInput.setAttribute('type', 'submit')
      container.appendChild(closeBtn);
      closeBtn.appendChild(closeBtnModifyDiv);

      // let closeBtn = document.createElement("button");
      // closeBtn.classList.add("close-btn");
      // closeBtn.innerHTML = "Close window";

      // container.appendChild(nameLabel);
      // container.appendChild(nameInput);
      // container.appendChild(shortDescriptionLabel);
      // container.appendChild(shortDescription);
      // container.appendChild(fullDescriptionLabel);
      // container.appendChild(fullDescription);
      // container.appendChild(imageURILabel);
      // container.appendChild(imageURI);
      // container.appendChild(modifyInput)
      // container.appendChild(closeBtn);
      // closeBtn.appendChild(closeBtnModifyDiv);

      body.appendChild(container);



      modifyInput.addEventListener('click', () => {

          
        let confirmBox = confirm("Are you willing to modify this item ?");

        console.log(confirmBox);
    
    
        if(confirmBox) {
          
          //modify character
          let idFromDataModifyCharacter = e.target.getAttribute("data-modification-id");
          modifyCharacter(idFromDataModifyCharacter);
    
          console.log(idFromDataModifyCharacter)
    
          }
    
          async function modifyCharacter(id) {
    
              let url = "https://character-database.becode.xyz/characters/" + id;

              let nameInputValue = nameInput.value;
              let shortDescriptionValue = shortDescription.value;
              let fullDescriptionValue = fullDescription.value
       
              // let modifiedCharacter = {
                    
              //       // image : result1,
              //     }
                  
              
              await fetch(url, {
                method: "PUT",
                headers: new Headers({
                  "Content-type": "application/json; charset=UTF-8"
                }),
                body: JSON.stringify({
                  name : nameInputValue,
                  shortDescription : shortDescriptionValue,
                  description: fullDescriptionValue
                })
              })

    
              //pas indispensable
              .then(response => response.json())
              .then(data => console.log(data))
              .catch(err => console.error(err));
    
              window.location.reload() 
            }
      });   


      body.addEventListener("click", function (e) {
        if (e.target.classList.contains("close-btn-create")) {
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

      console.log(indexFromDataDeleteCharacter)

      }

      async function deleteCharacter(id) {

          let url = "https://character-database.becode.xyz/characters/" + id;
          
          await fetch(url, {
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
      let newCharacterBtn = document.querySelector('.container-add')
      
      newCharacterBtn.addEventListener('click', () => {
        
        let body = document.querySelector("body");
        
        let container = document.createElement("div");
        container.classList.add("container");
        
        
        let leftContainer = document.createElement("div");
      leftContainer.classList.add("leftContainer");


      let nameLabel = document.createElement("label");
      nameLabel.innerHTML = "Name of your character";
      let nameInput = document.createElement("input");
      nameInput.classList.add("nameInput");

      let shortDescriptionLabel = document.createElement("label");
      shortDescriptionLabel.innerHTML = "Short description";
      let shortDescription = document.createElement("textarea");
      shortDescription.classList.add("shortDescription");
      

      let fullDescriptionLabel = document.createElement("label");
      fullDescriptionLabel.innerHTML = "Long description";
      let fullDescription = document.createElement("textarea");
      fullDescription.classList.add("fullDescription");
      
      let rightContainer = document.createElement("div");
      rightContainer.classList.add("rightContainer");

      let imageURILabel = document.createElement("label");
      // imageURILabel.innerHTML = "Image Link";
      imageURILabel.classList.add("imageURILabel");     
  
      let imageURI = document.createElement("input");
      imageURI.classList.add("imageURI");
      imageURI.setAttribute('type', 'file')

      let imageURIRedirect = document.createElement("img");
      imageURIRedirect.classList.add("imageURIRedirect");
      imageURIRedirect.setAttribute('src', 'assets/image/avatar.png')
 // we should probably parse it or do something so that it works

      let submitInputModifyDiv = document.createElement("div");
      submitInputModifyDiv.classList.add("submit-input-modify-div");

      let submitInput = document.createElement("input");
      submitInput.classList.add("submit-input-modify")
      submitInput.value = "Saves changes";
      submitInput.setAttribute('type', 'submit');

      let closeBtnModifyDiv = document.createElement("div");
      closeBtnModifyDiv.classList.add("close-btn-create-div");
      
      let closeBtn = document.createElement("button");
      closeBtn.classList.add("close-btn-create");
      closeBtn.innerHTML = "<img src='assets/image/cancel.png'>";

        container.appendChild(rightContainer);
        container.appendChild(leftContainer);
        leftContainer.appendChild(nameLabel);
        leftContainer.appendChild(nameInput);
        leftContainer.appendChild(shortDescriptionLabel);
        leftContainer.appendChild(shortDescription);
        leftContainer.appendChild(fullDescriptionLabel);
        leftContainer.appendChild(fullDescription);
        rightContainer.appendChild(imageURILabel);
        rightContainer.appendChild(imageURI);
        imageURILabel.appendChild(imageURIRedirect);
        rightContainer.appendChild(submitInputModifyDiv);
        submitInputModifyDiv.appendChild(submitInput)
        container.appendChild(closeBtn);
        closeBtn.appendChild(closeBtnModifyDiv);

        body.appendChild(container);
        
        //create character for real


        submitInputModifyDiv.addEventListener('click', () => {

          
          let nameInputValue = nameInput.value;
          let shortDescriptionValue = shortDescription.value;
          let fullDescriptionValue = fullDescription.value
          
          if(nameInputValue == false || shortDescriptionValue == false || fullDescriptionValue == false){
            alert('The form has to be completed to create a new character'); 
          } else {
            createCharacter();
          }
          
          async function createCharacter() {

            let newCharacter = {
              name : nameInputValue,
              shortDescription : shortDescriptionValue,
              description: fullDescriptionValue,
              // image : result1,
            }

            const newCharacterInApi = await fetch("https://character-database.becode.xyz/characters", {
              method: "POST",
              headers: new Headers({
                "Content-Type": "application/json"
              }),
              body: JSON.stringify(newCharacter),
            })
            
            window.location.reload();

            return newCharacterInApi;
          };
        });   
   
      
      
      //remove creation character page
      
      body.addEventListener("click", function (e) {
        if (e.target.classList.contains("close-btn-create")) {
          body.removeChild(container);
        }
      })    
  })
})();

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