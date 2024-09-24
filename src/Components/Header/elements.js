import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  height: 75px;
  border-bottom: 1px solid #b7c8da;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.5);
  transform: box-shadow 0.15s ease 0.1;
  position: fixed;
  background-color: #a2c617;
  color: white;
`;
export const HeaderCustomTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-right: ${props => (props.mr ? props.mr : 0)};
`;

export const HeaderCustomTitle = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 1.4rem;
  color:#72310C;
`;
