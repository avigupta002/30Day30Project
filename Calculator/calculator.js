
function button(value) {
    document.getElementById('result').value += value;
}

function clr() {
    document.getElementById('result').value = '';
}

function calc() {
    const result = eval(document.getElementById("result").value);
    document.getElementById("result").value = result;

}

function calculatePercentage() {
    const value = parseFloat(document.getElementById("result").value);
    if (!isNaN(value)) {
        document.getElementById("result").value = value / 100;
    }

}

function removelast() {
    const result = document.getElementById("result");
    result.value = result.value.slice(0, -1);
}
