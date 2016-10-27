import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col} from 'react-bootstrap';

import Menu from './menu.jsx';


class App extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}><h1>Effective travel <small>developer tools</small></h1></Col>
        </Row>
        
        <Row>
          <Col md={2}>
            <Menu/>
          </Col>
          
          <Col md={10}>
            Controls are here
          </Col>
        </Row>
      </Grid>
      );
  }
}

ReactDOM.render(<App/>, document.body);