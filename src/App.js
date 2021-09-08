import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
     locationCity:"",
     locatinDAta:{},
     imageOFCity:"",
     errmassage:'',
     showtheMap:false,
     showError:false,
    };
  }
  supmtion =(e) =>{
    this.setState({locationCity : e.target.value});
  }
 
  handel = async (e) =>{
    e.preventDefault();
    
    try{  
   const url =`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.locationCity}&format=json`;
   const response = await axios.get(url);
   this.setState({
    locatinDAta: response.data[0],
    errmassage:'',
    showtheMap:true,
    showError:false,
    
  })
  console.log(response.data[0]); 
   const urlImage=`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&center={${this.state.locatinDAta.lat},${this.state.locatinDAta.lon}}&zoom=8`
  //  const urlImage2=`https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/A_large_blank_world_map_with_oceans_marked_in_blue.svg/4500px-A_large_blank_world_map_with_oceans_marked_in_blue.svg.png`
  // console.log(response2);
  const response1 = await axios.get(urlImage);

  console.log(urlImage); 
  console.log(response1); 
  
  this.setState({
    imageOFCity: response1.request.responseURL
    });
    this.setState({ showtheMap: !this.state.showtheMap });
    console.log(urlImage); 
  
  }catch(err){
      this.setState({
        errmassage:err.massage,
     showtheMap:false,
     showError:true,
  
    });}

}

  render() {
    return (
      <div>
        <center>

      <Form  onSubmit={this.handel} style={{ width: "25rem" ,border:'solid',padding: "30px",radius: '5%', margin:"20px" }}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Name of City</Form.Label>
    <Form.Control type="text" placeholder="Enter City"onChange={this.supmtion} />
  </Form.Group>

  <Button variant="primary" type="submit" value="Explorer!" >
    Submit
  </Button>
</Form>
<div  style={{  border:'solid',padding: "30px", margin:"20px" }}>
  <h2>
  </h2>
  <p style={{  border:'solid',padding: "30px", margin:"20px" }}><strong>location:  </strong>{ this.state.locatinDAta.display_name}</p>
  <p style={{  border:'solid',padding: "30px", margin:"20px" }}><strong>lat: </strong>{this.state.locatinDAta.lat}</p>
  <p style={{  border:'solid',padding: "30px", margin:"20px" }}><strong>lon: </strong>{this.state.locatinDAta.lon}</p>
  <img src={this.state.imageOFCity}/>

</div>
<Modal show={this.props.ModalShow} onHide={this.props.handleModalShow}>
        <Modal.Body>{this.props.errorMessage} <br/> Please Enter A vaild Name of a Location</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={this.props.handleModalShow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </center>
      </div>
    );
  }
}

export default App;

 

