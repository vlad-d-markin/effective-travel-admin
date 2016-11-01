import React from 'react';
import { Button, FormGroup, FormControl, Table, ListGroup, ListGroupItem} from 'react-bootstrap';


export default class Stations extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      stations : this.props.route.resource,
      stationsList : [],
      newStation : {
        title : ''
      }
    };
  }
  
  update() {
    this.state.stations.get().then(function(resp) {   
      if(resp.success) {
        this.setState({stationsList : resp.stations});
      }
      else {
        this.setState({stationsList : [] });
        console.log('Failed to update stations list');
      }
    }.bind(this));
  }
  
  render() {
    this.update();
    
    var stationTableItems = this.state.stationsList.map(function(station, idx){
      return(
        <tr key={idx}>
          <td>{idx}</td>
          <td>{station.title}</td>
          <td>{station.s_id}</td>
          <td>not yet</td>
        </tr>
      );
    });
    
    return (
       <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>S_ID</th>
              <th>Coordinates</th>
            </tr>
          </thead>
          <tbody>
            {stationTableItems}
          </tbody>
       </Table>
      
      <form>
        <FormGroup controlId="newStationTitle">
          <ControlLabel>Title: </ControlLabel>
          <FormControl
            type="text"
            value={this.newStation.title};
            placeholder="Enter new station title"
            onChange={this.handleTitleChange}></FormControl>
        </FormGroup>
        

      </form>
    );
  }
  
  submitNewStation() {
    console.log('New station ' + this.state.newStation);
  }
  
  handleTitleChange(e) {
    this.setState({ newStation.title : e.target.value });
  }
}