import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//#region axios
import axios from 'axios';
//#endregion
//#region 引入createStore
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
//#endregion
import thunk from 'redux-thunk'
//#region redux中的三个重要的部分： action reducer state(store)
const counterReducer = function(state = { count: 1 }, action) {
	// 输出一个action
	console.log(action);
	switch (action.type) {
		case "COUND_ADD":
			return { ...state, count: state.count + 1 };
		case "COUNT_REDUCE":
			return { ...state, count: state.count - 1 };
		default:
			return state;
	}
};

const postReducer = function (state = { list:[{title:'hhahah'}] }, action) {
	switch (action.type) {
		case 'LOAD_POSTS':
			return {
				...state, list: action.payload
			}
		default:
			return	state;
	}
}

// 通过 combineReducers 把多个reducer进行合并
const rootReducers = combineReducers({
	counter: counterReducer,
	post: postReducer
})

const store = createStore(
	rootReducers,
	// 中间件的配置，异步网络请求所需
	compose(
		applyMiddleware(...[thunk]),  // 需要使用的中间件数组
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	),
); // 创建一个store
console.log(store, `store`);
console.log(store.getState(), `getState`);
//	如果要改变一个值需要通过dispatch 派发一个action
//	action 需要两个参数，
//	type		通过type区分是对state做神马操作
//	payload	传递的数据

store.dispatch({
	type: "COUND_ADD",
	payload: {}
});
console.log(store, `store`);
console.log(store.getState(), `getState`);
store.dispatch({
	type: "COUND_ADD",
	payload: {}
});
console.log(store, `store`);
console.log(store.getState(), `getState`);
//#endregion
//#endregion
store.dispatch({
	type: "COUNT_REDUCE",
	payload: {}
});
console.log(store, `store`);
console.log(store.getState(), `getState`);
//#endregion
const getPostRequest =  ()=> {
	return axios.get('https://jsonplaceholder.typicode.com/posts')
}
store.dispatch(async function (dispatch) {
	const res = await getPostRequest();
	console.log(res.data);
	dispatch({
		type:'LOAD_POSTS',
		payload: res.data
	})
	
})
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// 入口文件
//#region 你不知道的代码

//#endregion
