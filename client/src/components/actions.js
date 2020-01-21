import "regenerator-runtime/runtime";

import { GetApiCall, PostApiCall, FilePostApiCall } from "./api";
import * as types from "./ActionTypes";

const windowGlobal = typeof window !== "undefined" && window;

export function clearAddStatus() {
  return { type: types.CLEAR };
}

// get random
function requestRandom() {
  return { type: types.REQUEST_RANDOM };
}

function recvRandom(results) {
  return { type: types.REQUEST_RANDOM_SUCCESS, results };
}

function failedRecvRandom() {
  return { type: types.REQUEST_RANDOM_FAILURE };
}

export function searchRandom() {
  return async (dispatch, getState) => {
    dispatch(requestRandom());

    const query = `g.Vertex()
  .Has("<http://xmlns.com/foaf/0.1/name>")
  .Out("<http://xmlns.com/foaf/0.1/name>")
  .getLimit(10)`;

    try {
      const results = await PostApiCall(`/api/v1/query/gizmo`, query);
      dispatch(recvRandom(results));
    } catch (e) {
      dispatch(failedRecvRandom());
    }
  };
}


function reqFromLoc() {
  return { type: types.REQUEST_FROM_LOC };
}

function reqFromLocSuccess(results) {
  return { type: types.REQUEST_FROM_LOC_SUCCESS, results };
}

function failedReqLoc() {
  return { type: types.REQUEST_FROM_LOC_FAILURE };
}

function setLoc(locId){
    return {type: types.SET_LOCATION, locId}
}

export function clearLoc(){
    return {type: types.CLEAR_LOC}
}

export function getFromLocation(locId) {
  return async (dispatch, getState) => {
    dispatch(reqFromLoc());

    const query = `g.Vertex('${locId}').In(g.V(), "edge").Out("<http://xmlns.com/foaf/0.1/name>").All()`;

    try {
      const results = await PostApiCall(`/api/v1/query/gizmo`, query);
      dispatch(setLoc(locId));
      dispatch(reqFromLocSuccess(results));
    } catch (e) {
      dispatch(failedReqLoc());
    }
  };
}


// Add Single entity
function requestAddSingleTuple() {
  return { type: types.REQUEST_ADD_TUPLE };
}

function recvAddSingleTuple() {
  return { type: types.REQUEST_ADD_TUPLE_SUCCESS };
}

function failedRecvAddSingleTuple() {
  return { type: types.REQUEST_ADD_TUPLE_FAILURE };
}

export function addSingleTuple(details) {
  return async (dispatch, getState) => {
    let triple = [details];
    triple = JSON.stringify(triple);

    dispatch(requestAddSingleTuple());

    try {
      const res = await PostApiCall(`/api/v1/write`, triple);
      if (res.success) {
        dispatch(recvAddSingleTuple());
      } else {
        dispatch(failedRecvAddSingleTuple(res.error));
      }
    } catch (e) {
      dispatch(failedRecvAddSingleTuple());
    }
  };
}

// Bulk Add entities
function requestBulkAddeTuple() {
  return { type: types.REQUEST_BULK_ADD_TUPLE };
}

function recvBulkAddSingleTuple() {
  return { type: types.REQUEST_BULK_ADD_TUPLE_SUCCESS };
}

function failedRecvBulkAddSingleTuple() {
  return { type: types.REQUEST_BULK_ADD_TUPLE_FAILURE };
}

export function bulkAddSingleTuple(file, cb) {
  return async (dispatch, getState) => {
    dispatch(requestBulkAddeTuple());

    try {
      const res = await FilePostApiCall(`/api/v1/write/file/nquad`, file);

      if (res.success) {
        dispatch(recvBulkAddSingleTuple());
        dispatch(searchRandom());
      } else {
        dispatch(failedRecvBulkAddSingleTuple());
      }
      cb();
    } catch (e) {
      console.log(e);
      dispatch(failedRecvBulkAddSingleTuple());
    }
  };
}

// Search entities
function requestSearchTuple() {
  return { type: types.REQUEST_SEARCH_ENTITY };
}

function recvSearchTuple(results) {
  return { type: types.REQUEST_SEARCH_ENTITY_SUCCESS, results };
}

function failedRecvSearcheTuple() {
  return { type: types.REQUEST_SEARCH_ENTITY_FAILURE };
}

export function changeSearch(text) {
  return { type: types.CHANGE_SEARCH_TEXT, text };
}

export function searchTriple(entityName) {
  return async (dispatch, getState) => {
    dispatch(requestSearchTuple());
    let name = entityName.replace(/'/g, "\\'");

    const query = `g.Vertex('"${name}"@en').In("<http://xmlns.com/foaf/0.1/name>").Out(g.V(), "edge").All()`;

    try {
      const results = await PostApiCall(`/api/v1/query/gizmo`, query);
      dispatch(recvSearchTuple(results));
    } catch (e) {
      console.log(e);
      dispatch(failedRecvSearcheTuple());
    }
  };
}



