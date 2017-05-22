import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import $ from 'jquery'
import Unsplash, { toJson } from 'unsplash-js'
import { createLogger } from 'redux-logger'
import 'whatwg-fetch'


const unsplash = new Unsplash({
    applicationId: "3d92b451db7c3045d49c0b509f435713b53ac830dd82c3fe1025dbadf2a73d65",
    secret: "14efda20efc44ab9d7eaebd320d0e682b72b49bd0182b01ad4eb56f74f75c15e",
    callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});


const exampleInitialState = {
    data: null
};

export const actionTypes = {
    GET_IMAGES: 'GET_IMAGES',
    RESOLVED_GET_IMAGES: 'RESOLVED_GET_IMAGES'
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
    switch (action.type) {
        case actionTypes.GET_IMAGES:
            return action.data;
        case actionTypes.RESOLVED_GET_IMAGES:
            return action.images;
        default: return state
    }
};

// ACTIONS
export const getImages = (files) => {
    let objFormData = new FormData();
    objFormData.append('file', files);

    return $.ajax({
            url: 'http://192.168.0.15:8000/hook',
            type: 'POST',
            contentType: false,
            data: objFormData,
            processData: false,
            success: (data) => {
                console.log('vision', data);
                return data;
            }
        })
};

export const resolvedGetImages = (data) => {
    return unsplash.photos
        .searchPhotos(data)
        .then(toJson)
        .then((data) => {
            console.log('images', data);
            return data;
        });
};

export const initStore = (initialState = exampleInitialState) => {
    const loggerMiddleware = createLogger();

    return createStore(reducer, initialState, applyMiddleware(thunkMiddleware, loggerMiddleware))
};
