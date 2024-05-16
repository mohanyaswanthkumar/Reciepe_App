function search() {
    var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    var name = document.getElementsByClassName("search-bar")[0].value;
    var res = document.querySelector(`.reciepe`);
    var resMsg = document.querySelector(`.msg`);
    // var mess=window.document.URL;
    // var dd=document.querySelector("#url");
    // dd.innerHTML=mess;
    // console.log(mess)
    if (name.length == 0) {
        resMsg.innerText = "Input Text Required..!";
        res.style.display = 'none';
                    resMsg.style.display = 'block'; 
                    document.querySelector(`.hide_reciepe`).style.display = 'none';
    } else {
        fetch(url + name)
            .then((response) => response.json())
            .then((data) => {
                var meal = data.meals ? data.meals[0] : null;
                if (meal) {
                    let ingredients = [];
                    resMsg.style.display = 'none';
                    let cnt = 1;
                    for (var i in meal) {
                        let ingred = "";
                        let measure = "";
                        if (i.startsWith("strIngredient")) {
                            ingred = meal["strIngredient" + cnt];
                            measure = meal["strMeasure" + cnt];
                            cnt += 1;
                            if (ingred.trim() !== "" && measure.trim() !== "") {
                                ingredients.push(`${ingred} <--> ${measure}`);
                            }
                        }
                    }
                    res.innerHTML = `<div class="hide_reciepe"> <div class="itemname">
                    <p><strong>Name:</strong> ${meal.strMeal}</p>
                    <p><strong>Tags:</strong> ${meal.strTags}</p>
                    <p><strong>Video Link:</strong> <a href="${meal.strYoutube}" target="_blank">Click here</a></p>
                </div>
                        <img src="${meal.strMealThumb}">
                        <div class="ingred"></div>
                        <button class="vr">View Recipe</button>
                        </div>
                        <div class="reciepe_tech" style="display: none;">
                        <button class="cr">Close Recipe</button>
                           <p>${meal.strInstructions} </p> 
                        </div>
                        `;
                        document.querySelector(`.hide_reciepe`).style.display = 'block';
                        res.style.display = 'initial';
                    let ingredDiv = document.querySelector(".ingred");
                    let parent = document.createElement("ul");
                    ingredients.forEach((i) => {
                        let child = document.createElement('li');
                        child.innerText = i;
                        // for learning purpose  child.setAttribute("style","color:green;")
                        // for learning purpose  child.setAttribute("style","display:none;")
                        parent.appendChild(child);
                    });
                    ingredDiv.appendChild(parent);

                    // Add event listener to the "View Recipe" button
                    document.querySelector('.vr').addEventListener('click', () => {
                        document.querySelector('.reciepe_tech').style.display = 'block';
                        document.querySelector(`.hide_reciepe`).style.display = 'none';
                    });

                    // Add event listener to the "Close Recipe" button
                    document.querySelector('.cr').addEventListener('click', () => {
                        document.querySelector('.reciepe_tech').style.display = 'none';
                        document.querySelector(`.hide_reciepe`).style.display = 'block';
                    });
                } else {
                    resMsg.innerText = "No meal found.";
                    res.style.display = 'none';
                    resMsg.style.display = 'block'; 
                    document.querySelector(`.hide_reciepe`).style.display = 'none';
                }
            })
            .catch((error) => {
                console.error('Error fetching meal data:', error);
                resMsg.innerText = "Invalid Input";
                resMsg.style.display = 'block'; 
            });
    }
}
