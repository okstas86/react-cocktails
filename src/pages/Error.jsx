import Wrapper from "../assets/wrappers/ErrorPage"
import { Link, useRouteError } from "react-router-dom"
import img from '../assets/not-found.svg'

const Error = () => {
  const error = useRouteError()
 

  if (error.status === 404) {
    return (
      <Wrapper>
        <div className="error">
          <img src={img} alt="not found" />
          <h3>Page not found</h3>
          <p>The page you are looking for does not exist.</p>
          <Link to="/">Back Home</Link>
        </div>
      </Wrapper>
    )
  }
  
  return (
    <Wrapper>
      <div>Something went wrong</div>
    </Wrapper>
  )
}
export default Error