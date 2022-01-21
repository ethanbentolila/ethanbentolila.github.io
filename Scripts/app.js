// IIFE -- Immediately Invoked Function Expression
// AKA Anonymous Self-Executing Function
(function()
{

    function DisplayHomePage()
    {
        let AboutUsButton = document.getElementById("AboutUsButton");

        AboutUsButton.addEventListener("click",function()
        {
            //redirects to about page 
            location.href = "about.html";
        });
    }

    //Named function
    function Start() 
    {
        console.log("App Started!!");

        switch(document.title) 
        {
            case "Home":
                DisplayHomePage();
                break;
        }
    }
    
    window.addEventListener("load", Start);

})();