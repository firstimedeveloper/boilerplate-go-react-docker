import React, { Fragment } from 'react';
// import Game from './Game';
import Header from './Header';
// import Task from './Task';
import Lang from './FirstimeLang'

const App = () => (
    <Fragment>
        <Header />
        <Lang />
        {/* <Task products={PRODUCTS} />, */}
        {/* <Game /> */}
    </Fragment>
)


// const PRODUCTS = [
//     {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
//     {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
//     {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
//     {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
//     {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
//     {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'},
//     {category: 'Food', price: '$13.99', stocked: true, name: 'Apples'},
//     {category: 'Food', price: '$19.99', stocked: true, name: 'Bananas'}
// ];

export default App