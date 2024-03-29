  
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'


// // Actions:

import {isLogged} from '../../redux/navbar/actions'
// //component
import Wall from './wall'

const mapStateToProps = state => {
  return {
    user: state.navbar.user,
  }
}

const mapDispatchToProps = dispatch => ({
  isLogged: bindActionCreators(isLogged, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wall))