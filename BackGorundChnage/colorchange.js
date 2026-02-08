
// var i = 0;

// function colorchnage(){
//     var color = ["reed", "green", "blue", "yellow", "pink", "purple"];

//     if (i < color.length) {
//         document.body.style.backgroundColor = color[i];
//         i++;
//     } else {
//         i = 0;
//     }
//     var color = colors[i];
//     document.body.style.backgroundColor = color;
//     console.log(i);
//     return i;
// }
// var i = 0;

//     function colorchange() {
//         var color = ["red", "green", "blue", "yellow", "pink", "purple", "orange", "black", "white", "brown", "grey", "violet",         "indigo", "cyan", "magenta", "maroon", "olive", "navy", "teal", "silver"];

//         if (i < color.length) {
//             document.body.style.backgroundColor = color[i];
//             i++;
//         } else {
//             i = 0;
//         }

//         var color = colors[i];
//         document.body.style.backgroundColor = color;
//         console.log(i);
//          return i;
//     }

setInterval(() => {
    let r0 = Math.floor(Math.random() * 256);
    let g0 = Math.floor(Math.random() * 256);
    let b0 = Math.floor(Math.random() * 256);
    let rI = Math.floor(Math.random() * 256);
    let gI = Math.floor(Math.random() * 256);
    let bI = Math.floor(Math.random() * 256);

    let color = `linear-gradient(rgb(${r0}, ${g0}, ${b0}), rgb(${rI}, ${gI}, ${bI}))`;

    document.body.style.background = color;
}, 1000);

