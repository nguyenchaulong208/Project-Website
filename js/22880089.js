
const API = 'https://web1-api.vercel.app/api';
const AUTHENTICAT_API = 'https://web1-api.vercel.app/users';
// get list product
async function load_data(request, templateId, viewId){
    const response = await fetch(`${API}/${request}`);
    const getData = await response.json();
    var getElement = document.getElementById(templateId).innerHTML;
    var template = Handlebars.compile(getElement)
    var context = {data: getData};
    var view = document.getElementById(viewId);
    view.innerHTML = template(context);
}

async function getAuthenticateToken(username,password){
    let response = await fetch(`${AUTHENTICAT_API}/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({username, password})
    });
    let result = await response.json();
    if(response.status == 200){
       return result.token;
    }
    throw new Error(result.message);
}