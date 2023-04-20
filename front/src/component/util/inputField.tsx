import React from "react";
import { Col, Form, Row } from "react-bootstrap";

interface InputFieldProps {
  controlId?: string;
  label?: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputField = ({
  controlId,
  label,
  value,
  placeholder,
  onChange,
}: InputFieldProps) => {
  return (
    <Form.Group className="mb-3" as={Row} controlId={controlId}>
      <Form.Label column md={3}>
        {label}
      </Form.Label>
      <Col md={9}>
        <Form.Control
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </Col>
    </Form.Group>
  );
};

export default InputField;
