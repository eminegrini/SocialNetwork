  
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ViewCard from './card'

const mapStateToProps = state => {
  return {
    user: state.navbar.user,
  }
}

const mapDispatchToProps = dispatch => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewCard))