import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Config from '../config/config.en.json'

export default (props) => {
  return <Grid fluid className="stretch"><Row className="stretch">
    {Config.locations.map((location) =>
      <Col className="location" key={location.id} span={2}  xs={2} md={2}
           style={{ backgroundImage: `url(img/locations/${location.id}.jpg)` }}>
        <div>
          <h3>
          {location.name}
          </h3>
        </div>
      </Col>
    )}
  </Row>
  </Grid>
}