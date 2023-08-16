const inputValue=document.getElementById("input")
const container=document.getElementById("main-container")
let value;
const error= document.getElementById("error")
const modal=document.getElementById("small-modal")
const mainModal=document.getElementById("myModal")
function search()
{
    if(inputValue.value==='')
    {
        alert("Type the ingredient for which recipe you need!!")
    }
    else
    {
         value=inputValue.value;
         const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
         (async () => {
            try {
              const fetchedData = await fetch(url);
            const data=await fetchedData.json()
            console.log(data)
            if(data.meals==null)
            {
                error.innerHTML=`An error occured while fetching data from api!!`
            }
            else
            
            {
                error.innerHTML=''
                data.meals.map((element)=>{
                    console.log("element",element)
                                ///Creating element and adding to DOM////
                    const div=document.createElement("div")
                    const img=document.createElement("img")
                    const card=document.createElement("div")
                    const h5=document.createElement("h5")
                    const button=document.createElement("button")
                    button.innerHTML="View Recipe"
                            ////// Appending DOM elements to each other//////
                    img.src=`${element.strMealThumb}`
                    div.appendChild(img)
                    h5.innerHTML=`${element.strMeal}`
                    card.appendChild(h5)
                    div.appendChild(card)
                    card.classList.add("container-card")
                    container.appendChild(div)
                    div.classList.add("card")
                    card.appendChild(button)
    
                    /////Removing element when another element is searched//////
                    inputValue.addEventListener('change',()=>{
                        div.remove()
                        error.innerHTML=''
                    })
                    button.addEventListener('click',()=>{
                      mainModal.style.display="block"
                        ///Creating document 

                       const head=document.createElement("div")
                       modal.appendChild(head)
                       const name=document.createElement("h5")
                       const span=document.createElement("span")
                       //adding class to document
                       head.classList.add("head")
                       name.classList.add("dish")
                       span.classList.add("close")
                       //adding data;
                       name.innerHTML=`${element.strMeal}`
                       span.innerHTML=`&times;`
                       head.appendChild(name)
                       head.appendChild(span)

                       const ins=document.createElement("div")
                       ins.classList.add("instructions")
                       modal.appendChild(ins)
                       const p=document.createElement("p")
                       p.innerHTML=`${element.strInstructions}`
                       ins.appendChild(p)
                       const btn=document.createElement("button")
                       btn.innerHTML="Video Link for complete recipe"
                       btn.classList.add("btn-link")
                       ins.appendChild(btn)   
                       
                       btn.addEventListener('click',()=>{
                        window.location.href=(`${element.strYoutube}`)
                       })
                       span.addEventListener("click",()=>{
                        mainModal.style.display="none";
                        ins.remove()
                        head.remove()
                       })
                    })
                })
            }     
            } catch (err) {
              error.innerHTML=err
              setTimeout(()=>{
                error.innerHTML=''
              },5000)
            }
      
          })(); 
    }
    
}