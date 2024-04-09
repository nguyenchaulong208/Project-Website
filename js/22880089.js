
const API = 'https://web1-api.vercel.app/api';
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