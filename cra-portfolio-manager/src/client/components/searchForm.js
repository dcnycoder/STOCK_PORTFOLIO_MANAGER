import React, {Component} from 'react'

export class SearchForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={() => {}}>
          <label>Please input zip code to search: </label>
          <input type="text" name="zipcode" />
          <input type="submit" value="SEARCH" />
        </form>
      </div>
    )
  }
}
