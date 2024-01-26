let toggle_button = document.createElement("button");
document.getElementById("navid").appendChild(toggle_button);
toggle_button.innerHTML = "Toggle Dark Mode";
toggle_button.setAttribute("id", "toggle_button");
let toggle_status = 0;
const onbutton = () => {
  if (toggle_status == 0) {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "azure";
    toggle_button.innerHTML = "Toggle Light Mode";
    toggle_button.style.background = "#0c1818";
    toggle_button.style.color = "#c4c9ca";
    toggle_status = 1;
  } else {
    document.body.style.backgroundColor = "azure";
    document.body.style.color = "black";
    toggle_button.innerHTML = "Toggle Dark Mode";
    toggle_button.style.background = "#c4c9ca";
    toggle_button.style.color = "#0c1818";
    toggle_status = 0;
  } // change this code next time I write this. Use CSS class changes instead.
}
toggle_button.addEventListener("click", onbutton);
let petition_text="";
let count=0;

// this code is for the petition form
const name= document.getElementById('name'); 
const city= document.getElementById('hometown');
const email= document.getElementById('email');
const form= document.getElementById("sign-petition");
let person= form[0].value
//scale factor
let scaleFactor=1;
let modalImage= document.getElementById("modal-img");
scaleImage= ()=>{
  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }
  modalImage.style.transform= `scale(${scaleFactor})`;

}
//toggle modal function
toggleModal= (person)=> {
  let modal= document.getElementById("thanks-modal");
  let modalContent= document.getElementById("thanks-modal-content");
  modalContent.innerHTML= `<p>Thank you ${person.name} for signing our petition.</p>`;
  let intervalId= setInterval(scaleImage, 500);
  modal.style.display= "flex";
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId)
  }, 4000)

}
// add Signature form
const addSignature= (person) => {
  petition_text += " | <b>" + person.name + " from " + person.hometown + " supports this. <b> <br>";
    document.getElementById('signatures').innerHTML = petition_text;
  toggleModal(person);
  count++;
  document.getElementById('petcount').innerHTML = count;
  if (document.getElementById('petpara').style.display== "none"){
  document.getElementById('petpara').style.display= "block";
  }
}

// this code is for the form validation
const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;
  let petitionInputs = document.getElementById("sign-petition").elements;
let person = {
  name: petitionInputs[0].value,
  hometown: petitionInputs[1].value
}
    if (person.name.length < 2) {
      petitionInputs[0].classList.add('error');
      containsErrors = true;
    }
    else {
      petitionInputs[0].classList.remove('error');
    }
  if (person.hometown.length < 2) {
    petitionInputs[1].classList.add('error');
    containsErrors = true;
  }
  else {
    petitionInputs[1].classList.remove('error');
  }
   if (containsErrors==false){
      addSignature(person);
      for (let i = 0; i < petitionInputs.length-1; i++) {
        petitionInputs[i].value = "";
        containsErrors = false;
      }
  }
  }
 
form.addEventListener("submit", validateForm);
//revealable animation object

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

//revealable animation
let revealableContainers = document.querySelectorAll('.revealable');

//revealable function
const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

 //  console.log(`Container ${i} - Top: ${topOfRevealableContainer}, Window Height: ${windowHeight}`);

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
}
window.addEventListener('scroll', reveal);