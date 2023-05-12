let slidePosition = 0;

const slides = document.querySelectorAll('.carousel_item');


const slidesArray = Array.from(slides);


const totalSlides = slidesArray.length;

function updateSlidePosition() {
  slidesArray.forEach(slide => {
    slide.classList.remove('visible');
    slide.classList.add('hidden');
  });
  console.log(slidePosition);
  slides[slidePosition].classList.add('visible');
 
}

function moveToNextSlide() {
 
  if(slidePosition === totalSlides - 1){
    slidePosition = 0;
  } else {
    slidePosition += 1;

  }

  updateSlidePosition(); 
}
function moveToPrevSlide() {
  
  if(slidePosition === 0){
    slidePosition = totalSlides - 1;
  } else {
    slidePosition -= 1;

  }
  
  updateSlidePosition();
}


document.querySelector('.next') // Get the appropriate element (<button class="next">)
  .addEventListener('click', () => { // set an event listener on it - when it's clicked, do this callback function
    console.log('clicked next'); // let's tell the client console we made it to this point in the script
    moveToNextSlide(); // call the function above to handle this
  });


document.querySelector('.prev') // Get the appropriate element (<button class="next">)
  .addEventListener('click', () => { // set an event listener on it - when it's clicked, do this callback function
    console.log('clicked prev'); // let's tell the client console we made it to this point in the script
    moveToPrevSlide(); // call the function above to handle this
  });
// Paying close attention to the above queryselector, write one that fires
// when you want a "prev" slide

function injectHTML(list) {
    console.log('fired injectHTML');
    const target = document.querySelector('#law_list');
    target.innerHTML = '';
    const stateSet = new Set(); // Create a Set to keep track of which states have already been added
    list
      .sort((a, b) => a.state.localeCompare(b.state, undefined, { sensitivity: 'base' })) // Use localeCompare for sorting
      .forEach((item, index) => {
        if (!stateSet.has(item.state)) { // Check if the state has already been added
          stateSet.add(item.state); // Add the state to the Set
          let details = item.details_of_consent_policy;
          if (details.trim() === '') {
            details = 'No information available. For more information about this state, go to https://www.healthit.gov/data/apps/state-health-it-privacy-and-consent-laws-and-policies';
          }
          const str = `<li>${item.state} : ${details}</li>`;
          target.innerHTML += str;
        }
      });
  }

  
  
  /* A quick filter that will return something based on a matching input */
  function filterList(list, query) {
    return list.filter((item) => {
      const lowerCaseName = item.state.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery);
    });
    
  }
  
  function cutRestaurantList(list) {
    console.log('fired cut list');
    return list.slice(0, 53);
    
  }
  
  async function mainEvent() { // the async keyword means we can make API requests
    const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
    const filterButton = document.querySelector('#filter');
    const loadDataButton = document.querySelector('#data_load');
    const generateListButton = document.querySelector('#generate');
    const textField = document.querySelector('#resto');
  
    const loadAnimation = document.querySelector('#data_load_animation');
    loadAnimation.style.display = 'none'
    generateListButton.classList.add('hidden');

    let storedList = [];
  
  
    let currentList = []; // this is "scoped" to the main event function
    
    /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
    loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something  
  
      
      console.log('Loading Data'); 
      loadAnimation.style.display = 'inline-block';
  
     
      const results = await fetch('https://www.healthit.gov/data/open-api?source=state-health-it-privacy-consent-law-policies.csv');
      
  
      
      storedList = await results.json();
      if (storedList.length > 0) {
        generateListButton.classList.remove("hidden");
    }
    
    
    loadAnimation.style.display = 'none';
    console.table(storedList);

  
  });
  
    filterButton.addEventListener("click", (event) => {
      console.log("clicked filterButton");
  
      const formData = new FormData(mainForm);
      const formProps = Object.fromEntries(formData);
  
      console.log(formProps);
      const newList = filterList(currentList, formProps.resto);
      
      console.log(newList);
      injectHTML(newList);
    });
  
    generateListButton.addEventListener('click', (event)=> { 
      console.log('generate new list');
      const restaurantsList = cutRestaurantList(storedList);
      console.log(restaurantsList);
      injectHTML(restaurantsList);
    });

    textField.addEventListener('input', (event)=> { 
        console.log('input', event.target.value);
        const newList = filterList(storedList, event.target.value);
        console.log(newList);
        injectHTML(newList);
    });
    
  }
    
    
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
