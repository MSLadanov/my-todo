import styled, { keyframes } from "styled-components";

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #000;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

function Loader() {
    return (
        <LoaderWrapper>
          <Spinner className="spinner"></Spinner>
          <p>Loading...</p>
        </LoaderWrapper>
      );
}

export default Loader