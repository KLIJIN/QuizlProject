import React, {Component}from "react";
import s from "./Auth.module.css"
import Button from "../../components/UI/buton/button"
import Input from "../../components/UI/input/input"
import is from 'is_js'
import axios from "axios";




class Auth extends Component {

    state = {
        formControls: {
            email: {
              value: "", 
              type: "email",
              label: "Email",
              errorMessage: "Input correct email",
              valid: false,
              touched: false,
              validation: {
                required: true,
                  email: true
              }

            },

            password: {
                value: "", 
                type: "password",
                label: "Password",
                errorMessage: "Input correct password",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLenght: 6
                } 
            }
        }
    }


    loginHandler = async () => {

        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
       
        try{
            const  respose = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0R30CwLXph1pcQ8RhlFKEWMidsj0bbI8', authData);

            console.log(respose.data)
       }catch (e) {
           console.log(e)
       }

    }
//apiKey: "AIzaSyC0R30CwLXph1pcQ8RhlFKEWMidsj0bbI8",
    
    registerHandler = async () => {

         const authData = {
             email: this.state.formControls.email.value,
             password: this.state.formControls.password.value,
             returnSecureToken: true
         }
        
         try{
             const  respose = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0R30CwLXph1pcQ8RhlFKEWMidsj0bbI8', authData);
             console.log(respose.data)
        }catch (e) {
            console.log(e)
        }
    
    }

    submitHandler = (event) => {
        event.preventDefault()
    }
    

    validateControl (value, validation) {
        if (!validation) {
            return true
        }

        let isvalid = true

        if (isvalid.required) {
           isvalid= value.trim() !=="" && isvalid
        }


        if (validation.email) {
            isvalid = is.email(value) && isvalid
          }
          

        if (isvalid.minLenght) {
            isvalid = value.length >= validation.minLenght && isvalid
        }

        return isvalid
    }


    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }
    
        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
    
        formControls[controlName] = control
    
        this.setState({
          formControls: formControls
        })
      }


    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
          const control = this.state.formControls[controlName]
          return (
            <Input
              key={controlName + index}
              type={control.type}
              value={control.value}
              valid={control.valid}
              touched={control.touched}
              label={control.label}
              shouldValidate={!!control.validation}
              errorMessage={control.errorMessage}
              onChange={event => this.onChangeHandler(event, controlName)}
            />
          )
        })
      }

    render () {
      


        return(
            <div className={s.Auth}>
               <div>
                    <h1>Auth</h1>

                    <form onSubmit={this.submitHandler}  >

                            {this.renderInputs()}

                            <Button type="success"
                                    onClick={this.loginHandler}
                            >
                            Login </Button>

                            <Button type="primary"
                                    onClick={this.registerHandler}
                            >
                            Sign in </Button>
                            
                    </form>


               </div>

            </div>
        )
    }
}

export default Auth;