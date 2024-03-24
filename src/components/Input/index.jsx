import { Container } from "./styles";
// import PropTypes from "prop-types";

// Input.propTypes = {
//   icon: PropTypes.ReactElement
// };

export function Input({ icon: Icon, ...rest }) {
  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input {...rest} />
    </Container>
  );
}
