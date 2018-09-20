import React, { Component } from 'react';
import firebase from 'firebase';

import './App.css';

class App extends Component {
  constructor(){
    super(); // Si heredamos de otra clas, en este caso app hereda de Component
    this.state = {
      user: null
    };
    //Hay que realizar un bindeo del "this"
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }


  /**
   * Métodos del ciclo de vida de React
   * componentWillMount() Lo que hace es dispararse cuando el componente se ha renderizado
   * en el DOM
   */
  componentWillMount(){
    //onAuthStateChanged devuelve un objeto usuario, este método es de firebase
    firebase.auth().onAuthStateChanged(user =>{
      this.setState({user});
    })
  }

  handleAuth(){
    /*
    Buscar la documentación de firebase
    **/
    //Creamos el proveedor. En este caso es google.
    const provider = new firebase.auth.GoogleAuthProvider();

    //Aquí le pasamos el proveedor
    firebase.auth().signInWithPopup(provider)
      .then(result=> console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error: ${error.code}: ${error.message}`));
      /**
       * .then(result=> console.log(`${result.user.email} ha iniciado sesión`)) esto es lo que anteriormente se escribía:
       * .then(function(result){
       *    return console.log(...)})
       */
  }

  handleLogout(){
    firebase.auth().signOut()
    .then(result=> console.log(`${result.user.email} ha salido`))
    .catch(error => console.log(`Error: ${error.code}: ${error.message}`));
  }

renderLoginButton(){
  /**
   * Entra la funcionalidad de react que son los estados. Si los estados son modificados, componente se va
   * a renderizar
   * El estado lo inicializamos en el constructor
   * 
   */
  //Si el usuario está logueado
  if(this.state.user){
    return (
      <div>
        <img src={this.state.user.photoURL} alt ={this.state.user.displayName} />
        <p> Hola {this.state.user.displayName}</p>
        <button onClick={this.handleLogout}>Logout</button>
      </div>  
    ); 
  }
  else{
    //Si no está logueado
    return(
      <button onClick= {this.handleAuth} > Login with Google</button>
    );
  }

  
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.renderLoginButton()} 
        </p>
      </div>
    );
  }
}

export default App;
