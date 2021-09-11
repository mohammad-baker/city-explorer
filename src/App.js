import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
// import Card from "react-bootstrap/Card";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationCity: "",
      locatinDAta: [],
      imageOFCity: "",
      errmassage: "",
      showtheMap: false,
      showError: false,
      databack1: [],
      databack2: [],
    };
  }
  supmtion = (e) => {
    this.setState({ locationCity: e.target.value });
  };

  handel = async (e) => {
    e.preventDefault();
    const forlocation = e.target.nameOf.value;
    try {
      const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.locationCity}&format=json`;
      const response = await axios.get(url);
      this.setState({
        locatinDAta: response.data[0],
        errmassage: "",
        showtheMap: true,
        showError: false,
      });


      const urlImage = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&center={${this.state.locatinDAta.lat},${this.state.locatinDAta.lon}}&zoom=8`;
      const response1 = await axios.get(urlImage);


      
      const srverUrl = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/weather?city=${forlocation}`
      );
      const srverUrl2 = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/movie?query=${forlocation}`
      );


      
      this.setState({
        imageOFCity: response1.request.responseURL,
      });
      this.setState({
        databack1: srverUrl.data,
        databack2: srverUrl2.data,
        
      });
      console.log(this.state.srverUr2);
    } catch (err) {
      this.setState({
        errmassage: err.massage,
        showtheMap: false,
        showError: true,
      });
    }
  };

  render() {
    return (
      <div>
        <div></div>
        <center>
          <Form
            onSubmit={this.handel}
            style={{
              width: "25rem",
              border: "solid",
              padding: "30px",
              radius: "5%",
              margin: "20px",
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name of City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                onChange={this.supmtion}
                name="nameOf"
              />
            </Form.Group>

            <Button variant="primary" type="submit" value="Explorer!">
              Submit
            </Button>
          </Form>
          <div style={{ border: "solid", padding: "30px", margin: "20px" }}>
            <p style={{ border: "solid", padding: "30px", margin: "20px" }}>
              <strong>location: </strong>
              {this.state.locatinDAta.display_name}
            </p>
            <p style={{ border: "solid", padding: "30px", margin: "20px" }}>
              <strong>lat: </strong>
              {this.state.locatinDAta.lat}
            </p>
            <p style={{ border: "solid", padding: "30px", margin: "20px" }}>
              <strong>lon: </strong>
              {this.state.locatinDAta.lon}
            </p>
            <img src={this.state.imageOFCity} alt="this is " />
          </div>
          <div>
            {
              this.state.databack1.map((item)=>{
                return(
                  <div style={{ border: "solid", padding: "30px", margin: "20px" ,color:"gold"}}>
                    <p><strong>the weather description :  </strong> {item.date}</p>
 
                    <p><strong>the weather data :  </strong>{item.description}</p>
                    <br/>
                  </div>
                )
              }
              
            )
            }
          </div>
          <div>
            {
              this.state.databack1.map((item)=>{
                return(
                  <div style={{ border: "solid", padding: "30px", margin: "20px" ,color:"gold"}}>
                    <p><strong>the movie popularity :  </strong> {item.popularity}</p>
                    <p><strong>the movie count :  </strong> {item.count}</p>
                    <p><strong>the movie release date :  </strong> {item.release_date}</p>
                    <p><strong>the movie original title :  </strong> {item.original_title}</p>
                    <p><strong>the movie overview :  </strong> {item.overview}</p>
                    <p><strong>the movie vote average :  </strong> {item.vote_average}</p>
                    <p><strong>the movie original language :  </strong> {item.original_language}</p>
                    <img src={item.img} alt="this is " />
                    <br/>
                  </div>
                )
              }
              
            )
            }
          </div>
        </center>
      </div>
    );
  }
}

export default App;
