import React, {Component} from 'react';
import firebase from 'firebase';

class FileUpload extends Component{
  constructor(){
    super();
    //Estados del componente
    this.state = {
      uploadValue: 0,
      picture:null
    };

    this.handleOnUpload = this.handleOnUpload.bind(this);
  }

  //Trabajamos con las opciones de firebase para subir imagenes
  handleOnUpload(event){
      const file = event.target.files[0];
      const storageRef = firebase.storage().ref(`/Photos/${file.name}`);
      //const task = storageRef.put(file);
      const task = storageRef.child(`${file.name}`).put(file);

      task.on('state_changed', snapshot => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalbytes) * 100;
        this.setState({
          uploadValue : percentage
        })
      }, error => { console.log(error.message) 
      }, () => {
        //Cuando se carga por completo entonces hace esto
        console.log(task.snapshot);
        storageRef.child(file.name).getDownloadURL().then((url) => {
          this.setState({
            uploadValue: 100,
            picture: url       
          });
        });
      });
   }



  //Aquí pintamos el html de este componente
  /**
   * <progress> muestra una barra de progreso que se llenara cada vez que se suba un archivo
   * El valor a mostrar es el valor del estado upLoadValue
   * <input> de tipo fichero, el evento que se va a disparar cada vez que se suba un fichero
   * va a ser onChange del virtualDom de React. Este evento llamará a la función que en este
   * caso es handleOnUpload
   */
  render(){
    return(
      <div>
        <progress value= {this.state.uploadValue} max ="100"></progress> 
        <br/>
        <input type="file" onChange={this.handleOnUpload}/>
        <br/>
        <img width="320" src= {this.state.picture} alt=""/>
      </div>
    );
  }
}

//Exportamos el componente para que pueda ser llamado desde cualquier clase
export default FileUpload;