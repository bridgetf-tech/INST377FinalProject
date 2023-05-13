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
  
  function cutLawList(list) {
    console.log('fired cut list');
    return list.slice(0, 53);
    
  }

 


  const map = L.map('map').setView([37.8, -96], 4);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



  const states = [
    { name: 'Alabama', coords: [32.8, -86.8] },
    { name: 'Alaska', coords: [64.2, -149.5] },
    { name: 'Arizona', coords: [34.2, -111.7] },
    { name: 'Arkansas', coords: [34.9, -92.4] },
    { name: 'California', coords: [37.2, -119.4] },
    { name: 'Colorado', coords: [39.0, -105.5] },
    { name: 'Connecticut', coords: [41.6, -72.7] },
    { name: 'Delaware', coords: [39.0, -75.5] },
    { name: 'District of Columbia', coords: [38.9, -77.0] },
    { name: 'Florida', coords: [27.8, -81.6] },
    { name: 'Georgia', coords: [32.7, -83.2] },
    { name: 'Hawaii', coords: [20.7, -157.5] },
    { name: 'Idaho', coords: [44.2, -114.5] },
    { name: 'Illinois', coords: [40.0, -89.0] },
    { name: 'Indiana', coords: [39.8, -86.2] },
    { name: 'Iowa', coords: [42.0, -93.0] },
    { name: 'Kansas', coords: [38.5, -98.0] },
    { name: 'Kentucky', coords: [37.5, -85.3] },
    { name: 'Louisiana', coords: [31.0, -92.0] },
    { name: 'Maine', coords: [45.2, -69.0] },
    { name: 'Maryland', coords: [39.0, -76.7] },
    { name: 'Massachusetts', coords: [42.2, -71.5] },
    { name: 'Michigan', coords: [44.2, -84.5] },
    { name: 'Minnesota', coords: [46.0, -94.0] },
    { name: 'Mississippi', coords: [33.0, -90.0] },
    { name: 'Missouri', coords: [38.5, -92.5] },
    { name: 'Montana', coords: [47.0, -110.0] },
    { name: 'Nebraska', coords: [41.5, -100.0] },
    { name: 'Nevada', coords: [39.0, -117.0] },
    { name: 'New Hampshire', coords: [44.0, -71.5] },
    { name: 'New Jersey', coords: [40.1, -74.5] },
    { name: 'New Mexico', coords: [34.0, -106.0] },
    { name: 'New York', coords: [43.0, -75.0] },
    { name: 'North Carolina', coords: [35.5, -79.0] },
    { name: 'North Dakota', coords: [47.5, -100.5] },
    { name: 'Ohio', coords: [40.0, -82.5] },
    { name: 'Oregon', coords: [44.0, -120.5] },
    { name: 'Pennsylvania', coords: [41.2, -77.5] },
    { name: 'Rhode Island', coords: [41.7, -71.5] },
    { name: 'South Carolina', coords: [33.8, -80.5] },
    { name: 'South Dakota', coords: [44.3, -100.4] },
    { name: 'Texas', coords: [31.0, -100.0] },
    { name: 'Utah', coords: [39.3, -111.7] },
    { name: 'Vermont', coords: [44.0, -72.7] },
    { name: 'Virginia', coords: [37.5, -78.0] },
    { name: 'Washington', coords: [47.4, -121.5] },
    { name: 'West Virginia', coords: [38.5, -80.5] },
    { name: 'Wisconsin', coords: [44.5, -89.5] },
    { name: 'Wyoming', coords: [43.0, -107.5] }
  ];

  for (const state of states) {
    const marker = L.marker(state.coords).addTo(map);
    marker.bindPopup(`<b>${state.name}`);
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

    // Load the data from localStorage on page load
    
  
  
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
      const statesList = cutLawList(storedList);
      console.log(statesList);
      injectHTML(statesList);
    });

    textField.addEventListener('input', (event)=> { 
        console.log('input', event.target.value);
        const newList = filterList(storedList, event.target.value);
        console.log(newList);
        injectHTML(newList);
    });

 
    
  }
    
    
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
