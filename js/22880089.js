
const API = 'https://web1-api.vercel.app/api';
const AUTHENTICATE_API = 'https://web1-api.vercel.app/users';
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
    let response = await fetch(`${AUTHENTICATE_API}/authenticate`, {
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

async function login(e){
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    document.getElementById('errorMessage').innerText = '';

    try{
        let token = await getAuthenticateToken(username, password);
        if(token){
            localStorage.setItem('token', token);
            document.getElementsByClassName('btn-close')[0].click();
            displayControl();
        }
    } catch (error){
        document.getElementById('errorMessage').innerText = error;
        displayControl(false);
    }
}
function displayControl(isLogin = true){
    let linkLogin = document.getElementsByClassName('linkLogin');
    let linkLogout = document.getElementsByClassName('linkLogout');
    let displayLogin = 'none';
    let displayLogout = 'block';
    if(!isLogin){
        displayLogin = 'block';
        displayLogout = 'none';
    }
    for(let i = 0; i < 2; i++){
        linkLogin[i].style.display = displayLogin;
        linkLogout[i].style.display = displayLogout;
    }

    let leaveComment = document.getElementById('leave-comment');
    if(leaveComment){
        leaveComment.style.display = displayLogout;
    }
}

async function checkLogin(){
    let isLogin = await verifyToken();
    displayControl(isLogin);
}

async function verifyToken(){
    let token = localStorage.getItem('token');
    if(token){
        let response = await fetch(`${AUTHENTICATE_API}/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer` + token
            }

        });
        if(response.status === 200){
            return true;
        }
    }
    return false;
}

function logout(){
    localStorage.clear();
    displayControl(false);
}