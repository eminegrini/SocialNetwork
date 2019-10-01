  import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'


// // Actions:
import { isLogged } from '../../redux/navbar/actions'


// //component
import ProfileMenu from './profilemenu'

const mapStateToProps = state => {
  return {
    isLogged: state.navbar.isLogged,
  }
}

const mapDispatchToProps = dispatch => ({
  isLogged: bindActionCreators(isLogged, dispatch),

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileMenu))