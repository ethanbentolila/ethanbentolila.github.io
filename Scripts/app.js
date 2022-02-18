// IIFE -- Immediately Invoked Function Expression
// AKA Anonymous Self-Executing Function
(function()
{

    /**
     * This method uses AJAX to open a connection to the url and returns data to the callback function
     * @param {string} method 
     * @param {string} url 
     * @param {function} callback 
     */
    function AjaxRequest(method, url, callback)
    {
        //Step 1 - instantiate an XHR object
        let XHR = new XMLHttpRequest();

        //Step 2 - create an event listener / handler for readystatechange event
        XHR.addEventListener("readystatechange", () =>
        {
            if(XHR.readyState === 4 && XHR.status === 200) 
            {
                callback(XHR.responseText);
            }
        });

        //Step 3 - Open a connection to the server
        XHR.open(method, url);

        //Step 4 - send the request to the server
        XHR.send();
    }


    /**
     * This function loads the NavBar from the header file and injects it into the page
     * @param {string} data 
     */
    function LoadHeader(data) 
    {
        $("header").html(data); // data payload
        $(`li>a:contains('${document.title}')`).addClass("active"); //adds a class of 'active'
        CheckLogin();

    }


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


        document.querySelector("#AboutUsButton").addEventListener("click", function() {
            location.href = "about.html";

        })
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);
        $("body").append(`<article class="container mt-3"><p id="ArticleParagraph" class=""mt-3">This is the Article Paragraph</p></article>`);


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

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function() 
        {
            let success = false;

            //create an empty user object
            let newUser = new core.User();

            // use a jquery shortcut to load the users.json file 
            $.get("./Data/users.json",function(data) 
            {
                //for every user in the users.json file. loop
                for (const user of data.users) 
                {
                    //check if the username and password entered match with user
                    if(username.value == user.Username && password.value == user.Password) 
                    {
                        //get the user data from the file and assign it to our user
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                //if username and password matches - success... perform login sequence
                if(success) 
                {
                    //add user to session storage
                    sessionStorage.setItem("user", newUser.serialize());

                    //hide any error messages
                    messageArea.removeAttr("class").hide();

                    //redirect user to secure site
                    location.href = "contact-list.html";
                }
                else 
                {
                    //display an error message 
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Login Information").show();
                }

            });



            $("#cancelButton").on("click", function ()
            {
                //clears the login form
                document.forms[0].reset();
                
                //return to homepage
                location.href = "index.html";
            });
        });
    }

    function CheckLogin()
    {
        // if user is logged in
        if(sessionStorage.getItem("user"))
        {
            // swap out the login link for the logout link
            $("#login").html(
                `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
            );

            $("#logout").on("click", function()
            {
                // perform logout
                sessionStorage.clear();

                // redirect back to login
                location.href = "login.html";
            });
        }
    }


    function DisplayRegisterPage() 
    {
        console.log("register page");
    }

    //Named function
    function Start() 
    {
        console.log("App Started!!");

        AjaxRequest("GET", "header.html" , LoadHeader);
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