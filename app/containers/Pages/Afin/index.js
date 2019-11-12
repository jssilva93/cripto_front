import React from 'react';
import { PapperBlock } from 'dan-components';
import { TextField } from 'redux-form-material-ui';
import Autorenew from '@material-ui/icons/Autorenew';
import { post, webUrlBase } from 'dan-api/request';
import {
  Grid, Button, InputAdornment, IconButton, Input
} from '@material-ui/core';
class Afin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.cipher = this.cipher.bind(this);
    this.descipher = this.descipher.bind(this);
    this.generateKey = this.generateKey.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }

  cipher() {
    const { planeText } = this.state;
    const { alphabetText } = this.state;
    const { cipherKey } = this.state;
    const data = {
      query: planeText,
      alphabet: alphabetText,
      key: cipherKey
    }
    post(webUrlBase + 'classics/AfinCipher', data).then((json) => {
      this.setState({ cipheredText: json.data.reply });
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      this.setState({}, () => {
        console.log(error);
      });
    });
    return null;
  }

  descipher() {
    const { cipheredText } = this.state;
    const { alphabetText } = this.state;
    const { cipherKey } = this.state;
    const data = {
      query: cipheredText,
      alphabet: alphabetText,
      key: cipherKey
    }
    post(webUrlBase + 'classics/AfinDescipher', data).then((json) => {
      this.setState({ planeText: json.data.reply });
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      this.setState({}, () => {
        console.log(error);
      });
    });
    return null;
  }

  generateKey() {
    const { alphabetText } = this.state;
    const data = {
      alphabet: alphabetText,
    }
    post(webUrlBase + 'classics/AfinGeneratePassword', data).then((json) => {
      this.setState({ cipherKey: json.data.key });
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      this.setState({}, () => {
        console.log(error);
      });
    });
    return null;
  }

  handleEvent(evt) {
    const { value } = evt.target;
    this.setState({ [evt.target.name]: value });
  }

  render() {
    const { planeText, cipheredText, alphabetText, cipherKey } = this.state;
    return (
      <div>
        <PapperBlock title="Afin" desc="">
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <Input
                name="alphabetText"
                label="Alfabeto"
                type="text"
                onChange={this.handleEvent}
                style={{ width: '100%' }}
                value={alphabetText}
                placeholder="Alfabeto"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <Input
                name="cipherKey"
                label="Clave"
                type="text"
                onChange={this.handleEvent}
                style={{ width: '100%' }}
                value={cipherKey}
                placeholder="Clave"
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Refrescar contraseña"
                      onClick={this.generateKey}
                      onMouseDown={this.handleEvent}
                    >
                      <Autorenew />
                    </IconButton>
                  </InputAdornment>
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <TextField
                name="planeText"
                onChange={this.handleEvent}
                label="Texto plano"
                multiline={true}
                rows="4"
                style={{ width: '100%' }}
                value={planeText}
              />
            </Grid>
            <Grid item xs={2} style={{ padding: '10px' }}>
              <Button onClick={this.cipher} style={{ width: '100%' }}>
                Cifrar
              </Button>
              <Button onClick={this.descipher} style={{ width: '100%' }}>
                Descifrar
              </Button>
            </Grid>
            <Grid item xs={5}>
              <TextField
                onChange={this.handleEvent}
                label="Cifrado"
                name="cipheredText"
                multiline={true}
                rows="4"
                style={{ width: '100%' }}
                value={cipheredText}
              />
            </Grid>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}

export default Afin;
