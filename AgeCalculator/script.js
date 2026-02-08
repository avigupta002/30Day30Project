const btn = document.getElementById("btn");
const dateInput = document.getElementById("date");
const result = document.getElementById("result");

btn.addEventListener("click", calculateAge);

function calculateAge() {
    if (!dateInput) {
        alert("Date input not found. Check the input id.");
        return;
    }

    const dateValue = dateInput.value;

    if (dateValue === "") {
        alert("Please enter your date of birth");
        return;
    }

    const age = getAge(dateValue);
    result.innerHTML = `Your age is ${age} ${age === 1 ? "year" : "years"} old`;
}

function getAge(dateValue) {
    const today = new Date();
    const birthDate = new Date(dateValue);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}
