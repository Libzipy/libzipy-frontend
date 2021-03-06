import axios from 'axios'
import {
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
  BOOK_AUTHOR_DETAILS_REQUEST,
  BOOK_AUTHOR_DETAILS_SUCCESS,
  BOOK_AUTHOR_DETAILS_FAIL,
  BOOK_TYPE_DETAILS_REQUEST,
  BOOK_TYPE_DETAILS_SUCCESS,
  BOOK_TYPE_DETAILS_FAIL,
  BOOK_BORROW_REQUEST,
  BOOK_BORROW_SUCCESS,
  BOOK_BORROW_FAIL,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL
} from '../types'

// @desc user list actions
export const getBooksDetailsActions = ({ id }) => async (dispatch) => {
  try {
    dispatch({
      type: BOOK_DETAILS_REQUEST
    })

    const { data } = await axios
      .get(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/book/${id}`)
      .catch(function (error) {
        console.log(error)
      })

    dispatch({
      type: BOOK_DETAILS_SUCCESS,
      payload: data[0]
    })
  } catch (error) {
    dispatch({
      type: BOOK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const getBooksAuthorActions = ({ id }) => async (dispatch) => {
  try {
    dispatch({
      type: BOOK_AUTHOR_DETAILS_REQUEST
    })

    const { data } = await axios
      .get(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/author_book/${id}`)
      .catch(function (error) {
        console.log(error)
      })
    dispatch({
      type: BOOK_AUTHOR_DETAILS_SUCCESS,
      payload: data[0]
    })
  } catch (error) {
    dispatch({
      type: BOOK_AUTHOR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const getBooksTypeActions = ({ id }) => async (dispatch) => {
  try {
    dispatch({
      type: BOOK_TYPE_DETAILS_REQUEST
    })

    const { data } = await axios
      .get(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/type_book/${id}`)
      .catch(function (error) {
        console.log(error)
      })
    dispatch({
      type: BOOK_TYPE_DETAILS_SUCCESS,
      payload: data[0]
    })
  } catch (error) {
    dispatch({
      type: BOOK_TYPE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const borrowBookActions = (id, isbn) => async (dispatch) => {
  try {
    dispatch({
      type: BOOK_BORROW_REQUEST
    })

    const time_of_taken = new Date().toJSON().slice(0, 10).split('-').reverse().join('.')
    const time_of_given = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      .toJSON()
      .slice(0, 10)
      .split('-')
      .reverse()
      .join('.')

    const data = await axios
      .post(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/user_book`, {
        user_id: id,
        ISBN_id: isbn,
        time_of_taken,
        time_of_given
      })
      .catch(function (error) {
        console.log(error)
      })

    dispatch({
      type: BOOK_BORROW_SUCCESS,
      payload: data.data.message
    })
  } catch (error) {
    dispatch({
      type: BOOK_BORROW_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

// @desc user update actions
export const bookUpdateActions = (id, name, pages, issue, publicaction, type, author) => async (
  dispatch
) => {
  try {
    dispatch({
      type: BOOK_UPDATE_REQUEST
    })
    await axios
      .put(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/book/${id}`, {
        book_name: name,
        book_number_of_pages: pages,
        book_date_of_issue: issue,
        book_place_of_publication: publicaction,
        author_id: author,
        type_id: type
      })
      .catch(function (error) {
        console.log(error)
      })
    dispatch({
      type: BOOK_UPDATE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: BOOK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}
