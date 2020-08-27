# Intro to Javascript

### Quick summary

JavaScript ("JS" for short) is a full-fledged dynamic programming language that can add interactivity to a website. It was invented by Brendan Eich (co-founder of the Mozilla project), the Mozilla Foundation, and the Mozilla Corporation.

JavaScript is versatile and beginner-friendly. With more experience, you'll be able to create games, animated 2D and 3D graphics, comprehensive database-driven apps, and much more!

JavaScript itself is relatively compact, yet very flexible. Developers have written a variety of tools on top of the core JavaScript language, unlocking a vast amount of functionality with minimum effort. These include:

Browser Application Programming Interfaces (APIs) built into web browsers, providing functionality such as dynamically creating HTML and setting CSS styles; collecting and manipulating a video stream from a user's webcam, or generating 3D graphics and audio samples.
Third-party APIs that allow developers to incorporate functionality in sites from other content providers, such as Twitter or Facebook.
Third-party frameworks and libraries that you can apply to HTML to accelerate the work of building sites and applications.
It's outside the scope of this article—as a light introduction to JavaScript—to present the details of how the core JavaScript language is different from the tools listed above. You can learn more in MDN's JavaScript learning area, as well as in other parts of MDN.

-Mozilla, creators of JS

Javascript is case sensitive, so these are not the same variable:
```js
var HelloWorld;
var helloworld;
```
## Setting up your JS files

Requirements:

1 website

The ability to follow instructions

Take your test website, and create a new file with any name, keep it simple, for you will be using it later in your HTML code. In that folder you would want to make a script with any name and a .js suffix, but keep it simple as well.

Now go to your index.html file and put the following code in the < body > section, in between both that and the  < /body> section. 
```js
<body>
<script src="foldernamehere/scriptnamehere.js"></script>
</body>
```
When you finish, go to your js file and add the following code into it:
```js
const myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello world!';
```
Open your index.html file.

### How did that work?

How that worked is that you have a constant of MyHeading, which is in header 1 format. You assigned the value Hello World to it, which results in a header with the text Hello World. You have assigned the script to the index.html file which makes the script run on the html file.

## Variables

A variable is like a container. You can put something in it, and when you want to see what is in it you can check, and get the value. You can also change the value in a variable.

A simple variable initialization would look like this:
(Be sure to keep the name simple not like the example)
```js
var whatevervarnameyouputinheremakeitsimplenotlikethisplease;
```
If you want to assign a value:
```js
whatevervarnameyouputinheremakeitsimplenotlikethisplease=1;
```
You can get the value by simply typing the name (This is why you need it simple, unless you like typing large unnecessary amounts of code)
```js
whatevervarnameyouputinheremakeitsimplenotlikethisplease;
```
And when put into a code runner, with the value assigner above, it should return '1'.
### Types of variable values

In this example code the types of variable values will be shown.
```js
var tempvar;
tempvar=1;//number, no quotes around, can be floats or have sub equations in them
tempvar='Hello world';//string, has quotes around them
tempvar=[23,34,'bob','josie',52.32,32/4,];//array, has multiple values, keep in mind it starts from value 0, so would be like tempvar[0]; for slot 1 of the array
let myVariable = document.querySelector('h1');//object, can be ANYTHING in javascript, including everything above! cool,right?
```
As you saw above, the green lines of code don't actually run, which is pretty cool. In javascript this is called a comment. You can see examples below:
```js
//this is a comment! Yay

//how will i comment this? :(

/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non tellus efficitur leo porta blandit non eget erat. Phasellus a nisi accumsan, lobortis tortor vel, venenatis massa. Proin ultricies nibh vel dolor ultricies, id dictum eros volutpat. Mauris blandit, odio at pulvinar sollicitudin, quam est vestibulum orci, vel egestas augue dolor sed felis. Nullam vitae risus aliquet, blandit metus eget, malesuada lectus. Quisque rutrum finibus ipsum. Etiam hendrerit sagittis nisi vel ornare. Ut a quam ut turpis tempus consequat. Nam in urna ac libero consectetur dictum. Vivamus eu enim malesuada, consequat nisi vitae, facilisis nisl. Proin suscipit eros dapibus lectus maximus malesuada. Nam velit velit, hendrerit ut euismod eu, tincidunt vitae augue. Pellentesque at nunc molestie, venenatis leo ac, tempus massa. Phasellus sagittis nisl in erat porta, ac molestie orci ornare. Ut ut arcu eget magna rutrum lacinia a a orci.*/
```
Watch out with the start and end comments though. If you forget to put an end, or do not put it properly, your whole code will be commented out!

## Operators

An operator is a mathematical symbol which produces a result based on two values (or variables). 

In the following code you will see the different types of operators.

```js
6+9;
'hi'+'bob!';//addition operator, note that these are all values, you can assign them to variables or through console.log();
3-1;
2*2;
4/2;//literally math

let myvar=3;//equality, assigning values or checking for them
myvar===4;
//false, returns a boolean. These can all be put in if statements.
myvar!==4;
//not statement, if not then will be declared true. pretty much inverts your statement.

```

### Conditionals

```js
let iceCream = 'chocolate';
if(iceCream === 'chocolate') {
  alert('Yay, I love chocolate ice cream!');    
} else {
  alert('Awwww, but chocolate is my favorite...');    
}
```
You can use if/else statements to check values, the () in the if statement is checking whether the value is stated as said, and if it returns as true, it will run the code in the curly braces. Else is if it is false, and will run the code within the curly braces.

### Functions

You have already seen many functions, but functions are a way to reuse code that you do not want to spend unnecessary time rewriting. Example of a function that was covered:
```js
let myVariable = document.querySelector('h1');
alert('hello!');
console.log('hi');
```
These functions are already built-in to the browser. If you see something that looks like a variable name, but has () behind it, it most likely is a function.

You can also code your own functions. Cool, eh?
We will be making a simple multiplication function, as an example.

Note- js already has its' multiplication function, this is just a demo
```js
function multiply(num1,num2) {
  let result = num1 * num2;
  return result;
}
```
Try running the code in your browser console or code runner, and you can experiment with it.
```js
multiply(4, 7);
multiply(20, 20);
multiply(0.5, 3);
```
## Events

If you wish to have a real good website or game, you definitely need events. These can bring interactivity to your website, and make it more interesting for the visitor.

Paste the following code into your console or code runner:
```js
document.querySelector('html').onclick = function() {
    alert('Ouch! Stop poking me!');
}
```
You can have this function of code in many different ways. Here we select the html element, setting the onclick handler to a nameless function, which contains the code we want to run.

Note that
```js
document.querySelector('html').onclick = function() {};
```
is the same as
```js
let myHTML = document.querySelector('html');
myHTML.onclick = function() {};
```
, just shorter.

# Improving our test website

## Image swapper
Chose any 2 images that you like, and put them in a folder, keep the name simple.
In this demo we will be naming the folder 'images' and the pictures address will be 'epicimage.png' and 'epicimage2.png'. We will put this code in our .js file:
```js
let myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/epicimage.png') {
      myImage.setAttribute('src','images/epicimage2.png');
    } else {
      myImage.setAttribute('src','images/epicimage.png');
    }
}
```

When you launch your website, you should see a image, and when clicked it should change to your second image.

How? This worked because you made a reference to the < img> element in the myImage variable. 

Next, you made this variable's onclick event handler property equal to a function with no name (an "anonymous" function). So every time this element is clicked:

The code retrieves the value of the image's src attribute.
The code uses a conditional to check if the src value is equal to the path of the original image:
If it is, the code changes the src value to the path of the second image, forcing the other image to be loaded inside the < img> element.
If it isn't (meaning it must already have changed), the src value swaps back to the original image path, to the original state.

# Personalized welcome

In your index.html file, put this code in before your < script> element:
```js
<button>Change user</button>
```
Next, in the JS file you are referencing in script src= paste the following code in:
```js
let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');
```
This will take references to the button and the header 1 text, but it currently does not do anything. We will need the following code below:
```js
function setUserName() {
  let myName = prompt('Please enter your name.');
  localStorage.setItem('name', myName);
  myHeading.textContent = 'I said this message just for you, ' + myName;
}
```
The setusername function contains the prompt() function, which is similar to alert(); but asks for an answer instead. It accesses the localstorage, which is a local storage, and sets the returned value in there. Then it changes the heading content to a message, with your returned value.

Add the code below in to your js file:
```js
if(!localStorage.getItem('name')) {
  setUserName();
} else {
  let storedName = localStorage.getItem('name');
  myHeading.textContent = 'Mozilla is cool, ' + storedName;
}
```
This NOT function checks if you have a name in the localstorage already, if not, it will make it. If you already have one, it will display that value.

Finally, put the following code below, which references the button:
```js
myButton.onclick = function() {
  setUserName();
}
```
The problem would be if you clicked 'cancel' or clicked 'OK' without any value inside. Update the setUserName function with the following code below:
```js
function setUserName() {
  let myName = prompt('Please enter your name.');
  if(!myName) {
    setUserName();
  } else {
    localStorage.setItem('name', myName);
    myHeading.innerHTML = 'I wrote this message jut for you, ' + myName;
  }
}
```
In human language, this means: If myName has no value, run setUserName() again from the start. If it does have a value (if the above statement is not true), then store the value in localStorage and set it as the heading's text.

If you get stuck, this is the finished example code:
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<button>Change user</button>
<script>
let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');
function setUserName() {
  let myName = prompt('Please enter your name.');
  if(!myName) {
    setUserName();
  } else {
    localStorage.setItem('name', myName);
    myHeading.innerHTML = 'I wrote this message jut for you, ' + myName;
  }
}
if(!localStorage.getItem('name')) {
  setUserName();
} else {
  let storedName = localStorage.getItem('name');
  myHeading.textContent = 'Mozilla is cool, ' + storedName;
}
myButton.onclick = function() {
  setUserName();
}
</script>
</body>
</html>
```
You can paste this in your index.html file. ITS ACTUALLY KINDA OUTDATED I WILL NEED TO FIX SORRY