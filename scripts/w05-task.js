/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.querySelector("#temples");
let templeList = [];


/* async displayTemples Function */
const displayTemples = (temples) => {
    temples.forEach((temple) => {
      
      const articleElement = document.createElement("article");
  
    
      const h3Element = document.createElement("h3");
      h3Element.textContent = temple.templeName;
  
      
      const imgElement = document.createElement("img");
      imgElement.src = temple.imageUrl;
      imgElement.alt = temple.location;
  
     
      articleElement.appendChild(h3Element);
      articleElement.appendChild(imgElement);
  
      
      templesElement.appendChild(articleElement);
    });
  };

/* async getTemples Function using fetch()*/
const getTemples = async () => {
    try {
      const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const templeData = await response.json();
  
      if (!Array.isArray(templeData)) {
        throw new Error("Invalid temple data format. Expected an array.");
      }
  
      templeList.push(...templeData);
  
      displayTemples(templeList);
    } catch (error) {
      console.error("Error fetching temple data:", error);
    }
  };
  
  getTemples();
  

/* reset Function */
const reset = () => {
    templesElement.innerHTML = "";
  };


/* filterTemples Function */
const filterTemples = (temples) => {
    // Clear the displayed list before filtering
    reset();
  
    // Get the selected filter value
    const filter = document.querySelector("#filtered").value;
  
    switch (filter) {
      case "utah":
        const utahTemples = temples.filter((temple) => temple.location.includes("Utah"));
        displayTemples(utahTemples);
        break;
      case "notutah":
        const nonUtahTemples = temples.filter((temple) => !temple.location.includes("Utah"));
        displayTemples(nonUtahTemples);
        break;
      case "older":
        const olderTemples = temples.filter((temple) => {
          const dedicatedDate = new Date(temple.dedicated);
          return dedicatedDate < new Date(1950, 0, 1);
        });
        displayTemples(olderTemples);
        break;
      case "all":
        displayTemples(temples); 
        break;
      default:
        console.warn(`Invalid filter selection: ${filter}`);
    }
  };
  


getTemples();

/* Event Listener */
const filteredElement = document.querySelector("#filtered");

filteredElement.addEventListener("change", () => {
  filterTemples(templeList); 
});

