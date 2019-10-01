  
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'


// // Actions:
import { loginUser, isLogged } from '../../redux/navbar/actions'


// //component
import NavBar from './navbar'

const mapStateToProps = state => {
  return {
    isLog: state.navbar.isLog,
    user: state.navbar.user,
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: bindActionCreators(loginUser, dispatch),
  isLogged: bindActionCreators(isLogged, dispatch),

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))