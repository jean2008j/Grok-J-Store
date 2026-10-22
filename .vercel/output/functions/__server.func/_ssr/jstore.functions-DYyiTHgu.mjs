import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jstore.functions-DYyiTHgu.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listPublicProducts = createServerFn({ method: "GET" }).handler(createSsrRpc("f0a1740ba30207ee180f3443b0fe2f7d9ca8ca4e48c137f3f595cfb0eb205cec"));
var unlockPrivate = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("bfeec7e9bb083850ad321f27a56c7a9a9feae4a4fddd2ecf6d9eb99032ccd0c0"));
var placeOrder = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("fffaa5a3512e8caa5cf9e257b7f6a15b56842e62b66a71b5fe7b0a0d4df0dcf9"));
var verifyAdmin = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("c04db276f6217ebbe6bec794662bc8a72837e77ca03726451dfbaa5d205bbda2"));
var adminCall = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("c3011757cbb94dcd6090d4c4693276e97e1e6ff300998d4942f79d7b1a50b0e2"));
//#endregion
export { verifyAdmin as a, unlockPrivate as i, listPublicProducts as n, placeOrder as r, adminCall as t };
