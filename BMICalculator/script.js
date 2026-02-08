const btn = document.getElementById("btn");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const bmiValue = document.getElementById("bmiValue");
const bmiResult = document.getElementById("bmiResult");

btn.addEventListener("click", calculateBMI);

function calculateBMI() {
    const height = heightInput.value;
    const weight = weightInput.value;

    if (height === "" || weight === "") {
        alert("Please enter height and weight");
        return;
    }

    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
bmiValue.textContent = `Your BMI: ${bmi}`;
bmiResult.className = "";

if (bmi < 18.5) {
    bmiResult.textContent = "Body Condition: Underweight";
    bmiResult.classList.add("underweight");
} else if (bmi < 25) {
    bmiResult.textContent = "Body Condition: Normal";
    bmiResult.classList.add("normal");
} else if (bmi < 30) {
    bmiResult.textContent = "Body Condition: Overweight";
    bmiResult.classList.add("overweight");
} else {
    bmiResult.textContent = "Body Condition: Obese";
    bmiResult.classList.add("obese");
}
}
