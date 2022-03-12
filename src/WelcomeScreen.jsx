import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './WelcomeScreen.css';

function WelcomeScreen(props) {

  const logo = require('./logo_transparent.webp');

  return props.showWelcomeScreen ?
    (
      <div className='WelcomeScreen'>
        <Container>
          <img src='./logo_transparent.webp' alt='' />
          <Row>
            <Col className='welcome-card'>
              <Card bg='dark' style={{ width: '25rem' }}>
                <Card.Img className='welcome-card-img-top' variant='top' src={logo} />
                <Card.Body className='welcome-card-body'>
                  <Card.Title className='welcome-card-title'>meetFS</Card.Title>
                  <Card.Text className='welcome-card-text'>
                    Worldwide Events for Full-Stack Web Developers
                  </Card.Text>
                  <Button className='welcome-card-button' onClick={() => { props.getAccessToken() }} rel='nofollow noopener' variant='light'>Sign in with Google</Button>
                  <Card.Text className='welcome-card-text-small'>
                    <a
                      href='https://jkraemr.github.io/meet-app/privacy.html'
                      rel='nofollow noopener' target='_blank'
                    >
                      Privacy policy
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
    : null
}
export default WelcomeScreen;