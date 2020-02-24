import styled from '@emotion/styled';

export const Table = styled.table(() => ({
  borderCollapse: 'collapse',

  th: {
    borderBottom: '1px solid #dedede'
  },

  'tr:first-of-type td': {
    paddingTop: '12px'
  },

  'th, td': {
    paddingBottom: '8px',
    paddingTop: '8px',
    textAlign: 'left',
    verticalAlign: 'top',

    '&:not(:first-of-type)': {
      paddingLeft: '8px'
    },

    '&:not(:last-of-type)': {
      paddingRight: '8px'
    },

    '&:first-of-type': {
      fontWeight: 500
    },

    '&:last-of-type': {
      overflow: 'hidden',
      width: '148px'
    },

    '& > span': {
      display: 'block',
      fontSize: '10px',
      fontWeight: 400,
      marginTop: '4px'
    }
  }
}));
