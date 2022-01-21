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

    


        //Step 1 get reference to an entry point(s) (insertion point/ deletion point)
        let Maincontent = document.getElementsByTagName("main")[0];
        let DocumentBody = document.body;

        //Step 2 create an element(s) to insert
        let MainParagraph = document.createElement("p");
        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class=""mt-3">This is the article paragraph</p>`;

        //Step 3 configure new element
        MainParagraph.setAttribute("id", "Main Paragraph");
        MainParagraph.setAttribute("class", "mt-3");

        let FirstParagraphString = "This is";
        //Example of Template string
        let SecondParagraphString = `${FirstParagraphString} the Main Paragraph`;

        MainParagraph.textContent = SecondParagraphString;
        Article.setAttribute("class","container");

        //Step 4 add / insert new element
        Maincontent.appendChild(MainParagraph);
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);

        //Deletion example
        //document.getElementById("ArticleParagraph").remove();
        
        //Insert Before example
        let NewH1 = document.createElement("h1");
        NewH1.setAttribute("class","display-1");
        NewH1.textContent = "Hello, World!";
        Maincontent.before(NewH1);

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