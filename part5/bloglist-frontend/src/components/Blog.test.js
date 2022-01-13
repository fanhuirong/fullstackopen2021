import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
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