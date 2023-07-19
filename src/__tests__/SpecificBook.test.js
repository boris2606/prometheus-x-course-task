import SpecificBook from "../pages/specific-book/SpecificBook";
import Context from "../data/Context";
import books from '../data/books.json'
import React from "react";
import { render, screen} from '@testing-library/react'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'
import userEvent from "@testing-library/user-event";

const data = {
    ...books
}

// const data = JSON.parse(localStorage.getItem('data'))

// const fetchData = async () => {
//     try {
//         await fetch('books.json')
//                 .then(response => response.json())
//                 .then(dataBooks => {
//                 localStorage.setItem('data', JSON.stringify(dataBooks))
//                 })
//     } catch (error) {
//         console.log(error);
//     }
// };

const renderComponent = () => {
    render (
        <Context.Provider value={{data, cardBooks:[data]}}>
            <Router initialEntries={["/books/1"]}>
                <Routes>
                    <Route path="/books/:bookId" element={<SpecificBook />} />
                </Routes>
            </Router>
        </Context.Provider>
    )

    const counterValue = screen.getByTestId('counter')
    const incrementBtn = screen.getByTestId('increment')
    const decrementBtn = screen.getByTestId('decrement')
    const price = +screen.getByTestId('price').textContent

    return { counterValue, incrementBtn, decrementBtn, price }
}

describe('SpecificBook page testing', () => {

    test('Increment testing', () => {
        const { counterValue, incrementBtn } = renderComponent()
        userEvent.click(incrementBtn)
        userEvent.click(incrementBtn)
        expect(counterValue).toHaveValue(3)
    })
    
    test('Decrement testing', () => {
        const { counterValue, decrementBtn,incrementBtn } = renderComponent()
        userEvent.click(incrementBtn)    
        expect(counterValue).toHaveValue(2)
        userEvent.click(decrementBtn)
        expect(counterValue).toHaveValue(1)
    })
    
    test('Price testing with changing count', () => {
        const { counterValue, decrementBtn,incrementBtn,price } = renderComponent()
        userEvent.click(incrementBtn)    
        expect(price * counterValue.value).toBe(21.98)
        userEvent.click(decrementBtn)
        expect(price * counterValue.value).toBe(10.99)
    })
})



