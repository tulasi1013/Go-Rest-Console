let formEl = document.getElementById("consoleForm");
let requesturl = document.getElementById("requestUrl");
let responsestatus = document.getElementById("responseStatus");
let requestmethod = document.getElementById("requestMethod");
let requestbody = document.getElementById("requestBody");
let responsebody = document.getElementById("responseBody");
let requesterr = document.getElementById("requestUrlErrMsg");
let formData = {
    urll: "https://gorest.co.in/public-api/users",
    methodd: requestmethod.value,
    bodyy: ""
}
requesturl.addEventListener("change", function(event) {
    formData.urll = event.target.value;
});
requestmethod.addEventListener("change", function(event) {
    formData.methodd = event.target.value;
});
requestbody.addEventListener("change", function() {
    formData.bodyy = event.target.value;
});

function validateRequest(formData) {
    let {
        urll
    } = formData;
    if (urll === "") {
        requesterr.textContent = "Required*";
        return;
    }
}

function sendRequest(formData) {
    let {
        urll,
        methodd,
        bodyy
    } = formData;
    let options = {
        method: methodd,
        headers: { //creating headers object
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 00f3f8fde06120db02b587cc372c3d85510896e899b45774068bb750462acd9f",
        },
        body: bodyy
    };
    fetch(urll, options)
        .then(function(response) {
            return response.json(); //returning the response in json() format
        })
        .then(function(jsonData) {
            let responseStatus = jsonData.code; //accessing the "code" key from the response(jsonData)
            let responseBody = JSON.stringify(jsonData); //converting the response(jsonData) into the string object
            responsestatus.value = responseStatus; //displaying the code
            responsebody.value = responseBody; //displaying the responseBody
        });
}
formEl.addEventListener("submit", function(event) {
    event.preventDefault();
    validateRequest(formData);
    sendRequest(formData);
})