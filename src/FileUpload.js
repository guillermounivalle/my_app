import React, {Component} from 'react';




class FileUpload extends Component{
  constructor(){
    super();
    //Estados del componente
    this.state = {
      uploadValue: 0,
    };

  
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
        <input type="file" onChange={this.props.onUpload}/>
      </div>
    );
  }
}

//Exportamos el componente para que pueda ser llamado desde cualquier clase
export default FileUpload;