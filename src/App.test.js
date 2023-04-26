import { getByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

//inital test block
test('renders learn react link', () => {
  //rendering component for testing
  render(<App />);
  //finding specific elements to test
  const linkElement = screen.getByText(/Email/i);
  //Assertion of what code should accomplish 
  expect(linkElement).toBeInTheDocument();
});

test("get test element by id", ()=>{
  render(<App/>);
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByRole("textbox");
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("")
}); 

test("should be able to type an email", ()=>{
  render(<App/>);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i, 
  });
  userEvent.type(emailInputElement, "selena@gmail.com");
  expect(emailInputElement.value).toBe("selena@gmail.com");
});