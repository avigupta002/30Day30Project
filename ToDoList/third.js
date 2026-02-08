//string

//const text = "ravi kumar";
//document.getElementById("str").innerHTML = text;
//const len = "ravi kumar";
/*document.getElementById("hp").innerHTML = text.length;

function myFunction() {
    // Get the text field
    var copyText = document.getElementById("myInput");
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0,1); // For mobile devices
  
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
    
    // Alert the copied text
    alert("Copied the text: " + copyText.value);
  }
*/

  //Template Literals

  /*let obj = {
    item: "pen",
    price: 10,
  }

  let output = `the cost of ${obj.item} is ${obj.price} rupees`;
  document.getElementById("tem").innerHTML = output;

  console.log("the cost of", obj.item, "is", obj.price, "rupees");


  let specialString = `my computer`;
  console.log(specialString);


  

  

  let str1 = "indian";
  let str2 = "computer.in \n\n";
  let str3 = " \nDiirected By Ravi kumar";

  let res = str1.concat(str2).concat(str3);
  document.getElementById("coc").innerHTML = res;

  let str = "ravi kumar";

  console.log(str.replace("ravi kumar" ,"sujeet kuamr"));

  let fullName = prompt("Enter your fullname without space");

  let username = "@" + fullName + fullName.length;
  
  document.getElementById("user").innerHTML = username;
 console.log(username.repeat(2));


//let marks = [45, 56, 78, 65, 78];
console.log(marks);
console.log(marks.length);


let heroes = ["hulk", "ironman", "shatiman", "ravi", "thor"];

for(let idx = 0; idx < heroes.length; idx++){
console.log(heroes[idx]);
}


//for of

for(let hero of heroes){
  console.log(hero);
}*/


//sum of subject of student
let name = "ravi kumar";
let std = ["hindi", "math", "sst", "english", "science"];
let marks = [55, 65, 75, 78, 65];
let sum = 0;
console.log(name);
console.log(std);
console.log(marks);
for(let val of marks){
  sum += val;
}
console.log(`Sum of the class = ${sum}`);
let avg = sum / marks.length;
console.log(`avg marks of the class = ${avg}`);

//10% offerr each item
let item = [250, 645, 300, 900, 501];
let i = 0;
for(let val of item){
 console.log(`value at index &{i} = ${val}`);
 let offer = val / 10;
      item[i] = item[i] - offer;
      console.log(`value after offer = ${item[i]}`);
      i++;
}

//array to string
const fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.toString());

//array push
//let foodItems = ["potato", "apple", "litchi", "tomato"]
//foodItems.push("chips", "burger", "onian");
//console.log(foodItems);

//pop
let foodItems = ["potato", "apple", "litchi", "tomato"];
console.log(foodItems);
       foodItems.pop();
console.log(foodItems);









































