//index.js
// con js
const element = document.createElement('h1');
element.innerText = 'Hello World!';

const container = document.getElementById('app');

container.appendChild(element);
// con react

//import react to use JSX
import React from 'react';
import ReactDOM from 'react-dom';

const element = <h1> Hello World!</h1>	
const container = document.getElementById('app');

//ReactDOM.render(__qué__,__dónde__);
ReactDOM.render(element,container);

//JSX
import React from 'react';
import ReactDOM from 'react-dom';

const jsx = <1> Hello World!</h1>;
const element = React.createElement(
	'a',
	{ href: 'https://'},
	'Ir a Platzi'
);	

const name = 'Myname';
const element2 = React.createElement(
	'h1',
	{},
	'soy ${name}'
);	
// en jsx
sum = () => 3+3;
const element2 = <h1> Hola soy, {name}</h1>;
const element3 = <h1> Hola soy, {sum}</h1>;
const element3 = <h1> Hola soy, {undifined}</h1>;

const jsx =(
	<div>
		<h1> </h1>
		<p></p>

	</div>
);
// con react
const element = React.createElement(
	'div',
	{},
	React.createElement('h1'...),
	React.createElement('p'...)
)