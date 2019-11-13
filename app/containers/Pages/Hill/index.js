import React from 'react';
import { PapperBlock } from 'dan-components';
import { TextField } from 'redux-form-material-ui';
import { post, webUrlBase } from 'dan-api/request';
import {
  Grid, Button, Input, Select
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
class Hill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alphabetText: 0
    };
    this.handleFilterStatusChange = this.handleFilterStatusChange.bind(this);
    this.cipher = this.cipher.bind(this);
    this.descipher = this.descipher.bind(this);
    this.generateKey = this.generateKey.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }

  cipher() {
    const { planeText } = this.state;
    const { alphabetText } = this.state;
    const {
      cipherKey0, cipherKey1, cipherKey2, cipherKey3
    } = this.state;
    const cipherKey = [[cipherKey0, cipherKey1], [cipherKey2, cipherKey3]];
    const data = {
      query: planeText,
      alphabet: alphabetText,
      keyMatrix: Array.from(cipherKey)
    };
    post(webUrlBase + 'classics/HillCipher', data).then((json) => {
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
    };
    post(webUrlBase + 'classics/HillDescipher', data).then((json) => {
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
    };
    post(webUrlBase + 'classics/HillGeneratePassword', data).then((json) => {
      this.setState({
        cipherKey0: json.data.keyMatrix[0][0], cipherKey1: json.data.keyMatrix[0][1], cipherKey2: json.data.keyMatrix[1][0], cipherKey3: json.data.keyMatrix[1][1]
      });
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      this.setState({}, () => {
        console.log(error);
      });
    });
    return null;
  }

  handleFilterStatusChange(event) {
    this.setState({
      alphabetText: event.target.value
    });
  }

  handleEvent(evt) {
    const { value } = evt.target;
    this.setState({ [evt.target.name]: value });
  }

  render() {
    const {
      planeText, cipheredText, alphabetText, cipherKey0, cipherKey1, cipherKey2, cipherKey3
    } = this.state;
    return (
      <div>
        <PapperBlock title="Hill" desc="">
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <Select
                value={alphabetText}
                onChange={this.handleFilterStatusChange}
                displayEmpty
                name="age"
                style={{ width: '100%' }}
              >
                <MenuItem value={0}>
                  <em>Alfabeto por defecto (Inglés)</em>
                </MenuItem>
                <MenuItem value={1}>Alfabeto Español</MenuItem>
                <MenuItem value={2}>Ascii Extendido</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ marginTop: '10px' }}>
            <Grid container xs={5}>
              <Grid item xs={5}>
                <Input
                  name="cipherKey0"
                  type="number"
                  onChange={this.handleEvent}
                  value={cipherKey0}
                  placeholder="Clave[0]"
                />
              </Grid>
              <Grid item xs={5}>
                <Input
                  name="cipherKey1"
                  type="number"
                  onChange={this.handleEvent}
                  value={cipherKey1}
                  placeholder="Clave[1]"
                />
              </Grid>
              <Grid item xs={5}>
                <Input
                  name="cipherKey2"
                  type="number"
                  onChange={this.handleEvent}
                  value={cipherKey2}
                  placeholder="Clave[2]"
                />
              </Grid>
              <Grid item xs={5}>
                <Input
                  name="cipherKey3"
                  label="Clave[3]"
                  type="number"
                  onChange={this.handleEvent}
                  value={cipherKey3}
                  placeholder="Clave[3]"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <TextField
                name="planeText"
                onChange={this.handleEvent}
                label="Texto plano"
                multiline
                rows="4"
                style={{ width: '100%' }}
                value={planeText}
              />
            </Grid>
            <Grid item xs={2} style={{ padding: '10px' }}>
              <Button onClick={this.generateKey} style={{ width: '100%' }}>
                Generar clave
              </Button>
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
                multiline
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

export default Hill;
