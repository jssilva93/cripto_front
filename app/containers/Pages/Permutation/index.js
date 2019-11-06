import React from 'react';
import { PapperBlock } from 'dan-components';
import { TextField } from 'redux-form-material-ui';
import Autorenew from '@material-ui/icons/Autorenew';
import {
  Grid, Button, InputAdornment, IconButton, Input
} from '@material-ui/core';
class Permutation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.cipher = this.cipher.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }

  cipher() {
    console.log(this.state);
    return null;
  }

  generateKey() {
    console.log(this);
    return null;
  }

  handleEvent(evt) {
    const { value } = evt.target;
    this.setState({ [evt.target.name]: value });
  }

  render() {
    const { planeText, cipheredText, cipherKey } = this.state;
    return (
      <div>
        <PapperBlock title="Permutation" desc="">
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
                      onClick={this.handleEvent}
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
                multiline="true"
                rows="4"
                style={{ width: '100%' }}
                value={planeText}
              />
            </Grid>
            <Grid item xs={2} style={{ padding: '10px' }}>
              <Button onClick={this.cipher} style={{ width: '100%' }}>
                Cifrar
              </Button>
              <Button onClick={this.cipher} style={{ width: '100%' }}>
                Descifrar
              </Button>
              <Button onClick={this.cipher} style={{ width: '100%' }}>
                Análisis
              </Button>
            </Grid>
            <Grid item xs={5}>
              <TextField
                onChange={this.handleEvent}
                label="Cifrado"
                name="cipheredText"
                multiline="true"
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

export default Permutation;
