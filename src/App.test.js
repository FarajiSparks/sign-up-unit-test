import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';


beforeEach(()=>{
  render(<App />);
});

const typeIntoForm = ({email, password, confirmPassword}) =>{
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i, 
  });
  const passwordInputElement = screen.getByLabelText("Password", {
    name: /password/i,
  });
  const confirmPasswordInputElement = screen.getByLabelText("Confirm Password", {
    name: /confirmPassword/i,
  });
  if(email){
    userEvent.type(emailInputElement, email)
  }
  if(password){
    userEvent.type(passwordInputElement, password)
  }
  if(confirmPassword){
    userEvent.type(confirmPasswordInputElement, confirmPassword)
  }

  return{
    emailInputElement, 
    passwordInputElement, 
    confirmPasswordInputElement
  }
}

const clickOnSubmitButton = () =>{
  const submitBtnElement = screen.getByRole("button");
  userEvent.click(submitBtnElement);
}


describe("App", ()=>{
  test("inputs should be initially empty", ()=>{
 
    expect((screen.getByRole("textbox")).value).toBe("");
    expect(( screen.getByRole("textbox")).value).toBe("");
    expect((screen.getByRole("textbox")).value).toBe("")
  }); 
  
  test("should be able to type an email", ()=>{
    
    const {emailInputElement} = typeIntoForm({
      email: "selena@gmail.com"
    });
    expect(emailInputElement.value).toBe("selena@gmail.com");
  });
  
  test("should be able to type password", ()=>{
    const {passwordInputElement} = typeIntoForm({password: "Password"})
    expect(passwordInputElement.value).toBe("Password");
  });
  
  describe("Error Handling", ()=>{
    beforeEach(()=>{
      console.log("JOJO");
    })

    test("should be able to type confirm password", ()=>{
      const {confirmPasswordInputElement} = typeIntoForm({confirmPassword:"Password"})
      expect(confirmPasswordInputElement.value).toBe("Password");
    }); 
    
    
    test("should show error message on invalid email", ()=>{
      typeIntoForm({
        email: "selenagmail.com"
      });
      const submitBtnElement = screen.getByRole("button");
      userEvent.click(submitBtnElement);
      expect(screen.getByText(/The email you input is invalid./i).toBeInTheDocument); 
    
    });
    
    
    test("should show password error if password is less than five characters", ()=>{
      typeIntoForm({
        email: "selena@gmail.com",
        password:"123"
      });
      const passwordErrorElement = screen.queryByText(
        /The password you entered should contain 5 or more characters./i
      );
      clickOnSubmitButton();
      expect(passwordErrorElement).not.toBeInTheDocument();
      const passwordErrorElementAgain = screen.queryByText(
        /The password you entered should contain 5 or more characters./i
      );
      expect(passwordErrorElementAgain).toBeInTheDocument();
    });
    
    
    test("should show confirm password error if passwords don't match", ()=>{
      
      typeIntoForm({
        email: "selena@gmail.com",
        password:"password",
        confirmPassword:"passturd"
      });
      const confirmPasswordErrorElement = screen.queryByText(
        /The passwords don't match. Try again/i
      );
      clickOnSubmitButton();
      expect(confirmPasswordErrorElement).not.toBeInTheDocument();
      expect(screen.queryByText(
        /The passwords don't match. Try again/i
      )).toBeInTheDocument();
    });
    
     
    test("should show no error message if everything is valid", ()=>{
      
      typeIntoForm({
        email: "selena@gmail.com",
        password:"password",
        confirmPassword:"password"
      });
    
      const confirmPasswordErrorElement = screen.queryByText(
        /The passwords don't match. Try again/i
      );
      const passwordErrorElementAgain = screen.queryByText(
        /The password you entered should contain 5 or more characters./i
      );
      const emailErrorElement = screen.queryByText(/The email you input is invalid./i); 
      clickOnSubmitButton();
    
      expect((confirmPasswordErrorElement)).not.toBeInTheDocument();
      expect(confirmPasswordErrorElement).not.toBeInTheDocument();
      expect(passwordErrorElementAgain).not.toBeInTheDocument();
      expect(emailErrorElement).not.toBeInTheDocument();
    });
  })
  
})


