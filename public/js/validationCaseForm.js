function validateForm() {

    const caseInput = document.getElementById('caseName');
    const statusInput = document.getElementById('caseStatus');

    const errorCase = document.getElementById('errorCase');
    const errorStatus = document.getElementById('errorStatus');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([caseInput, statusInput], [errorCase, errorStatus], errorsSummary);

    let valid = true;
    // c
    if (!checkRequired(caseInput.value)) {
        valid = false;
        caseInput.classList.add("error-input");
        errorCase.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(caseInput.value, 1, 120)) {
        valid = false;
        caseInput.classList.add("error-input");
        errorCase.innerText = "Pole powinno zawierać max 120 znaków";
    }



    if (!checkRequired(statusInput.value)) {
        valid = false;
        statusInput.classList.add("error-input");
        errorStatus.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(statusInput.value, 1, 1)) {
        valid = false;
        statusInput.classList.add("error-input");
        errorStatus.innerText = "Pole powinno zawierać 1 znak";
    }


    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}