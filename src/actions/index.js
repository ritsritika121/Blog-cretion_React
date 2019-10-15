import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const FetchPostsAndUsers = () => async (dispatch, getState) => {
        await dispatch(FetchPosts())

        // const userId = _.uniq(_.map(getState().posts, 'userId'))
        // console.log(userId);

        // userId.forEach(id => dispatch(FetchUser(id)));

        _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(FetchUser(id)))
        .value();
};

export const FetchPosts = () => async (dispatch) => {
        const response = await jsonPlaceholder.get('/posts');
        dispatch({ type: 'FETCH_POST', payload: response.data })
};


export const FetchUser = (id) => async (dispatch) => {
        const response = await jsonPlaceholder.get(`/users/${id}`);
        dispatch({ type: 'FETCH_USER', payload: response.data })
};


// export const FetchUser = (id) =>  (dispatch) => _fetchUser(id, dispatch);

// const _fetchUser = _.memoize(async (id, dispatch) => {
//         const response = await jsonPlaceholder.get(`/users/${id}`);

//         dispatch({type:'FETCH_USER', payload:response.data})
// });
