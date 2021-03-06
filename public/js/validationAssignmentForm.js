function validateForm() {
    console.log('hello world')
    const caseInput = document.getElementById('case_id');
    const detectiveInput = document.getElementById('detective_id');
    const dateFromInput = document.getElementById('dateFrom');
    const dateToInput = document.getElementById('dateTo');

    const errorCase = document.getElementById('errorCase');
    const errorDetective = document.getElementById('errorDetective');
    const errorDateFrom = document.getElementById('errorDateFrom');
    const errorDateTo = document.getElementById('errorDateTo');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([caseInput, detectiveInput, dateFromInput, dateToInput], [errorCase, errorDetective, errorDateFrom, errorDateTo], errorsSummary);

    let valid = true;
    // c
    if (!checkRequired(caseInput.value)) {
        valid = false;
        caseInput.classList.add("error-input");
        errorCase.innerText = "Pole jest wymagane";
    }


    //detektyw
    if (!checkRequired(detectiveInput.value))
    {
        valid = false;
        detectiveInput.classList.add("error-input");
        errorDetective.innerText = "Pole jest wymagane";
    }

    //Data rozpoczęcia pracy    
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Pole jest wymagane";
    } else if (!checkDate(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(dateFromInput.value, nowString)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Data nie może być z przyszłości";
    }

    if (!checkDate(dateToInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        dateToInput.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(dateFromInput.value, dateToInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = "Data musi byc po rozpoczeciu";
    }


    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}