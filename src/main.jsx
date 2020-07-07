/**guia en:
 * https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js
 */
import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUser
} from "amazon-cognito-identity-js";
import React from "react";
import ReactDOM from "react-dom";
import appConfig from "./config";

Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId,
});
//OTP
class OTPForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: ''      
    };
  }

  handleOtpChange(e) {
    this.setState({otp: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const otp = this.state.otp.trim();

    var userData = {
      Username: 'melo',
      Pool: userPool,
    };
    
 var cognitoUser = new CognitoUser(userData);
cognitoUser.confirmRegistration(otp, true, function(err, result) {
	if (err) {
		alert(err.message || JSON.stringify(err));
		return;
	}
	console.log('call result: ' + result);
});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text"
               value={this.state.otp}
               placeholder="otp"
               onChange={this.handleOtpChange.bind(this)}/>
        <input type="submit"/>
      </form>
    );
  }
}

ReactDOM.render(<OTPForm />, document.getElementById('app'));

//Registro
/**
class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      nickname: '',
      phone_number: ''
    };
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  handleNicknameChange(e) {
    this.setState({nickname: e.target.value});
  }
  handlePhoneChange(e) {
    this.setState({phone_number: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const nickname = this.state.nickname.trim();
    const phone_number = this.state.phone_number.trim();
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
      new CognitoUserAttribute({
        Name: 'nickname',
        Value: nickname,
      }),
      new CognitoUserAttribute({
        Name: 'phone_number',
        Value: phone_number,
      })
    ];
    userPool.signUp(nickname, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('user name is ' + result.user.getUsername());
      console.log('call result: ' + result);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text"
               value={this.state.nickname}
               placeholder="nick"
               onChange={this.handleNicknameChange.bind(this)}/>
        <input type="text"
               value={this.state.phone_number}
               placeholder="phone"
               onChange={this.handlePhoneChange.bind(this)}/>
        <input type="text"
               value={this.state.email}
               placeholder="Email"
               onChange={this.handleEmailChange.bind(this)}/>
        <input type="password"
               value={this.state.password}
               placeholder="Password"
               onChange={this.handlePasswordChange.bind(this)}/>
        <input type="submit"/>
      </form>
    );
  }
}

ReactDOM.render(<SignUpForm />, document.getElementById('app'));
**/
