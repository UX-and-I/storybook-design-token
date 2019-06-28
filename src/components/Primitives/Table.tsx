import styled from '@emotion/styled';

export const Table = styled.table(() => ({
  borderCollapse: 'collapse',
  width: '100%',

  '& tr:first-of-type td': {
    paddingTop: '20px'
  },

  '& th': {
    borderBottom: '2px solid #aaa',
    padding: '12px 12px 8px',
    textAlign: 'left',

    '&:first-of-type': {
      paddingLeft: 0
    }
  },

  '& td': {
    padding: '12px',
    verticalAlign: 'top',

    '&:first-of-type': {
      paddingLeft: 0
    }
  }
}));
