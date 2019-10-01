  
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'


// // Actions:
import { loginUser, loginError, isLogged } from '../../redux/navbar/actions'


// //component
import Login from './login'

const mapStateToProps = state => {
  return {
    user: state.navbar.user,
    error: state.navbar.error,
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: bindActionCreators(loginUser, dispatch),
  loginError: bindActionCreators(loginError, dispatch),
  isLogged: bindActionCreators(isLogged,dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))