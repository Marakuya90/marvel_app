import { Component } from "react";

import ErrorMessage from "../errorMessage/ErrorMessage";



class ErrorBoundary extends Component {

  state = {
    error: false
  }

  componentDidCatch(error, errorInfo) {
    this.state.error = true
    console.log(error, errorInfo)
  }

  render(){
    if (this.state.error) {
      return <ErrorMessage/>
    }
    return this.props.children
  }

}

export default ErrorBoundary