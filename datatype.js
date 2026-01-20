// number,string,Boolean,undefined,null,object,array

let n = 15.2;
let name = "Hello Students!";
// Boolean -> true / false 
let isFollow = true;

let temp; // undefine

let text = null; // null datatye

console.log(n,typeof(n));
console.log(name,typeof(name));
console.log(isFollow,typeof(isFollow));
console.log(temp,typeof(temp));
console.log(text,typeof(text));

// this is object 
let Students = {
    "name" : "Rohan",
    "age" : 22,
    "education" : "B.Tech"
}

console.log(typeof(Students));
// console.log(Students.name);

// this is array
let arr = [1,2,3,4,5,6];

console.log(arr,typeof(arr));