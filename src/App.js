import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './LogoTiger.png';

import FileUpload from './FileUpload';
import './App.css';

class App extends Component {
  constructor(){
    super(); // Si heredamos de otra clas, en este caso app hereda de Component
    this.state = {
      user: null,
      pictures: []
    };
    //Hay que realizar un bindeo del "this"
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleOnUpload = this.handleOnUpload.bind(this);
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

    //Listenes para la base de datos
    firebase.database().ref('pictures').on('child_added', snapshot =>{
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      });
    });
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

  //Trabajamos con las opciones de firebase para subir imagenes
  handleOnUpload(event){
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/Photos/${file.name}`);
    const task = storageRef.put(file);
    //const task = storageRef.child(`${file.name}`).put(file);

    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalbytes) * 100;
      this.setState({
        uploadValue : percentage
      })
    }, error => { console.log(error.message) 
    }, () => storageRef.getDownloadURL().then(url =>{
      //Cuando se carga por completo entonces hace esto
      // Subida completada
      // Obtenemos la URL del fichero almacenado en Firebase storage
      // Obtenemos la referencia a nuestra base de datos 'pictures'
      // Creamos un nuevo registro en ella
      // Guardamos la URL del enlace en la DB
       
       const record = {
         photoURL: this.state.user.photoURL,
         displayName: this.state.user.displayName,
         image: url
       };

       const dbRef = firebase.database().ref('pictures');
       const newPicture = dbRef.push();
       console.log("PhotoUrl=====>"+record.photoURL+" Name ==> "+record.displayName+" url image ==>"+record.image);
       newPicture.set(record);
      }));
  
 }


renderLoginButton(){
  /**
   * Entra la funcionalidad de react que son los estados. Si los estados son modificados, componente se va
   * a renderizar
   * El estado lo inicializamos en el constructor
   * 
   */
  //Si el usuario está logueado
  if (!this.state.user) {
    return (
      <button onClick={this.handleAuth} className="App-btn">
        Iniciar sesión con Google
      </button>
    );
  } else  {
    return (
      <div className="App-intro">
        <p className="App-intro">¡Hola, { this.state.user.displayName }!</p>

        <button onClick={this.handleLogout} className="App-btn">
          Salir
        </button>

        <FileUpload onUpload={ this.handleOnUpload }/>

        {
          this.state.pictures.map(picture => (
            <div className="App-card">
              <figure className="App-card-image">
                <img width="320" src={picture.image} />
                <figCaption className="App-card-footer">
                  <img className="App-card-avatar" src={picture.photoURL} alt={picture.displayName} />
                  <span className="App-card-name">{picture.displayName}</span>
                </figCaption>
              </figure>
            </div>
          )).reverse()
        }

      </div>

    );
  }
}

render() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>T3chfest 2017</h2>
      </div>
      { this.renderLoginButton() }
    </div>
  );
}
}

 

export default App;
