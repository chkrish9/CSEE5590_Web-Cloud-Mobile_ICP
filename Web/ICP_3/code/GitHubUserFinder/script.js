/*
* This method will make a get call to the Github API and the call appropriate methods.
* If user found the we are calling showUser method and passing the response.
* else calling noSuchUser method.
*/
function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it. The function should finally return the object(it now contains the response!)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(resp) {
        //if the response is successful show the user's details
        if(this.readyState == 4 ) {
            if (this.status == 200) {
                showUser(JSON.parse(this.responseText));
                //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    };
    xhttp.open("GET", "https://api.github.com/users/"+user, true);
    xhttp.send();
    return xhttp.responseText;
}

/*
* This method will display the Name, image , Github profile and repository links
*/
function showUser(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    $("#profile").find("h2").text(user.name);
    $(".avatar").prepend('<img src="'+user.avatar_url+'" width="100px" height="100px"/>')
    $(".information").prepend('<a href="'+user.html_url+'">Github Url</a></br><a href="'+user.repos_url+'">Repo Url</a>');
}

/*
* This method will call when user not found. It will display message No such profile username.
*/
function noSuchUser(username) {
    $("#profile").find("h2").text("No such profile" + username);
}

/*
* This method will call when the document is ready.
*/
$(document).ready(function(){
    /*
    * This method will call when user type in the input.
    * First we are clearing the display content then if user press enter, it will go to if statement.
    * In If statement we are taking value from input and then storing in username then we are passing username to getGithubInfo(username) method.
    */
    $(document).on('keypress', '#username', function(e){
        //check if the enter(i.e return) key is pressed
        $("#profile").find("h2").text("");
        $(".avatar").html('')
        $(".information").html('');
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            getGithubInfo(username);
        }
    })
});
