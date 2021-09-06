import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
     locationCity:"",
     locatinDAta:{},
     imageOFCity:"",
     err:false
    };
  }
  supmtion =(e) =>{
    this.setState({locationCity : e.target.value});
  }
  handel = async (e) =>{
    e.preventDefault();
    

   const url =`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.locationCity}&format=json`;
   const response = await axios.get(url);


   const urlImage=`https://maps.googleapis.com/maps/api/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&center=${this.state.locatinDAta.lat},${this.state.locatinDAta.lon}&zoom=14&size=400x400&format=png`
   const urlImage2=`https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350`
  // console.log(response2);
  this.setState({
    locatinDAta: response.data[0]
    
  })
  function AlertDismissible() {
    const [show, setShow] = useState(true);
  
    return (
      <>
        <Alert show={show} variant="success">
          <Alert.Heading>How's it going?!</Alert.Heading>
          <p>
            you should wirte city
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Close me y'all!
            </Button>
          </div>
        </Alert>
  
        {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
      </>
    );
  }
  try{
  this.setState({
    imageOFCity: urlImage
    });}catch(err){
      this.setState({
        imageOFCity: urlImage2,
        err:true
       
    });render(<AlertDismissible />);}

}

  render() {
    return (
      <div>
      <Form  onSubmit={this.handel} >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Name of City</Form.Label>
    <Form.Control type="text" placeholder="Enter City"onChange={this.supmtion} />
  </Form.Group>

  <Button variant="primary" type="submit" value="Explorer!" >
    Submit
  </Button>
</Form>
<div>
  <h2>
  </h2>
  <p><strong>location:  </strong>{ this.state.locatinDAta.display_name}</p>
  <p><strong>lat: </strong>{this.state.locatinDAta.lat}</p>
  <p><strong>lon: </strong>{this.state.locatinDAta.lon}</p>
  <img src={this.state.imageOFCity}/>

</div>
      </div>
    );
  }
}

export default App;

 

