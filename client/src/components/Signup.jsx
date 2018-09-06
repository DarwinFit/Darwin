import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

const Signup = (props) => (
  <form>
    <FormGroup
      controlId="formBasicText"
      validationState={this.getValidationState()}
    >
      <ControlLabel>Working example with validation</ControlLabel>
      <FormControl
        type="text"
        value={this.state.value}
        placeholder="Enter text"
        onChange={this.handleChange}
      />
      <FormControl.Feedback />
      <HelpBlock>Validation is based on string length.</HelpBlock>
    </FormGroup>
  </form>
)

export default Signup;