// IIFE -- Immediately Invoked Function Expression
// AKA Anonymous Self-Executing Function
(function()
{

    function DisplayAboutPage()
    {       
         console.log("About Page");
    }

    function DisplayProductsPage()
    {       
         console.log("Products Page");
    }

    function DisplayServicesPage()
    {        
        console.log("Services Page");
    }


    function DisplayHomePage()
    {

        console.log("Home Page");

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
        // let NewH1 = document.createElement("h1");
        // NewH1.setAttribute("class","display-1");
        // NewH1.textContent = "Hello, World!";
        // Maincontent.before(NewH1);



    }

    function DisplayContactPage()
    {
        console.log("Contact Us Page");

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");
        
        // localStorage.setItem("1", "Tom");
        // console.log(localStorage.getItem("1"));
        // localStorage.removeItem("1");
        // console.log(localStorage.length);



        sendButton.addEventListener("click", function(event) 
        {
            if(subscribeCheckbox.checked) 
            {
                let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
                if(contact.serialize()) {
                    let key = contact.FullName.substring(0,1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });

    }


    function DisplayContactListPage() 
    {
        console.log("Contact-List Page");

        if(localStorage.length > 0) //check if local storage has something in it
        {
            let contactList = document.getElementById("contactList");
            let data = "";
            let keys = Object.keys(localStorage);

            let index = 1;

            for(const key of keys) 
            {
                let contactData = localStorage.getItem(key); // retrieve contact data from localstorage
                let contact = new Contact(); // create an empty Contact Object
                contact.deserialize(contactData);

                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td></td>
                <td></td>
                </tr>
                `;
                index ++;
            }
            contactList.innerHTML = data;
        }



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
            case "Contact us":
                DisplayContactPage();
                break;
            case "Contact-List":
                DisplayContactListPage();
                break;
            case "About us":
                DisplayAboutPage();
                break;
            case "Our Products":
                DisplayProductsPage();
                break;
            case "Our Services":
                DisplayServicesPage();
                break;
        }
    }
    
    window.addEventListener("load", Start);

})();