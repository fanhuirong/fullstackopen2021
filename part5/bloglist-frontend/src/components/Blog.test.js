import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'kun kun',
  url: "http://google.com",
  likes: 9999,
  user: {
    username: "Kun kun",
    name: "The Kun",
  },
}

// step 5.13
test('renders content', () => {
  const component = render(
    <Blog blog={blog} />
  )

  // method 1 toHaveTextContent
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

   // method 2 使用 render 方法返回对象的getByText 。
  const element = component.getByText("Component testing is done with react-testing-library");
  expect(element).toBeDefined();

  // method 3 querySelector
  const div = component.container.querySelector(".blog");
  expect(div).toHaveTextContent("kun kun");
})

// step 5.14
test('clicking the button to show likes and url', () => {
  const component = render(
    <Blog blog={blog} />
  )
  // component.debug()
  const button = component.container.querySelector(".btn");
  fireEvent.click(button)

  const div = component.container.querySelector(".hide");
  expect(div).toHaveTextContent(blog.likes);
  expect(div).toHaveTextContent(blog.url);
})