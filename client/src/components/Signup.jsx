import React from 'react';
import { FormGroup, Button, Radio, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const FieldGroup = ({ id, label, help, ...props }) => (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
);

const Signup = (props) => (
  <form>
    <h3>props.username</h3>
    
    <FieldGroup
      id="formControlsAge"
      type="age"
      label="Age"
      placeholder="Enter Age"
    />

    <FormGroup>
      <ControlLabel>Gender</ControlLabel>
      <Radio name="gender" inline>
        Male
      </Radio>{' '}
      <Radio name="gender" inline>
        Female
      </Radio>{' '}
    </FormGroup>

    <FieldGroup
      id="formControlsHeight"
      type="height"
      label="Height"
      placeholder="Enter height"
    />

    <FieldGroup
      id="formControlsWeight"
      type="weight"
      label="Weight"
      placeholder="Enter weight"
    />

    <Button type="submit">Submit</Button>
  </form>
);

export default Signup;