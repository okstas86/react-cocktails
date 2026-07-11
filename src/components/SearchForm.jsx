import Wrapper from "../assets/wrappers/SearchForm"
import {Form, useNavigation} from 'react-router-dom'

const SearchForm = ({ searchTerm }) => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form className="form">
        <input type="text" className="form-input" name="search" id="search" defaultValue={searchTerm} />
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'Searching...' : 'Search'}
        </button>
      </Form>
    </Wrapper>
  )
}
export default SearchForm