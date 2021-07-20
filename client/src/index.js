import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './reportWebVitals';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import {Accordion, AccordionSummary, AccordionDetails} from "@material-ui/core";
import Axios from "axios";
class App extends React.Component{
    componentDidMount(){
      localStorage.setItem("signedIn",false);
    }
    render(){
    return(
      <Router>
      <Switch>
      <Route path="/preloader" component={Preloader} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/logout" component={Logout} />
      <Route path="/store" component={Store} />
      <Route path="/" component={Landing}/>
      </Switch>
      </Router>
      );
  }
}

class Navigation extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Navbar bg="light" expand="md" className="px-2 fixed-top" variant="light">
      <Navbar.Brand href="" className=""><b className="text-dark font-weight-bolder">Hyad</b></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{fontSize: "1rem"}} className="navbar-toggler">
      <span className="navbar-toggler-icon">
      </span>
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav" className="">
      
      <Nav className="mx-auto">
      <Nav.Link href="/home" className="">Home page</Nav.Link>
      <Nav.Link href="/about" className="">About us</Nav.Link>
      <Nav.Link href="/fordeveloper" className="">For Engineers</Nav.Link>
      <div className="d-flex text-center">
      <Nav.Link className="btn btn-primary text-light px-3">
      <Link to="/register">Sign up </Link>
      </Nav.Link>
      <Nav.Link href="/login" className="btn btn-outline-primary text-primary mx-3 px-3">Sign in</Nav.Link>
      </div>
      </Nav>
      </Navbar.Collapse>
      </Navbar>
      );
  }
}


class Preloader extends React.Component{
  render(){
    return(
      <React.Fragment>
      <div className="preloader">
      <i className="fas fa-spinner fa-spin"></i>
      
      </div>
      </React.Fragment>
      );
  }
}
class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      companyName: {
        content: "",
        comment: ""
      },
      companyEmail: {
        content: "",
        comment: ""
      },
      password: {
        content: "",
        comment: ""
      },
      confirm_psw: {
        content: "",
        comment: ""
      },
      phone_no: {
        content: "",
        comment: ""
      },
      country: {
        content: "",
        comment: ""
      },
      province: {
        content: "",
        comment: ""
      },
      postal: {
        content: "",
        comment: ""
      }
    }
    
this.changeCompanyName = this.changeCompanyName.bind(this);
this.changeCompanyEmail = this.changeCompanyEmail.bind(this);
this.changePassword = this.changePassword.bind(this);
this.changeConfirmPsw = this.changeConfirmPsw.bind(this);
this.changePhone = this.changePhone.bind(this);
this.changeCountry = this.changeCountry.bind(this);
this.changeProvince = this.changeProvince.bind(this);
this.changePostalCode = this.changePostalCode.bind(this);
this.onClickHandler = this.onClickHandler.bind(this);
}

changeCompanyName(event){
  this.setState({
    companyName: {
      content: event.target.value
    }
  })
}
changeCompanyEmail(event){
  this.setState({
    companyEmail: {
      content: event.target.value
    }
  })
}
changePassword(event){
  this.setState({
    password: {
      content: event.target.value
    }
  })
}
changeConfirmPsw(event){
  this.setState({
    confirm_psw: {
      content: event.target.value
    }
  })
}
changePhone(event){
  this.setState({
    phone_no: {
      content: event.target.value
    }
  })
}
changeCountry(event){
  this.setState({
    country: {
      content: event.target.value
    }
  })
}
changeProvince(event){
  this.setState({
    province: {
      content: event.target.value
    }
  })
}
changePostalCode(event){
  this.setState({
    postal: {
      content: event.target.value
    }
  })
}
onClickHandler(event){
  event.preventDefault();
  var allowSignIn = true;
  if(this.state.companyName.content === ""){
    this.setState({
      companyName: {
        comment: "Company's name cannot be empty"
      }
    })
      allowSignIn = false;
   }
   if(this.state.companyEmail.content === ""){
    this.setState({
      companyEmail: {
        comment: "Email cannot be empty"
      }
    })
    allowSignIn = false;
  }
  if(this.state.password.content === ""){
    this.setState({
      password: {
        comment: "Password cannot be empty"
      }
    })
    allowSignIn = false;
  }
  if(this.state.confirm_psw.content === ""){
    this.setState({
      confirm_psw: {
        comment: "Just in case, put in your password again."
      }
    })
    allowSignIn = false;
  }
  if(this.state.phone_no.content === ""){
    this.setState({
      phone_no: {
        comment: "Your company's phone number is required"
      }
    })
    allowSignIn = false;
  }
  if(this.state.country.content === "Select your country" || this.state.country.content === ""){
    this.setState({
      country: {
        comment: "Please, choose a country"
      }
    })
    allowSignIn = false;
  }
  if(this.state.province.content === ""){
    this.setState({
      province: {
        comment: "State cannot be empty."
      }
    })
    allowSignIn = false;
  }
  if(this.state.postal.content === ""){
    this.setState({
      postal: {
        comment: "Your postal or zip code is required"
      }
    })
    allowSignIn = false;
  }
  
  
  else{
    if(allowSignIn){
  var userDetails = {
    companyName: this.state.companyName.content,
    companyEmail: this.state.companyEmail.content,
    password: this.state.password.content,
    phone_no: this.state.phone_no.content,
    country: this.state.country.content,
    province: this.state.province.content,
    postal: this.state.postal.content
  }
 Axios.post("http://localhost:3001/app/register", userDetails);
 
 if(typeof(Storage !== undefined)){
 localStorage.setItem("companyName",userDetails.companyName);
 localStorage.setItem("companyEmail",userDetails.companyEmail);
 localStorage.setItem("signedIn",true);
}

 this.setState({
    companyName: "",
    companyEmail: "",
    password: "",
    phone_no: "",
    country: "",
    province: "",
    postal: ""
   });
   }
  }
}



  render(){
    return(
       <React.Fragment>
  <div className="container mt-5 mb-5">
  <h1 className="text-center">
  Tell us a little about your company.</h1>
  <p className="text-center">Connect with hundreds of businesses outside Africa.</p>
  <form method="post" className="">
  <input type="text" className="form-control mt-2" onChange={this.changeCompanyName} value={this.state.companyName.content} placeholder="Your company's name"/>
 <div className="text-danger">{
  this.state.companyName.comment
  }</div>
  
   <input type="email" className="form-control mt-2" onChange={this.changeCompanyEmail} value={this.state.companyEmail.content} placeholder="Your company's email"/>
  <div className="text-danger">{
  this.state.companyEmail.comment
  }</div>
  <input type="password" className="form-control mt-2" onChange={this.changePassword} value={this.state.password.content} placeholder="Password"/>
  <div className="text-danger">{
  this.state.password.comment
  }</div>
  
  
  <input type="password" className="form-control mt-2" onChange={this.changeConfirmPsw} value={this.state.confirm_psw.content} placeholder="Confirm your password"/>
  <div className="text-danger">{
  this.state.confirm_psw.comment
  }</div>
  
  <input type="tel" className="form-control mt-2" onChange={this.changePhone} value={this.state.phone_no.content} placeholder="Contact number"/>
   <div className="text-danger">{
  this.state.phone_no.comment
  }</div>
  <select className="form-control mt-2 d-block form-select"onChange={this.changeCountry} value={this.state.country.content}>
  <option>
   Select your country
  </option>
  
  <option>
   Nigeria
  </option>
  
  <option>
   United States
  </option>
  
  </select>
  <div className="text-danger">{
  this.state.country.comment
  }</div>
  
  <input type="text" className="form-control mt-2" onChange={this.changeProvince} value={this.state.province.content} placeholder="State or Province"/>
  <div className="text-danger">{
  this.state.province.comment
  }</div>
  
  <input type="number" className="form-control mt-2" onChange={this.changePostalCode} value={this.state.province.content} placeholder="Postal or Zip code"/>
  <div className="text-danger">{
  this.state.postal.comment
  }</div>
 
<input type="submit" className="form-control mt-2 btn-danger" onClick={this.onClickHandler} value="Sign up" />
  </form>
  <p className="text-dark mt-3 text-center">Have an account already? sign in <Link to="/login">here</Link></p>
  </div>
  <footer className="container mb-0 mt-5 text-muted text-center">&copy;2021 Tradestack Dev. team</footer>
       </React.Fragment>
      );
  }
}
class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      companyEmail: "",
      password: "",
      signInInfo: ""
    };
    this.changeCompanyEmail = this.changeCompanyEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  changeCompanyEmail(event){
    this.setState({
      companyEmail: event.target.value
    });
  }
  changePassword(event){
    this.setState({
      password: event.target.value
    });
  }
  onClickHandler(event){
    event.preventDefault();
    var checkEmail = this.state.companyEmail;
    var checkPassword = this.state.password;
    var emailValidate = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+[.a-zA-Z0-9]/;
    
    if(checkEmail != "" && checkPassword != ""){
      if(!emailValidate.test(checkEmail)){
        alert("Check email again, seems like it's incorrect");
      }
    var loginDetails = {
      companyEmail: this.state.companyEmail,
      password: this.state.password
    }
    Axios.post("http://localhost:3001/app/login",loginDetails);
    
    this.setState({
      companyEmail: "",
      password: ""
    })
    
     const  fetchLoginState = async () => {
      const response = await Axios.get("http://localhost:3001/app/login");
      this.setState({
        signInInfo: response.data
      })
    }
    fetchLoginState();
      }else if(checkEmail == ""){
      alert("Email cannot be empty");
    }else if(checkPassword ==""){
      alert("Password cannot be empty");
    }
   }
   
   componentDidMount(){
 
   }
  render(){
    return(
      <React.Fragment>
  <div className="container mt-7 text-center">
  <h1>We are glad you are here.</h1>
  <p className="text-center">Sign in to get access to your account.</p>
  <form className="" method="post">
  <input type="email" className="form-control mt-2" placeholder="Type your email here" value={this.state.companyEmail} onChange={this.changeCompanyEmail}  />
  <input type="password" className="form-control mt-2" placeholder="Type your password here" value={this.state.password} onChange={this.changePassword}  />
  <div className="alert alert-warning p-0">{this.state.signInInfo}</div>
  <input type="submit" className="form-control mt-2 btn-danger" value="Log in" onClick={this.onClickHandler} />
  </form>
  <p className="text-muted mt-3">Don't have an account yet? <Link to="/register" className="">Sign up here</Link></p>
    </div>
      </React.Fragment>
      );
  }
}

class Faqs extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
  return(
      <div className="card my-2">
      <Accordion>

        <AccordionSummary  expandIcon="+">
        <p className="text-dark">{this.props.summary}</p>
        </AccordionSummary>

        <AccordionDetails>
      {this.props.details}
        </AccordionDetails>

      </Accordion>
     </div>
  );
 }
}

class Landing extends React.Component{
 constructor(props){
   super(props);
   this.state = {
   }  
 }
  render(){
    return(
      <React.Fragment>
      <Navigation />
      <div className="container">
      <img src=""/>
      </div>
      <div className=" mt-5 container">
      <div className="row">
      <div className="col-12 col-md-6">
      <h1 className="large">
       Hire the top 1% <br /> AI experts
       from anywhere in<br />
       <span className="text-primary">Africa</span>
      </h1>
      <p className="text-muted">
       Hire throughly vetted Artificial
       Intelligence, Machine Learning,
       Blockchain Engineers 
       with exceptional problem-solving
       abilities from anywhere in Africa.
     </p>
     <Link href="/login" className="btn btn-outline-primary" >Apply to jobs</Link>
     <a href="https://calendly.com" className="btn btn-primary mx-2" >Request a call</a>
     </div>
     <div className="col-12 col-md-6">
      <img src="/img/landing.jpg" className=""/>
    </div>
     </div>
     <div className="text-muted"></div>

     <p className="my-3 alert alert-warning">The greatest education in the world is watching the masters at work. - <b>Micheal Jackson</b></p>
     <div className="text-center row">
     <div className="col-12 col-md-4 my-2">
     <h1 className="large text-primary alpha-1">
     <i className="fa fa-chess"></i>
     </h1>
     <h3 className="">Thoroughly vetted engineers</h3>
     <p className="text-muted">
     All our engineers have been tested through very vigorous tests prepared by experts. Remember, we only pass the top 1%.
     </p>
     </div>
     
     
     <div className="col-12 col-md-4 my-2">
     <svg height="50" viewBox="0 0 24 24" width="50" xmlns="http://www.w3.org/2000/svg" className="large alpha-1"><path d="M3 11.5a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zm9 9a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zm9-9a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zm-9-9a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zM11.5 4c-.277 0-.5.223-.5.5v5.594c-.58.208-1 .76-1 1.406 0 .823.677 1.5 1.5 1.5.647 0 1.198-.42 1.406-1H16.5c.277 0 .5-.223.5-.5s-.223-.5-.5-.5h-3.594c-.152-.422-.484-.754-.906-.906V4.5c0-.277-.223-.5-.5-.5zm0 7c.282 0 .5.218.5.5 0 .282-.218.5-.5.5-.282 0-.5-.218-.5-.5 0-.282.218-.5.5-.5zm0-11C5.155 0 0 5.155 0 11.5S5.155 23 11.5 23 23 17.845 23 11.5 17.845 0 11.5 0zm0 1C17.305 1 22 5.695 22 11.5S17.305 22 11.5 22 1 17.305 1 11.5 5.695 1 11.5 1z" fill="#0d6efd"/></svg>
     <h3 className="mt-3">Save time and money</h3>
     <p className="text-muted">
       Startups need to grow very fast, every
       time and money spent counts. The
       traditional means of recruiting
       AI and ML engineers is money and time consuming. We would help with that.
       </p>
     </div>
      <div className="col-12 col-md-4 my-2">
     <h1 className="large text-primary alpha-1">
     <i className="fa fa-brain"></i>
     </h1>
     <h3 className="">Only hire great minds.</h3>
     <p className="text-muted">
      We only hire top talents with exceptional leadership and problem-solving skills. We don't just test coding abilities but also creativity and leadership skills.
      </p>
      </div>
  
     </div>
     <div className="faqs my-3" id="faqs">
     <h1 className="">FREQUENTLY ASKED QUESTIONS</h1>
     <Faqs summary="What is Hyad?" details="Hyad is an outsourcing furm that helps startups in hiring the top 1% Artificial Intelligence, Machine Learning and Blockchain engineers in Africa. Our mission is to help startups find software engineers with exceptional creativity and problem-solving abilities."
     />
     <Faqs summary="What steps will I take to hire on Hyad" details="Click on Hire now. On the new page you would be prompted to tell us exactly the type of Software Engineer you want. After clicking next, a new page opens up showing you a shortlist of engineers from our pool of thoroughly vetted engineers. Choose as many as you want to hire. Click pay and automatically they will be matched with your company. " />
     <Faqs summary="Will I pay Hyad for their service?" details="Yes, you have to pay a token, that is only after we have done our job in helping you recruit the best engineers in Africa." />
     <Faqs summary="Is there a money-back guarantee?" details="Yes, there is a 30-day money-back guarantee. If the engineer you hired happened not to be who you wanted, we can match you with someone else or return your money, plus compensation for wasting your time." />
     </div>
     <div className="my-4">
     <h1>See what this dudes said about us</h1>
     <Carousel>
     <Carousel.Item className="border-left-colored p-2 mt-2">
    Sometimes ago, we needed some AI engineers on our team. Getting a good one is usually not easy and might even take weeks, but Hyad helped us get a very good one in two days. I didn't even have to read resumés.
     <br />
     <b className="">Shola Akinlade</b>
     <br />
     <span className="text-muted">CEO, Paystack</span>
     </Carousel.Item>
     <Carousel.Item className="border-left-colored p-2">
    Machine Experts are rare to find in Nigeria. A lot of developers claim to be one but are not worth your money. I like the leadership and accuracy score they give to engineers. It gives better clue about whoever I want to hire.
     <br />
     <b className="">Olugbenga Agboola</b>
     <br />
     <span className="text-muted">CEO, Flutterwave</span>
     </Carousel.Item>
  
     </Carousel>
     </div>
     </div>
     
     <Footer />
      </React.Fragment>
      )
  }
}

class Footer extends React.Component{
  render(){
    return(
      <div className=" text-center bg-light small">
      <span className="text-dark">
      <Link to="/register" className="text-dark">
       For engineers
      </Link>
      </span>
      <br />
      <span className="text-dark">
      <Link to="/fordeveloper" className="text-dark">
       For companies
      </Link>
      </span>
      <br />
      <span className="text-dark">
      <Link to="/fordeveloper" className="text-dark">
       Our team
      </Link>
      </span>
      <div className="text-muted mt-3">
      &copy;2021 TopHire dev. Team.
      </div>
      </div>
      );
  }
}
class Home extends React.Component{
  constructor(props){
    super(props);
    
  }
 componentWillMount(){
   if(window.localStorage.getItem("signedIn") == false){
   window.location.assign("/login");
   }
 }
  render(){
    return(
    <React.Fragment>
    <div className="container">
    <h1>Home</h1>
    <Link to="/logout">Log out</Link>
    </div>
      </React.Fragment>
      );
  }
}

class Store extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      productName:"",
      minPrice:"",
      maxPrice:"",
      productImage:"",
      Description:""
      
    }
    this.changeProductName = this.changeProductName.bind(this);
    this.changeMinPrice = this.changeMinPrice.bind(this);
    this.changeMaxPrice = this.changeMaxPrice.bind(this);
    this.changeProductImage = this.changeProductImage.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  
  changeProductName(event){
    this.setState({
      productName: event.target.value
      });
  }
   changeMinPrice(event){
    this.setState({
      minPrice: event.target.value
      });
  }
   changeMaxPrice(event){
    this.setState({
      maxPrice: event.target.value
      });
  }
   changeProductImage(event){
    this.setState({
      productImage: event.target.value
      });
  }
   changeDescription(event){
    this.setState({
      Description: event.target.value
      });
  }
  onClickHandler(event){
    event.preventDefault();
  }
  render(){
    return(
      <React.Fragment>
      <Navigation />
      <div className="container mt-6 mb-5">
      <h1>Create a product.</h1>
      <p className="text-muted">Your store is a virtual shop that helps you get discovered on Tradestack. Create a product to start selling right away!</p>
      <form method="post" >
      <input type="text" value={this.productName} onChange={this.changeProductName} placeholder="Product's name" className="form-control mt-2" />
      <input type="number" value={this.minPrice} onChange={this.changeMinPrice} placeholder="Minimum price" className="form-control mt-2" />
     <input type="number" value={this.maxPrice} onChange={this.changeMinPrice} placeholder="Maximum price" className="form-control mt-2" />
     <input type="file" value={this.productImage} onChange={this.changeProductImage} placeholder="Product's name" className="form-control mt-2" />
     <textarea value={this.Description} onChange={this.changeDescription} placeholder="Say something about the product" className="form-control  mt-2"/>
     <input type="submit" value="Create product" onClick={this.onClickHandler} placeholder="Product's name" className="form-control mt-2 btn-danger" />
     <h1 className="mt-5">Your products.</h1>
     
      </form>
      </div>
      </React.Fragment>
      );
  }
}
class Logout extends React.Component{
  constructor(props){
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  
    onClickHandler(){
      window.localStorage.setItem("signedIn",false)
    }
  render(){
    return (
      <React.Fragment>
      <div className="container mt-4 text-center">
      <h1 className="">Are you sure you want to log out.</h1>
      <p className="text-center">
      <Link to="/login" className="btn btn-danger mx-2" onClick={this.onClickHandler}>No. Maybe later</Link>
      <Link to="/login" className="btn btn-outline-danger mx-2" onClick={this.onClickHandler}>Yes</Link>
      </p>
      </div>
      </React.Fragment>
  )
  }
}
ReactDOM.render( <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
