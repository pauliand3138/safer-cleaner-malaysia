import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
   appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: '#228C22',
    fontFamily: 'Montserrat'
  },
  image: {
    marginLeft: '15px',
  }, 
}));