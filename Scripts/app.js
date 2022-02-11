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

        // 1) Fattest memory footprint - we need the jquery library
        //J Query way - will do this for all buttons with AboutUsButton ID.
        // $("#AboutUsButton").on("click", function() {
        //     location.href = "about.html";
        // });

        // 2) Second Fattest memory footprint - we're getting stuff we don't need
        // JavaScript way - returns all elements with this id
        // document.querySelectorAll("#AboutUsButton").forEach(function(element) {
        //     //attach event listener to each element in the collection
        //     element.addEventListener("click", function() {
        //         location.href = "about.html";
        //     })
        // });



        //3) pretty lean - this is a query, 4 is a target
        document.querySelector("#AboutUsButton").addEventListener("click", function() {
            location.href = "about.html";

        })


        // 4)  leanest - Native JS - only returning a reference to the object required to add the "click" event.
        // document.getElementById("AboutUsButton").addEventListener("click", function(){
        //         location.href = "about.html";
        // });


        //Old way 
        //  let AboutUsButton = document.getElementById("AboutUsButton");
        // AboutUsButton.addEventListener("click",function()
        // {
        //     //redirects to about page 
        // });

    


        //Step 1 get reference to an entry point(s) (insertion point/ deletion point)
        //let Maincontent = document.getElementsByTagName("main")[0];
        //let DocumentBody = document.body;

        //Step 2 create an element(s) to insert
        //let MainParagraph = document.createElement("p");
        //let Article = document.createElement("article");
       // let ArticleParagraph = `<p id="ArticleParagraph" class=""mt-3">This is the article paragraph</p>`;

        //Step 3 configure new element
       // MainParagraph.setAttribute("id", "Main Paragraph");
       // MainParagraph.setAttribute("class", "mt-3");

        //let FirstParagraphString = "This is";
        //Example of Template string
       // let SecondParagraphString = `${FirstParagraphString} the Main Paragraph`;

       // MainParagraph.textContent = SecondParagraphString;
        //Article.setAttribute("class","container");

        //Step 4 add / insert new element
        //Maincontent.appendChild(MainParagraph);
        
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);
       // Article.innerHTML = ArticleParagraph;
        $("body").append(`<article class="container mt-3"><p id="ArticleParagraph" class=""mt-3">This is the Article Paragraph</p></article>`);

        //Deletion example
        //document.getElementById("ArticleParagraph").remove();
        
        //Insert Before example
        // let NewH1 = document.createElement("h1");
        // NewH1.setAttribute("class","display-1");
        // NewH1.textContent = "Hello, World!";
        // Maincontent.before(NewH1);



    }

    /**
     * Adds a contact object to localStorage
     *
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     */
    function AddContact(fullName,contactNumber,emailAddress) {
        let contact = new Core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()) {
            let key = contact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }

    /**
     * Will validate an input field given the input field id, regular expression and error message
     * @param {string} input_field_ID 
     * @param {RegExp} regular_expression 
     * @param {string} error_message 
     */
    function validateField(input_field_ID,regular_expression,error_message) 
    {
        let messageArea = $("#messageArea").hide();

        $("#"+input_field_ID).on("blur" , function() {
            let textContent = $(this).val(); 
            if(!regular_expression.test(textContent)) {
                $(this).trigger("focus").trigger("select"); 
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else 
            {
                messageArea.removeAttr("class").hide(); 
            }
        });
    }

    function ContactFormValidation() 
    {
        //validates full name
        validateField("fullName", /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,25})+(\s|,|-)([A-Z][a-z]{1,25})+(\s|,|-)*$/, "Please enter a valid Full Name. This must include at least a Capitalized first name followed by a Capitalized last name.");
        //validate contact number
        validateField("contactNumber",/^(\+\d{1,3}[\s-.]?)?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/,"Please enter a valid Contact Number. Example: (905) 555-5555");
        
        //validate email address
        validateField("emailAddress",/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,"Please enter a valid Email Address.");
    }



    function DisplayContactPage()
    {
        console.log("Contact Us Page");

        ContactFormValidation();
    
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
                AddContact(fullName.value,contactNumber.value,emailAddress.value);
            }
        });

    }


    function DisplayContactListPage() 
    {
        if(localStorage.length > 0) //check if local storage has something in it
        {
            let contactList = document.getElementById("contactList");
            let data = "";
            let keys = Object.keys(localStorage);

            let index = 1;

            for(const key of keys) 
            {
                let contactData = localStorage.getItem(key); // retrieve contact data from localstorage
                let contact = new core.Contact(); // create an empty Contact Object
                contact.deserialize(contactData);

                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                </tr>
                `;

                index ++;
            }
            contactList.innerHTML = data;

            $("#addButton").on("click", () =>
            {
                location.href = "edit.html#add";

            });

            $("button.delete").on("click", function() 
            {
                if(confirm("Are you sure?")) {
                localStorage.removeItem($(this).val());
                }
                location.href = "contact-list.html";
            });


            $("button.edit").on("click", function ()
            {
                location.href = "edit.html#" + $(this).val();
            });

        }
    }


    function DisplayEditPage() {

        let page = location.hash.substring(1);


        ContactFormValidation();

        switch(page)
        {
            case "add":
                {
                    $("main>h1").text("Add Contact");
                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);
                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();
                        //Add contact
                        AddContact(fullName.value,contactNumber.value,emailAddress.value);
                        //Refresh contact list page
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    });

                }
                break;
            default:
                {

                    // get the contact info from localStorage
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));
                    
                    //display the contact info in the edit form
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);


                    // when Edit is pressed - update the contact
                    $("#editButton").on("click", (event) => 
                    {
                        event.preventDefault();

                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();

                        //replace the item in localStorage
                        localStorage.setItem(page,contact.serialize());

                        //return to the contact list
                        location.href = "contact-list.html";

                    });
                    
                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    })

                }
                break;
        }


    }






    function DisplayLoginPage() 
    {
        console.log("Login page");
    }


    function DisplayRegisterPage() 
    {
        console.log("register page");
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
            case "Edit":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
                        
            
        }
    }
    
    window.addEventListener("load", Start);

})();