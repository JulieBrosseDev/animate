import {eventsCategories} from './components/images/images.js';
import { format } from 'date-fns';
import 'dayjs/locale/ca';
//USING THE EVENTS IMAGES :
// import the images.js file
// call an image as src=eventsCategories["name_of_the_image_you_want_to_use"]
// GETTING THE SMALLEST NUMBER / PRICE from a string containing all kinds of characters. We'll use it to return the smallest price of an event, that sets in the api price sentence.
 export const minPrice = (sentence) => {
    const array = sentence.split(" ")
    const numbersArray = []
    let result = ""
    for (let i = 0; i < array.length; i++) {
      if (!isNaN(Number(array[i])) === true) {
        numbersArray.push(Number(array[i]));
      }  
      if (numbersArray.length > 0) {
        result = "Des de " + Math.min(...numbersArray) + "€"
      } else {
        result = "Clic per més informació"
      };
    }
    return result 
  };



// GETTING THE IMAGE CORREPONDING TO THE API NAME OF CATHEGORY (in the render call the function that way : categoryAvatar(x.tags_categor_es))
export const categoryAvatar = (apiCategory) => {
  const array = apiCategory.split("/")
  // get the name of the category from the api
  const category = array[array.length - 1].replace(/-/g, "_")
  // Choosing the corresponding image in the images.js file. (don't forget to import the images file!!) !! Each name of image should take the exact same name as the api cathegory name to make them match !!
  const categoryImage = eventsCategories[category]
  return categoryImage
};

// GETTING AN IMAGE IN CASE OF UNDEFINED CATHEGORY
export const undefinedCategoryAvatar = () => {
  return eventsCategories["undefined_event"]
}

export const chooseCategoryImage = (category) => {
  category ? categoryAvatar() : undefinedCategoryAvatar()
}


// REPLACE THE ENCODINGS FROM THE text we recieve from API
  export const decodeHTMLEntities= (str)=> {
    if(str && typeof str === 'string') {
    // strip script/html tags
    str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
    str = str.replace(/&nbsp;/g, ' ');
    str = str.replace(/&amp;/g, ' ');
    str =str.replace(/nbsp/g, ' ');
    str = str.replace(/amp;/g, ' ');
  }
  return str;
}
  //GET TODAY DATE BY DEFAULT IN API FORMAT
  export const todayDate=()=>{
    var date = new Date(),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  //GET DATES FOR CALENDAR ARRAY DISPLAY
    export const getDateArray = (start, end) => {
    var arr = [];
    var dt = start;
    while (dt <= end) {
        arr.push(format(dt, 'dd-MM-yyyy'));
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
  }
  //CONVERT JAVASCRIPT DATE FORMAT TO API FORMAT
  export const convert=(e) =>{
    var date = new Date(e),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  
  //RELOAD THEY API DATA FILTEREF FOR THE ANIMATE BUTTON AND CALENDAR CLICK DAYS
   export const updateFilteredApi=(apiPased, city, category, dateEvent)=>{
    let dataFiltered=[];
    apiPased.map((event)=>{
      if(event.comarca_i_municipi === `${city}` &&  category === 'all' && event.dates.includes((dateEvent))){
       //insert in state al the data filtred
       dataFiltered.push(event)
       //if we pase all the filters city/category/date
     }else if(event.comarca_i_municipi === `${city}` && event.tags_categor_es === `agenda:categories/${category}`&& event.dates.includes((dateEvent))){ 
       //insert in state al the data filtred
        dataFiltered.push(event)
     }
     return dataFiltered
   })
   //in dataFiltered is returned duplicated and triplicated events so with this we select only once the events
   const finalDataFiltered = [...new Map(dataFiltered.map(event => [event.codi, event])).values()]
  
   return finalDataFiltered
  } 


  //TO SHOW THE NUMBER OF EVENT RESULTS WHEN SELECT FILTERS
  export const showEventsCounter=(data)=>{
    return data.length
  } 
// upercase for the city name and replacing some letters
  export function makeItBeautiful(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' ').replace(" L ", " l'").replace("L ", "").replace(" A ", " a ").replace(" D ", " ")
  }
//array of categories
  export const eventsssCategories= [
      {value:"all", name:"Tots els esdeveniments"},
      {value:"festivals_i_mostres", name:"Festivals i mostres"},
      {value:"concerts", name:"Concerts"},
      {value:"expositions", name:"Expositions"},
      {value:"sardanes", name:"Sardanes"},
      {value:"festes", name:"Festes"},
      {value:"teatre", name:"Teatre"},
      {value:"rutes-i-visites", name:"Rutes i visites"},
      {value:"fires-i-mercats", name:"Fires i mercats"},
      {value:"carnavals", name:"Carnavals"},
      {value:"setmana-santa", name:"Setmana santa"},
      {value:"cicles", name:"Cicles"} ,
      {value:"conferencies", name:"Conferencies"}, 
      {value:"cursos", name:"Cursos"} ,
      {value:"dansa", name:"Dansa"} ,
      {value:"infantil", name:"Infantil"} ,
   
]

//DISPLAY API DATE FORMAT IN A MORE FRIENDLY ONE : ex: Thu 10 Mar
export const changeDateFormat = (date) => {
  let format= date.split("-").reverse().join("-")
  format = new Date(format).toString().slice(0, 10)
  let newArr = format.split(" ")
  newArr = [newArr[0], newArr[2], newArr[1]]
  return newArr.join(" ")
}


// this function sort the cities alphabeticaly
export function citySort(property) {
  var sortOrder = 1;

  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }


  return function (a,b) {
      if(sortOrder === -1){
          return b[property].localeCompare(a[property]);
      }else{
          return a[property].localeCompare(b[property]);
      }        
  }
}
//GET DATES FOR CALENDAR ARRAY DISPLAY
export const getDateLongEvent = (data_inici, data_fi) => {
  const start= new Date(data_inici.slice(0,10))
  const end= new Date(data_fi.slice(0,10))
 
   var EventDays = [];

  var dt = start;
  while (dt <= end) {
      EventDays.push(format(dt, 'yyyy-MM-dd'));
      dt.setDate(dt.getDate() + 1);
  }
  return EventDays ; 
}
/**
 * Function that given 2 params, will return an array of objects without any key value duplicate. If any, it will keep the 1st result.
 * @param {Array} myCities - Array of cities, each city is an object with different properties.
 * @param {string} property - The property used to check for duplicates.
 */
export const deleteDuplicatedCities = (myCities, property) => {
  let helperArray = []; // empty array that will store each city at the start
  let result = []; // the returning array with the proper result

  myCities.forEach(city => { // I use a for each to check each city (not a map since I don't need a return)
    if (!helperArray.includes(city[property])) { // if the helper array doesn't include the property value we want...
      result.push(city); // we push that item in the result array
      helperArray.push(city[property]); // and we also push that property in the array
    }
    // the for each loop will keep looping and adding property values to the helper array and the city item to the result. At the moment that it finds a property we already have, it will skip the if statement, so it won't be pushed
  })
  return result;
}