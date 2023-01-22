import styled from 'styled-components';

const SearchBox = ({ setSearchString }) => {
  return (
    <MainWrapper className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search user..."
        onChange={(e) => setSearchString(e.target.value)}
      />
      <span className="input-group-text"><i className="fas fa-search"></i></span>
    </MainWrapper>
  );
};

export default SearchBox;

const MainWrapper = styled.div`
  margin-bottom: 0.8rem;
`;
