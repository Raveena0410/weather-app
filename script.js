const form=document.querySelector(".weather");
const city=document.querySelector(".city");
const card=document.querySelector(".card")
const apikey="00478a64c7121ec6bf20455b8b2f24b3"
form.addEventListener("submit",async  eve =>{
    eve.preventDefault();
    const cit=city.value;
    if(cit){
        try{
            const wt=await getWeatherData(cit);
            displayinfo(wt);


        }
        catch(error){
            console.error(error);
            displayererror(error);
        }

    }
    else{
        displayererror("please enter the city");
    }

});
async function getWeatherData(city){
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    const response = await fetch(apiurl);
    console.log(response); 
    if(!response.ok){
       
        throw new Error("could not fetch weather data");
    }
    return await response.json();
    

}
function displayinfo(data){
    const {name:city,main:{temp, humidity},weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";
    const citydisplay=document.createElement("h1");
    const tempe=document.createElement("h1");
    const hum=document.createElement("h1");
    const desc=document.createElement("h1");
    const emoji=document.createElement("h1");
    citydisplay.textContent=city;
    tempe.textContent=`${(temp).toFixed(1)}°C`;
    hum.textContent=`Humidity : ${humidity}%`;
    desc.textContent=description;
    emoji.textContent=getemoji(id);
    

    card.appendChild(citydisplay);
    citydisplay.classList.add("citydisplay");
    desc.classList.add("desc")
    tempe.classList.add("temp");
    emoji.classList.add("emoji");
    card.appendChild(tempe);
    card.appendChild(hum);
    card.appendChild(desc);
    card.appendChild(emoji);

    


}
function getemoji(emoji){
    switch(true){
        case(emoji >=200 && emoji<300):
             return "⚡";
        case(emoji >=300 && emoji<400):
             return "⛈️";
        case(emoji >=500 && emoji<600):
              return "🌧️";
        case(emoji >=600 && emoji<700):
              return "☃️";
        case(emoji >=700 && emoji<800):
              return "'🌫️";
        case(emoji==800):
              return "☀️";
        case(emoji >=801 && emoji<810):
        return"☁️";
        default:
            return"❓";
        

         
              
        

        
        
    }


}
function displayererror(message){
    const errordisplay=document.createElement("p");
    errordisplay.textContent=message;
    errordisplay.classList.add("errordisplay")
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordisplay);
    

}