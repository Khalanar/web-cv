function userInformationHTML(user){
    return `
        <div id="github-content" class="row">
            <div class="col-12 col-sm-4 center no-gutters align-items-center">
                <img id="" src="${user.avatar_url}" />
            </div>
            
            <div class="col-12 col-sm-8 no-gutters">
                <h2>${user.name}</h2>
                <span><a href="${user.html_url}" target="_blank">@${user.login}</a></span>
                <div><a href="https://github.com/${user.login}?tab=repositories" target="_blank">${user.public_repos} repositories</a></div>
            </div>
        </div>
    `
}


function repoInformationHTML(repos){
    if(repos.length == 0){
        return `No repos`
    }
    
    var listItemsHTML = repos.map(function(repo){
        return`
            <li><a href="${repo.html_url}">${repo.name}</a></li>
        `
    })
    
    return `
        <div id="github-content-body" class="row">
            <p>Repo List</p>
            <ul>${listItemsHTML.join("\n")}</ul>
        </div>
    
    `
}

function fetchGithubInformation(event){
    $("#github-user-data").html("")
    $("#github-repo-data").html("")
    
    var username = $("#github-username").val();
    if (!username){
        $("#github-user-data").html("No data found, please input a username")
        return
    }

    $("#github-user-data").html(
        `<div id="loader">
            <img src="assets/images/loader.gif" alt="loading image" />
         </div>
        `
        );
 
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
        ).then(
            function(userResponse, repoResponse){
                var userData = userResponse[0]
                var repoData = repoResponse[0]
                $("#github-user-data").html(userInformationHTML(userData))
                $("#github-repo-data").html(repoInformationHTML(repoData))
            }, function(errorResponse){
                if (errorResponse.status === 404){
                    $("#github-user-data").html(`User ${username} not found`)
                }else{
                    $("#github-user-data").html(`Error ${errorResponse.responseJSON.message}`)
                }
            })
}

$(document).ready(fetchGithubInformation)