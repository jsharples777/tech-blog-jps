/** *** */ (function (modules) { // webpackBootstrap
/** *** */ 	// install a JSONP callback for chunk loading
/** *** */ 	function webpackJsonpCallback(data) {
    /** *** */ 		const chunkIds = data[0];
    /** *** */ 		const moreModules = data[1];
    /** *** */ 		const executeModules = data[2];
    /** *** */
    /** *** */ 		// add "moreModules" to the modules object,
    /** *** */ 		// then flag all "chunkIds" as loaded and fire callback
    /** *** */ 		let moduleId; let chunkId; let i = 0; const
      resolves = [];
    /** *** */ 		for (;i < chunkIds.length; i++) {
      /** *** */ 			chunkId = chunkIds[i];
      /** *** */ 			if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
        /** *** */ 				resolves.push(installedChunks[chunkId][0]);
        /** *** */ 			}
      /** *** */ 			installedChunks[chunkId] = 0;
      /** *** */ 		}
    /** *** */ 		for (moduleId in moreModules) {
      /** *** */ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        /** *** */ 				modules[moduleId] = moreModules[moduleId];
        /** *** */ 			}
      /** *** */ 		}
    /** *** */ 		if (parentJsonpFunction) parentJsonpFunction(data);
    /** *** */
    /** *** */ 		while (resolves.length) {
      /** *** */ 			resolves.shift()();
      /** *** */ 		}
    /** *** */
    /** *** */ 		// add entry modules from loaded chunk to deferred list
    /** *** */ 		deferredModules.push.apply(deferredModules, executeModules || []);
    /** *** */
    /** *** */ 		// run deferred modules when all chunks ready
    /** *** */ 		return checkDeferredModules();
    /** *** */ 	}
  /** *** */ 	function checkDeferredModules() {
    /** *** */ 		let result;
    /** *** */ 		for (let i = 0; i < deferredModules.length; i++) {
      /** *** */ 			const deferredModule = deferredModules[i];
      /** *** */ 			let fulfilled = true;
      /** *** */ 			for (let j = 1; j < deferredModule.length; j++) {
        /** *** */ 				const depId = deferredModule[j];
        /** *** */ 				if (installedChunks[depId] !== 0) fulfilled = false;
        /** *** */ 			}
      /** *** */ 			if (fulfilled) {
        /** *** */ 				deferredModules.splice(i--, 1);
        /** *** */ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
        /** *** */ 			}
      /** *** */ 		}
    /** *** */
    /** *** */ 		return result;
    /** *** */ 	}
  /** *** */
  /** *** */ 	// The module cache
  /** *** */ 	const installedModules = {};
  /** *** */
  /** *** */ 	// object to store loaded and loading chunks
  /** *** */ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
  /** *** */ 	// Promise = chunk loading, 0 = chunk loaded
  /** *** */ 	var installedChunks = {
    /** *** */ 		app: 0,
    /** *** */ 	};
  /** *** */
  /** *** */ 	var deferredModules = [];
  /** *** */
  /** *** */ 	// The require function
  /** *** */ 	function __webpack_require__(moduleId) {
    /** *** */
    /** *** */ 		// Check if module is in cache
    /** *** */ 		if (installedModules[moduleId]) {
      /** *** */ 			return installedModules[moduleId].exports;
      /** *** */ 		}
    /** *** */ 		// Create a new module (and put it into the cache)
    /** *** */ 		const module = installedModules[moduleId] = {
      /** *** */ 			i: moduleId,
      /** *** */ 			l: false,
      /** *** */ 			exports: {},
      /** *** */ 		};
    /** *** */
    /** *** */ 		// Execute the module function
    /** *** */ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /** *** */
    /** *** */ 		// Flag the module as loaded
    /** *** */ 		module.l = true;
    /** *** */
    /** *** */ 		// Return the exports of the module
    /** *** */ 		return module.exports;
    /** *** */ 	}
  /** *** */
  /** *** */
  /** *** */ 	// expose the modules object (__webpack_modules__)
  /** *** */ 	__webpack_require__.m = modules;
  /** *** */
  /** *** */ 	// expose the module cache
  /** *** */ 	__webpack_require__.c = installedModules;
  /** *** */
  /** *** */ 	// define getter function for harmony exports
  /** *** */ 	__webpack_require__.d = function (exports, name, getter) {
    /** *** */ 		if (!__webpack_require__.o(exports, name)) {
      /** *** */ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /** *** */ 		}
    /** *** */ 	};
  /** *** */
  /** *** */ 	// define __esModule on exports
  /** *** */ 	__webpack_require__.r = function (exports) {
    /** *** */ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /** *** */ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      /** *** */ 		}
    /** *** */ 		Object.defineProperty(exports, '__esModule', { value: true });
    /** *** */ 	};
  /** *** */
  /** *** */ 	// create a fake namespace object
  /** *** */ 	// mode & 1: value is a module id, require it
  /** *** */ 	// mode & 2: merge all properties of value into the ns
  /** *** */ 	// mode & 4: return value when already ns object
  /** *** */ 	// mode & 8|1: behave like require
  /** *** */ 	__webpack_require__.t = function (value, mode) {
    /** *** */ 		if (mode & 1) value = __webpack_require__(value);
    /** *** */ 		if (mode & 8) return value;
    /** *** */ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    /** *** */ 		const ns = Object.create(null);
    /** *** */ 		__webpack_require__.r(ns);
    /** *** */ 		Object.defineProperty(ns, 'default', { enumerable: true, value });
    /** *** */ 		if (mode & 2 && typeof value !== 'string') for (const key in value) __webpack_require__.d(ns, key, (key => value[key]).bind(null, key));
    /** *** */ 		return ns;
    /** *** */ 	};
  /** *** */
  /** *** */ 	// getDefaultExport function for compatibility with non-harmony modules
  /** *** */ 	__webpack_require__.n = function (module) {
    /** *** */ 		const getter = module && module.__esModule
    /** *** */ 			? function getDefault() { return module.default; }
    /** *** */ 			: function getModuleExports() { return module; };
    /** *** */ 		__webpack_require__.d(getter, 'a', getter);
    /** *** */ 		return getter;
    /** *** */ 	};
  /** *** */
  /** *** */ 	// Object.prototype.hasOwnProperty.call
  /** *** */ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  /** *** */
  /** *** */ 	// __webpack_public_path__
  /** *** */ 	__webpack_require__.p = '';
  /** *** */
  /** *** */ 	let jsonpArray = window.webpackJsonp = window.webpackJsonp || [];
  /** *** */ 	const oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  /** *** */ 	jsonpArray.push = webpackJsonpCallback;
  /** *** */ 	jsonpArray = jsonpArray.slice();
  /** *** */ 	for (let i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  /** *** */ 	var parentJsonpFunction = oldJsonpFunction;
  /** *** */
  /** *** */
  /** *** */ 	// add entry module to deferred list
  /** *** */ 	deferredModules.push([0, 'vendor']);
  /** *** */ 	// run deferred modules when ready
  /** *** */ 	return checkDeferredModules();
/** *** */ }({

  /** */ './node_modules/moment/locale sync recursive ^\\.\\/.*$':
  /*! **************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \************************************************* */
  /*! no static exports found */
  /** */ (function (module, exports, __webpack_require__) {
    const map = {
      './af': './node_modules/moment/locale/af.js',
      './af.js': './node_modules/moment/locale/af.js',
      './ar': './node_modules/moment/locale/ar.js',
      './ar-dz': './node_modules/moment/locale/ar-dz.js',
      './ar-dz.js': './node_modules/moment/locale/ar-dz.js',
      './ar-kw': './node_modules/moment/locale/ar-kw.js',
      './ar-kw.js': './node_modules/moment/locale/ar-kw.js',
      './ar-ly': './node_modules/moment/locale/ar-ly.js',
      './ar-ly.js': './node_modules/moment/locale/ar-ly.js',
      './ar-ma': './node_modules/moment/locale/ar-ma.js',
      './ar-ma.js': './node_modules/moment/locale/ar-ma.js',
      './ar-sa': './node_modules/moment/locale/ar-sa.js',
      './ar-sa.js': './node_modules/moment/locale/ar-sa.js',
      './ar-tn': './node_modules/moment/locale/ar-tn.js',
      './ar-tn.js': './node_modules/moment/locale/ar-tn.js',
      './ar.js': './node_modules/moment/locale/ar.js',
      './az': './node_modules/moment/locale/az.js',
      './az.js': './node_modules/moment/locale/az.js',
      './be': './node_modules/moment/locale/be.js',
      './be.js': './node_modules/moment/locale/be.js',
      './bg': './node_modules/moment/locale/bg.js',
      './bg.js': './node_modules/moment/locale/bg.js',
      './bm': './node_modules/moment/locale/bm.js',
      './bm.js': './node_modules/moment/locale/bm.js',
      './bn': './node_modules/moment/locale/bn.js',
      './bn-bd': './node_modules/moment/locale/bn-bd.js',
      './bn-bd.js': './node_modules/moment/locale/bn-bd.js',
      './bn.js': './node_modules/moment/locale/bn.js',
      './bo': './node_modules/moment/locale/bo.js',
      './bo.js': './node_modules/moment/locale/bo.js',
      './br': './node_modules/moment/locale/br.js',
      './br.js': './node_modules/moment/locale/br.js',
      './bs': './node_modules/moment/locale/bs.js',
      './bs.js': './node_modules/moment/locale/bs.js',
      './ca': './node_modules/moment/locale/ca.js',
      './ca.js': './node_modules/moment/locale/ca.js',
      './cs': './node_modules/moment/locale/cs.js',
      './cs.js': './node_modules/moment/locale/cs.js',
      './cv': './node_modules/moment/locale/cv.js',
      './cv.js': './node_modules/moment/locale/cv.js',
      './cy': './node_modules/moment/locale/cy.js',
      './cy.js': './node_modules/moment/locale/cy.js',
      './da': './node_modules/moment/locale/da.js',
      './da.js': './node_modules/moment/locale/da.js',
      './de': './node_modules/moment/locale/de.js',
      './de-at': './node_modules/moment/locale/de-at.js',
      './de-at.js': './node_modules/moment/locale/de-at.js',
      './de-ch': './node_modules/moment/locale/de-ch.js',
      './de-ch.js': './node_modules/moment/locale/de-ch.js',
      './de.js': './node_modules/moment/locale/de.js',
      './dv': './node_modules/moment/locale/dv.js',
      './dv.js': './node_modules/moment/locale/dv.js',
      './el': './node_modules/moment/locale/el.js',
      './el.js': './node_modules/moment/locale/el.js',
      './en-au': './node_modules/moment/locale/en-au.js',
      './en-au.js': './node_modules/moment/locale/en-au.js',
      './en-ca': './node_modules/moment/locale/en-ca.js',
      './en-ca.js': './node_modules/moment/locale/en-ca.js',
      './en-gb': './node_modules/moment/locale/en-gb.js',
      './en-gb.js': './node_modules/moment/locale/en-gb.js',
      './en-ie': './node_modules/moment/locale/en-ie.js',
      './en-ie.js': './node_modules/moment/locale/en-ie.js',
      './en-il': './node_modules/moment/locale/en-il.js',
      './en-il.js': './node_modules/moment/locale/en-il.js',
      './en-in': './node_modules/moment/locale/en-in.js',
      './en-in.js': './node_modules/moment/locale/en-in.js',
      './en-nz': './node_modules/moment/locale/en-nz.js',
      './en-nz.js': './node_modules/moment/locale/en-nz.js',
      './en-sg': './node_modules/moment/locale/en-sg.js',
      './en-sg.js': './node_modules/moment/locale/en-sg.js',
      './eo': './node_modules/moment/locale/eo.js',
      './eo.js': './node_modules/moment/locale/eo.js',
      './es': './node_modules/moment/locale/es.js',
      './es-do': './node_modules/moment/locale/es-do.js',
      './es-do.js': './node_modules/moment/locale/es-do.js',
      './es-mx': './node_modules/moment/locale/es-mx.js',
      './es-mx.js': './node_modules/moment/locale/es-mx.js',
      './es-us': './node_modules/moment/locale/es-us.js',
      './es-us.js': './node_modules/moment/locale/es-us.js',
      './es.js': './node_modules/moment/locale/es.js',
      './et': './node_modules/moment/locale/et.js',
      './et.js': './node_modules/moment/locale/et.js',
      './eu': './node_modules/moment/locale/eu.js',
      './eu.js': './node_modules/moment/locale/eu.js',
      './fa': './node_modules/moment/locale/fa.js',
      './fa.js': './node_modules/moment/locale/fa.js',
      './fi': './node_modules/moment/locale/fi.js',
      './fi.js': './node_modules/moment/locale/fi.js',
      './fil': './node_modules/moment/locale/fil.js',
      './fil.js': './node_modules/moment/locale/fil.js',
      './fo': './node_modules/moment/locale/fo.js',
      './fo.js': './node_modules/moment/locale/fo.js',
      './fr': './node_modules/moment/locale/fr.js',
      './fr-ca': './node_modules/moment/locale/fr-ca.js',
      './fr-ca.js': './node_modules/moment/locale/fr-ca.js',
      './fr-ch': './node_modules/moment/locale/fr-ch.js',
      './fr-ch.js': './node_modules/moment/locale/fr-ch.js',
      './fr.js': './node_modules/moment/locale/fr.js',
      './fy': './node_modules/moment/locale/fy.js',
      './fy.js': './node_modules/moment/locale/fy.js',
      './ga': './node_modules/moment/locale/ga.js',
      './ga.js': './node_modules/moment/locale/ga.js',
      './gd': './node_modules/moment/locale/gd.js',
      './gd.js': './node_modules/moment/locale/gd.js',
      './gl': './node_modules/moment/locale/gl.js',
      './gl.js': './node_modules/moment/locale/gl.js',
      './gom-deva': './node_modules/moment/locale/gom-deva.js',
      './gom-deva.js': './node_modules/moment/locale/gom-deva.js',
      './gom-latn': './node_modules/moment/locale/gom-latn.js',
      './gom-latn.js': './node_modules/moment/locale/gom-latn.js',
      './gu': './node_modules/moment/locale/gu.js',
      './gu.js': './node_modules/moment/locale/gu.js',
      './he': './node_modules/moment/locale/he.js',
      './he.js': './node_modules/moment/locale/he.js',
      './hi': './node_modules/moment/locale/hi.js',
      './hi.js': './node_modules/moment/locale/hi.js',
      './hr': './node_modules/moment/locale/hr.js',
      './hr.js': './node_modules/moment/locale/hr.js',
      './hu': './node_modules/moment/locale/hu.js',
      './hu.js': './node_modules/moment/locale/hu.js',
      './hy-am': './node_modules/moment/locale/hy-am.js',
      './hy-am.js': './node_modules/moment/locale/hy-am.js',
      './id': './node_modules/moment/locale/id.js',
      './id.js': './node_modules/moment/locale/id.js',
      './is': './node_modules/moment/locale/is.js',
      './is.js': './node_modules/moment/locale/is.js',
      './it': './node_modules/moment/locale/it.js',
      './it-ch': './node_modules/moment/locale/it-ch.js',
      './it-ch.js': './node_modules/moment/locale/it-ch.js',
      './it.js': './node_modules/moment/locale/it.js',
      './ja': './node_modules/moment/locale/ja.js',
      './ja.js': './node_modules/moment/locale/ja.js',
      './jv': './node_modules/moment/locale/jv.js',
      './jv.js': './node_modules/moment/locale/jv.js',
      './ka': './node_modules/moment/locale/ka.js',
      './ka.js': './node_modules/moment/locale/ka.js',
      './kk': './node_modules/moment/locale/kk.js',
      './kk.js': './node_modules/moment/locale/kk.js',
      './km': './node_modules/moment/locale/km.js',
      './km.js': './node_modules/moment/locale/km.js',
      './kn': './node_modules/moment/locale/kn.js',
      './kn.js': './node_modules/moment/locale/kn.js',
      './ko': './node_modules/moment/locale/ko.js',
      './ko.js': './node_modules/moment/locale/ko.js',
      './ku': './node_modules/moment/locale/ku.js',
      './ku.js': './node_modules/moment/locale/ku.js',
      './ky': './node_modules/moment/locale/ky.js',
      './ky.js': './node_modules/moment/locale/ky.js',
      './lb': './node_modules/moment/locale/lb.js',
      './lb.js': './node_modules/moment/locale/lb.js',
      './lo': './node_modules/moment/locale/lo.js',
      './lo.js': './node_modules/moment/locale/lo.js',
      './lt': './node_modules/moment/locale/lt.js',
      './lt.js': './node_modules/moment/locale/lt.js',
      './lv': './node_modules/moment/locale/lv.js',
      './lv.js': './node_modules/moment/locale/lv.js',
      './me': './node_modules/moment/locale/me.js',
      './me.js': './node_modules/moment/locale/me.js',
      './mi': './node_modules/moment/locale/mi.js',
      './mi.js': './node_modules/moment/locale/mi.js',
      './mk': './node_modules/moment/locale/mk.js',
      './mk.js': './node_modules/moment/locale/mk.js',
      './ml': './node_modules/moment/locale/ml.js',
      './ml.js': './node_modules/moment/locale/ml.js',
      './mn': './node_modules/moment/locale/mn.js',
      './mn.js': './node_modules/moment/locale/mn.js',
      './mr': './node_modules/moment/locale/mr.js',
      './mr.js': './node_modules/moment/locale/mr.js',
      './ms': './node_modules/moment/locale/ms.js',
      './ms-my': './node_modules/moment/locale/ms-my.js',
      './ms-my.js': './node_modules/moment/locale/ms-my.js',
      './ms.js': './node_modules/moment/locale/ms.js',
      './mt': './node_modules/moment/locale/mt.js',
      './mt.js': './node_modules/moment/locale/mt.js',
      './my': './node_modules/moment/locale/my.js',
      './my.js': './node_modules/moment/locale/my.js',
      './nb': './node_modules/moment/locale/nb.js',
      './nb.js': './node_modules/moment/locale/nb.js',
      './ne': './node_modules/moment/locale/ne.js',
      './ne.js': './node_modules/moment/locale/ne.js',
      './nl': './node_modules/moment/locale/nl.js',
      './nl-be': './node_modules/moment/locale/nl-be.js',
      './nl-be.js': './node_modules/moment/locale/nl-be.js',
      './nl.js': './node_modules/moment/locale/nl.js',
      './nn': './node_modules/moment/locale/nn.js',
      './nn.js': './node_modules/moment/locale/nn.js',
      './oc-lnc': './node_modules/moment/locale/oc-lnc.js',
      './oc-lnc.js': './node_modules/moment/locale/oc-lnc.js',
      './pa-in': './node_modules/moment/locale/pa-in.js',
      './pa-in.js': './node_modules/moment/locale/pa-in.js',
      './pl': './node_modules/moment/locale/pl.js',
      './pl.js': './node_modules/moment/locale/pl.js',
      './pt': './node_modules/moment/locale/pt.js',
      './pt-br': './node_modules/moment/locale/pt-br.js',
      './pt-br.js': './node_modules/moment/locale/pt-br.js',
      './pt.js': './node_modules/moment/locale/pt.js',
      './ro': './node_modules/moment/locale/ro.js',
      './ro.js': './node_modules/moment/locale/ro.js',
      './ru': './node_modules/moment/locale/ru.js',
      './ru.js': './node_modules/moment/locale/ru.js',
      './sd': './node_modules/moment/locale/sd.js',
      './sd.js': './node_modules/moment/locale/sd.js',
      './se': './node_modules/moment/locale/se.js',
      './se.js': './node_modules/moment/locale/se.js',
      './si': './node_modules/moment/locale/si.js',
      './si.js': './node_modules/moment/locale/si.js',
      './sk': './node_modules/moment/locale/sk.js',
      './sk.js': './node_modules/moment/locale/sk.js',
      './sl': './node_modules/moment/locale/sl.js',
      './sl.js': './node_modules/moment/locale/sl.js',
      './sq': './node_modules/moment/locale/sq.js',
      './sq.js': './node_modules/moment/locale/sq.js',
      './sr': './node_modules/moment/locale/sr.js',
      './sr-cyrl': './node_modules/moment/locale/sr-cyrl.js',
      './sr-cyrl.js': './node_modules/moment/locale/sr-cyrl.js',
      './sr.js': './node_modules/moment/locale/sr.js',
      './ss': './node_modules/moment/locale/ss.js',
      './ss.js': './node_modules/moment/locale/ss.js',
      './sv': './node_modules/moment/locale/sv.js',
      './sv.js': './node_modules/moment/locale/sv.js',
      './sw': './node_modules/moment/locale/sw.js',
      './sw.js': './node_modules/moment/locale/sw.js',
      './ta': './node_modules/moment/locale/ta.js',
      './ta.js': './node_modules/moment/locale/ta.js',
      './te': './node_modules/moment/locale/te.js',
      './te.js': './node_modules/moment/locale/te.js',
      './tet': './node_modules/moment/locale/tet.js',
      './tet.js': './node_modules/moment/locale/tet.js',
      './tg': './node_modules/moment/locale/tg.js',
      './tg.js': './node_modules/moment/locale/tg.js',
      './th': './node_modules/moment/locale/th.js',
      './th.js': './node_modules/moment/locale/th.js',
      './tk': './node_modules/moment/locale/tk.js',
      './tk.js': './node_modules/moment/locale/tk.js',
      './tl-ph': './node_modules/moment/locale/tl-ph.js',
      './tl-ph.js': './node_modules/moment/locale/tl-ph.js',
      './tlh': './node_modules/moment/locale/tlh.js',
      './tlh.js': './node_modules/moment/locale/tlh.js',
      './tr': './node_modules/moment/locale/tr.js',
      './tr.js': './node_modules/moment/locale/tr.js',
      './tzl': './node_modules/moment/locale/tzl.js',
      './tzl.js': './node_modules/moment/locale/tzl.js',
      './tzm': './node_modules/moment/locale/tzm.js',
      './tzm-latn': './node_modules/moment/locale/tzm-latn.js',
      './tzm-latn.js': './node_modules/moment/locale/tzm-latn.js',
      './tzm.js': './node_modules/moment/locale/tzm.js',
      './ug-cn': './node_modules/moment/locale/ug-cn.js',
      './ug-cn.js': './node_modules/moment/locale/ug-cn.js',
      './uk': './node_modules/moment/locale/uk.js',
      './uk.js': './node_modules/moment/locale/uk.js',
      './ur': './node_modules/moment/locale/ur.js',
      './ur.js': './node_modules/moment/locale/ur.js',
      './uz': './node_modules/moment/locale/uz.js',
      './uz-latn': './node_modules/moment/locale/uz-latn.js',
      './uz-latn.js': './node_modules/moment/locale/uz-latn.js',
      './uz.js': './node_modules/moment/locale/uz.js',
      './vi': './node_modules/moment/locale/vi.js',
      './vi.js': './node_modules/moment/locale/vi.js',
      './x-pseudo': './node_modules/moment/locale/x-pseudo.js',
      './x-pseudo.js': './node_modules/moment/locale/x-pseudo.js',
      './yo': './node_modules/moment/locale/yo.js',
      './yo.js': './node_modules/moment/locale/yo.js',
      './zh-cn': './node_modules/moment/locale/zh-cn.js',
      './zh-cn.js': './node_modules/moment/locale/zh-cn.js',
      './zh-hk': './node_modules/moment/locale/zh-hk.js',
      './zh-hk.js': './node_modules/moment/locale/zh-hk.js',
      './zh-mo': './node_modules/moment/locale/zh-mo.js',
      './zh-mo.js': './node_modules/moment/locale/zh-mo.js',
      './zh-tw': './node_modules/moment/locale/zh-tw.js',
      './zh-tw.js': './node_modules/moment/locale/zh-tw.js',
    };


    function webpackContext(req) {
      const id = webpackContextResolve(req);
      return __webpack_require__(id);
    }
    function webpackContextResolve(req) {
      if (!__webpack_require__.o(map, req)) {
        const e = new Error(`Cannot find module '${req}'`);
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      }
      return map[req];
    }
    webpackContext.keys = function webpackContextKeys() {
      return Object.keys(map);
    };
    webpackContext.resolve = webpackContextResolve;
    module.exports = webpackContext;
    webpackContext.id = './node_modules/moment/locale sync recursive ^\\.\\/.*$';
    /** */ }),

  /** */ './src/App.tsx':
  /*! *********************!*\
  !*** ./src/App.tsx ***!
  \******************** */
  /*! no exports provided */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ './node_modules/react/index.js');
    /* harmony import */ const react__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__ */__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ const react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ './node_modules/react-dom/index.js');
    /* harmony import */ const react_dom__WEBPACK_IMPORTED_MODULE_1___default = /* #__PURE__ */__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ './node_modules/debug/src/browser.js');
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_2___default = /* #__PURE__ */__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */ const moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ './node_modules/moment/moment.js');
    /* harmony import */ const moment__WEBPACK_IMPORTED_MODULE_3___default = /* #__PURE__ */__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony import */ const _Controller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Controller */ './src/Controller.ts');
    /* harmony import */ const _component_CommentSidebarView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/CommentSidebarView */ './src/component/CommentSidebarView.ts');
    /* harmony import */ const _component_BlogEntryView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/BlogEntryView */ './src/component/BlogEntryView.tsx');
    /* harmony import */ const _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/StateManagementUtil */ './src/state/StateManagementUtil.ts');
    /* harmony import */ const _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./util/EqualityFunctions */ './src/util/EqualityFunctions.ts');
    /* harmony import */ const _component_DetailsSidebarView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./component/DetailsSidebarView */ './src/component/DetailsSidebarView.ts');
    function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

    function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

    /* eslint "react/react-in-jsx-scope":"off" */

    /* eslint "react/jsx-no-undef":"off" */


    const logger = debug__WEBPACK_IMPORTED_MODULE_2___default()('app');

    const Root = /* #__PURE__ */(function (_React$Component) {
      _inheritsLoose(Root, _React$Component);

      function Root() {
        let _this;

        _this = _React$Component.call(this) || this;
        _this.state = {
          isLoggedIn: false,
          loggedInUserId: -1,
          entries: [],
          selectedEntry: {},
          applyUserFilter: false,
          stateNames: {
            users: 'users',
            entries: 'entries',
            selectedEntry: 'selectedEntry',
          },
          apis: {
            users: '/users',
            entries: '/blog',
            entry: '/blog',
            comment: '/comment',
            login: '/login',
          },
          ui: {
            alert: {
              modalId: 'alert',
              titleId: 'alert-title',
              contentId: 'alert-content',
              cancelButtonId: 'alert-cancel',
              confirmButtonId: 'alert-confirm',
              closeButtonId: 'alert-close',
              hideClass: 'd-none',
              showClass: 'd-block',
            },
            navigation: {
              showMyEntriesId: 'navigationItemDashboard',
              addNewEntryId: 'navigationItemAddNewEntry',
              showAllEntriesId: 'navigationItemShowAll',
            },
            blogEntry: {},
            entryDetailsSideBar: {
              dom: {
                sideBarId: 'detailsSideBar',
                formId: 'details',
                titleId: 'title',
                contentId: 'content',
                changedOnId: 'changedOn',
                resultDataKeyId: 'id',
                isDraggable: false,
                isClickable: true,
              },
            },
            commentSideBar: {
              dom: {
                sideBarId: 'commentSideBar',
                headerId: 'commentHeader',
                resultsId: 'comments',
                resultsElementType: 'button',
                resultsElementAttributes: [['type', 'button']],
                resultsClasses: 'list-group-item my-list-item truncate-comment list-group-item-action',
                resultDataKeyId: 'id',
                resultLegacyDataKeyId: 'id',
                modifierClassNormal: 'float-right list-group-item-primary text-right',
                modifierClassInactive: 'float-left list-group-item-dark text-left',
                modifierClassActive: 'list-group-item-primary',
                modifierClassWarning: 'list-group-item-warning',
                iconNormal: '<i class="fas fa-trash-alt"></i>',
                iconInactive: '',
                iconActive: '',
                iconWarning: '',
                isDraggable: false,
                isClickable: true,
                newFormId: 'newComment',
                commentId: 'comment',
                submitCommentId: 'submitComment',
              },
            },
          },
          uiPrefs: {
            navigation: {},
            blogEntry: {},
            commentSideBar: {
              view: {
                location: 'right',
                expandedSize: '50%',
              },
            },
            entryDetailsSideBar: {
              view: {
                location: 'left',
                expandedSize: '35%',
              },
            },
          },
          controller: {
            events: {
              entry: {
                eventDataKeyId: 'entry-id',
              },
            },
            dataLimit: {},
          },
        }; // event handlers

        _this.cancelDelete = _this.cancelDelete.bind(_assertThisInitialized(_this));
        _this.confirmDelete = _this.confirmDelete.bind(_assertThisInitialized(_this));
        _this.handleShowMyEntries = _this.handleShowMyEntries.bind(_assertThisInitialized(_this));
        _this.handleSelectEntryComments = _this.handleSelectEntryComments.bind(_assertThisInitialized(_this));
        _this.handleShowEditEntry = _this.handleShowEditEntry.bind(_assertThisInitialized(_this));
        _this.handleUpdateEntry = _this.handleUpdateEntry.bind(_assertThisInitialized(_this));
        _this.handleAddEntry = _this.handleAddEntry.bind(_assertThisInitialized(_this));
        _this.handleAddComment = _this.handleAddComment.bind(_assertThisInitialized(_this));
        _this.handleDeleteEntry = _this.handleDeleteEntry.bind(_assertThisInitialized(_this));
        _this.handleDeleteComment = _this.handleDeleteComment.bind(_assertThisInitialized(_this));
        _this.controller = _Controller__WEBPACK_IMPORTED_MODULE_4__.default.connectToApplication(_assertThisInitialized(_this), window.localStorage);
        return _this;
      }

      const _proto = Root.prototype;

      _proto.getCurrentUser = function getCurrentUser() {
        return _Controller__WEBPACK_IMPORTED_MODULE_4__.default.getLoggedInUserId();
      };

      _proto.alert = function alert(title, content) {
        this.titleEl.textContent = title;
        this.contentEl.textContent = content;
        this.modalEl.classList.remove(this.state.ui.alert.hideClass);
        this.modalEl.classList.add(this.state.ui.alert.showClass);
      };

      _proto.render = function render() {
        const _this2 = this;

        logger('Rendering App');
        logger(this.state.entries);
        logger(this.state.applyUserFilter);
        let entriesToDisplay = this.state.entries;

        if (this.state.applyUserFilter && _Controller__WEBPACK_IMPORTED_MODULE_4__.default.isLoggedIn() && _Controller__WEBPACK_IMPORTED_MODULE_4__.default.getLoggedInUserId() > 0) {
          entriesToDisplay = entriesToDisplay.filter(entry => entry.createdBy === _Controller__WEBPACK_IMPORTED_MODULE_4__.default.getLoggedInUserId());
        }

        const blog = entriesToDisplay.map((entry, index) =>
        /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_BlogEntryView__WEBPACK_IMPORTED_MODULE_6__.default, {
            key: index,
            entry,
            showCommentsHandler: _this2.handleSelectEntryComments,
            editEntryHandler: _this2.handleShowEditEntry,
            deleteEntryHandler: _this2.handleDeleteEntry,
          }));
        return /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', {
          className: 'Root row ml-1',
        }, blog);
      };

      _proto.cancelDelete = function cancelDelete(event) {
        this.modalEl.classList.remove(this.state.ui.alert.showClass);
        this.modalEl.classList.add(this.state.ui.alert.hideClass);
        event.preventDefault();
      };

      _proto.confirmDelete = function confirmDelete(event) {
        this.modalEl.classList.remove(this.state.ui.alert.showClass);
        this.modalEl.classList.add(this.state.ui.alert.hideClass);
        event.preventDefault();
        let entryId = this.modalEl.getAttribute(this.state.controller.events.entry.eventDataKeyId);
        logger(`Handling Delete Entry ${entryId}`);

        if (entryId) {
          // find the entry from the state manager
          entryId = parseInt(entryId);
          const entry = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_7__.default.findItemInState(this.state.stateNames.entries, {
            id: entryId,
          }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_8__.isSame);

          if (entry) {
            // delete the entry using the controller and remove the state manager
            _Controller__WEBPACK_IMPORTED_MODULE_4__.default.deleteEntry(entry);
            _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_7__.default.removeItemFromState(this.state.stateNames.entries, entry, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_8__.isSame);
          }
        }
      };

      _proto.componentDidMount = function componentDidMount() {
        logger('component Did Mount'); // add the additional views and configure them

        this.commentView = new _component_CommentSidebarView__WEBPACK_IMPORTED_MODULE_5__.default(this, document);
        this.commentView.onDocumentLoaded(); // reset the view state

        this.detailsView = new _component_DetailsSidebarView__WEBPACK_IMPORTED_MODULE_9__.default(this, document);
        this.detailsView.onDocumentLoaded(); // navigation item handlers

        document.getElementById(this.state.ui.navigation.addNewEntryId).addEventListener('click', this.handleAddEntry);
        document.getElementById(this.state.ui.navigation.showMyEntriesId).addEventListener('click', this.handleShowMyEntries); // alert modal dialog setup

        this.modalEl = document.getElementById(this.state.ui.alert.modalId);
        this.titleEl = document.getElementById(this.state.ui.alert.titleId);
        this.contentEl = document.getElementById(this.state.ui.alert.contentId);
        this.cancelBtnEl = document.getElementById(this.state.ui.alert.cancelButtonId);
        this.confirmBtnEl = document.getElementById(this.state.ui.alert.confirmButtonId);
        this.closeBtnEl = document.getElementById(this.state.ui.alert.closeButtonId); // event listeners for the confirm delete of entry

        this.cancelBtnEl.addEventListener('click', this.cancelDelete);
        this.confirmBtnEl.addEventListener('click', this.confirmDelete);
        this.closeBtnEl.addEventListener('click', this.cancelDelete); // ok lets try get things done

        this.controller.initialise();
      };

      _proto.hideAllSideBars = function hideAllSideBars() {
        this.commentView.eventHide(null);
        this.detailsView.eventHide(null);
      };

      _proto.handleShowMyEntries = function handleShowMyEntries(event) {
        logger('Handling Show My Entries');
        this.hideAllSideBars();

        if (!_Controller__WEBPACK_IMPORTED_MODULE_4__.default.isLoggedIn()) {
          window.location.href = this.state.apis.login;
          return;
        }

        this.setState({
          applyUserFilter: true,
        });
      };

      _proto.handleAllEntries = function handleAllEntries(event) {
        logger('Handling Show All Entries');
        this.setState({
          applyUserFilter: false,
        });
        this.hideAllSideBars();
      };

      _proto.handleAddEntry = function handleAddEntry(event) {
        logger('Handling Add Entry');
        event.preventDefault();
        this.hideAllSideBars(); // prevent anything from happening if we are not logged in

        if (!_Controller__WEBPACK_IMPORTED_MODULE_4__.default.isLoggedIn()) {
          window.location.href = this.state.apis.login;
          return;
        } // find the current user


        const creator = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_7__.default.findItemInState(this.state.stateNames.users, {
          id: _Controller__WEBPACK_IMPORTED_MODULE_4__.default.getLoggedInUserId(),
        }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_8__.isSame);
        logger(creator); // create an empty entry

        const entry = {
          title: '',
          content: '',
          createdBy: creator.id,
          changedOn: parseInt(moment__WEBPACK_IMPORTED_MODULE_3___default()().format('YYYYMMDDHHmmss')),
          Comments: [],
          User: {
            id: creator.id,
            username: creator.username,
          },
        };
        logger(entry);
        this.setState({
          selectedEntry: entry,
        });
        _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_7__.default.setStateByName(this.state.stateNames.selectedEntry, entry);
        this.detailsView.eventShow(event);
      };

      _proto.handleAddComment = function handleAddComment(event) {
        logger('Handling Add Comment');
        event.preventDefault(); // get the comment element

        const commentEl = document.getElementById(this.state.ui.commentSideBar.dom.commentId);
        if (commentEl.value.trim().length === 0) return; // prevent anything from happening if we are not logged in

        if (!_Controller__WEBPACK_IMPORTED_MODULE_4__.default.isLoggedIn()) {
          window.location.href = this.state.apis.login;
          return;
        } // find the current user


        const creator = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_7__.default.findItemInState(this.state.stateNames.users, {
          id: _Controller__WEBPACK_IMPORTED_MODULE_4__.default.getLoggedInUserId(),
        }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_8__.isSame);
        logger(creator); // find the selected entry

        const entry = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_7__.default.getStateByName(this.state.stateNames.selectedEntry);

        if (entry && commentEl) {
          // create an empty comment
          const comment = {
            createdBy: creator.id,
            commentOn: entry.id,
            changedOn: parseInt(moment__WEBPACK_IMPORTED_MODULE_3___default()().format('YYYYMMDDHHmmss')),
            content: commentEl.value.trim(),
          };
          commentEl.value = '';
          _Controller__WEBPACK_IMPORTED_MODULE_4__.default.addComment(comment);
          logger(comment);
        }
      };

      _proto.handleSelectEntryComments = function handleSelectEntryComments(event) {
        logger('Handling Select Entry Comments');
        event.preventDefault();
        this.hideAllSideBars();
        let entryId = event.target.getAttribute(this.state.controller.events.entry.eventDataKeyId);
        logger(`Handling Show Edit Entry ${entryId}`);

        if (entryId) {
          // find the entry from the state manager
          entryId = parseInt(entryId);
          const entry = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_7__.default.findItemInState(this.state.stateNames.entries, {
            id: entryId,
          }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_8__.isSame);
          logger(entry);

          if (entry) {
            // select the entry and open the details sidebar
            this.setState({
              selectedEntry: entry,
            });
            _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_7__.default.setStateByName(this.state.stateNames.selectedEntry, entry);
            this.commentView.eventShow(event);
          }
        }
      };

      _proto.handleShowEditEntry = function handleShowEditEntry(event) {
        event.preventDefault();
        this.hideAllSideBars();
        let entryId = event.target.getAttribute(this.state.controller.events.entry.eventDataKeyId);
        logger(`Handling Show Edit Entry ${entryId}`);

        if (entryId) {
          // find the entry from the state manager
          entryId = parseInt(entryId);
          const entry = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_7__.default.findItemInState(this.state.stateNames.entries, {
            id: entryId,
          }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_8__.isSame);
          logger(entry);

          if (entry) {
            // select the entry and open the details sidebar
            this.setState({
              selectedEntry: entry,
            });
            _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_7__.default.setStateByName(this.state.stateNames.selectedEntry, entry);
            this.detailsView.eventShow(event);
          }
        }
      };

      _proto.handleDeleteEntry = function handleDeleteEntry(event) {
        event.preventDefault();
        this.hideAllSideBars();
        let entryId = event.target.getAttribute(this.state.controller.events.entry.eventDataKeyId);
        logger(`Handling Delete Entry ${entryId}`);

        if (entryId) {
          this.modalEl.setAttribute(this.state.controller.events.entry.eventDataKeyId, entryId); // find the entry from the state manager

          entryId = parseInt(entryId);
          const entry = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_7__.default.findItemInState(this.state.stateNames.entries, {
            id: entryId,
          }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_8__.isSame);
          this.alert(entry.title, 'Are you sure you want to delete this blog entry?');
        }
      };

      _proto.handleDeleteComment = function handleDeleteComment(id) {
        _Controller__WEBPACK_IMPORTED_MODULE_4__.default.deleteComment(id);
      };

      _proto.handleUpdateEntry = function handleUpdateEntry(entry) {
        this.hideAllSideBars();
        _Controller__WEBPACK_IMPORTED_MODULE_4__.default.updateEntry(entry);
      };

      _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState, snapshot) {
        logger('component Did Update');
      };

      return Root;
    }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component)); // localStorage.debug = 'app view-ts controller-ts socket-ts api-ts local-storage-ts state-manager-ts view-ts:blogentry view-ts:comments view-ts:details';


    localStorage.debug = 'app view-ts controller-ts socket-ts api-ts state-manager-ts';
    debug__WEBPACK_IMPORTED_MODULE_2___default.a.log = console.info.bind(console);
    const element = /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Root, {
      className: 'container-fluid justify-content-around',
    });
    react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(element, document.getElementById('root'));
    /** */ }),

  /** */ './src/Controller.ts':
  /*! ***************************!*\
  !*** ./src/Controller.ts ***!
  \************************** */
  /*! exports provided: default */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ './node_modules/debug/src/browser.js');
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__ */__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ const _network_DownloadManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./network/DownloadManager */ './src/network/DownloadManager.ts');
    /* harmony import */ const _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state/StateManagementUtil */ './src/state/StateManagementUtil.ts');
    /* harmony import */ const _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/EqualityFunctions */ './src/util/EqualityFunctions.ts');
    /* harmony import */ const _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./notification/NotificationManager */ './src/notification/NotificationManager.ts');
    /* harmony import */ const _socket_SocketManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./socket/SocketManager */ './src/socket/SocketManager.ts');
    /* harmony import */ const _network_Types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./network/Types */ './src/network/Types.ts');


    const cLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('controller-ts');

    const Controller = /* #__PURE__ */(function () {
      function Controller() {}

      const _proto = Controller.prototype;

      _proto.connectToApplication = function connectToApplication(applicationView, clientSideStorage) {
        this.applicationView = applicationView;
        this.clientSideStorage = clientSideStorage;
        this.config = this.applicationView.state; // setup Async callbacks for the fetch requests

        this.callbackForUsers = this.callbackForUsers.bind(this);
        this.callbackForEntries = this.callbackForEntries.bind(this);
        this.callbackForCreateEntry = this.callbackForCreateEntry.bind(this);
        this.callbackForCreateComment = this.callbackForCreateComment.bind(this); // state listener

        this.stateChanged = this.stateChanged.bind(this);
        _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.addChangeListenerForName(this.config.stateNames.entries, this);
        return this;
      };

      _proto.stateChanged = function stateChanged(name, value) {
        cLogger(`State changes ${name}`);
        cLogger(value);
        this.applicationView.setState({
          isLoggedIn: this.isLoggedIn(),
          loggedInUserId: this.getLoggedInUserId(),
          selectedEntry: {},
          entries: value,
        });
      }
      /*
  *
  * Call back functions for database operations
  *
   */
      ;

      _proto.callbackForUsers = function callbackForUsers(data, status) {
        cLogger('callback for all users');
        const users = [];

        if (status >= 200 && status <= 299) {
          // do we have any data?
          cLogger(data);
          const cbUsers = data; // covert the data to the AppType User

          cbUsers.forEach((cbUser) => {
            const user = {
              id: cbUser.id,
              username: cbUser.username,
            };
            users.push(user);
          });
        }

        _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.setStateByName(this.config.stateNames.users, users);
      };

      Controller.convertJSONCommentToComment = function convertJSONCommentToComment(jsonComment) {
        const comment = {
          id: jsonComment.id,
          content: jsonComment.content,
          createdBy: jsonComment.createdBy,
          changedOn: jsonComment.changedOn,
          commentOn: jsonComment.commentOn,
        };
        return comment;
      };

      Controller.convertJSONUserToUser = function convertJSONUserToUser(jsonUser) {
        const user = {
          id: jsonUser.id,
          username: jsonUser.username,
        };
        return user;
      };

      Controller.convertJSONEntryToBlogEntry = function convertJSONEntryToBlogEntry(jsonEntry) {
        const entry = {
          id: jsonEntry.id,
          title: jsonEntry.title,
          content: jsonEntry.content,
          createdBy: jsonEntry.createdBy,
          changedOn: jsonEntry.changedOn,
          User: null,
          Comments: [],
        };
        const cbUser = jsonEntry.user;

        if (cbUser) {
          entry.User = Controller.convertJSONUserToUser(cbUser);
        }

        const cbComments = jsonEntry.comments;

        if (cbComments) {
          cbComments.forEach((cbComment) => {
            const comment = Controller.convertJSONCommentToComment(cbComment);
            entry.Comments.push(comment);
          });
        }

        return entry;
      };

      _proto.callbackForEntries = function callbackForEntries(data, status) {
        cLogger('callback for all entries');
        const entries = [];

        if (status >= 200 && status <= 299) {
          // do we have any data?
          cLogger(data);
          data.forEach((cbEntry) => {
            const entry = Controller.convertJSONEntryToBlogEntry(cbEntry);
            entries.push(entry);
          });
        }

        _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.setStateByName(this.config.stateNames.entries, entries);
      };

      _proto.callbackForCreateEntry = function callbackForCreateEntry(data, status) {
        cLogger('callback for create entry');
        const entry = null;

        if (status >= 200 && status <= 299) {
          // do we have any data?
          cLogger(data);

          const _entry = Controller.convertJSONEntryToBlogEntry(data);

          _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.addNewItemToState(this.config.stateNames.entries, _entry);
        }
      };

      _proto.callbackForCreateComment = function callbackForCreateComment(data, status) {
        cLogger('callback for create comment');
        const comment = null;

        if (status >= 200 && status <= 299) {
          // do we have any data?
          const _comment = Controller.convertJSONCommentToComment(data);

          cLogger(_comment); // find the corresponding entry in state

          const entry = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.findItemInState(this.config.stateNames.entries, {
            id: _comment.commentOn,
          }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__.isSame);
          cLogger(entry);

          if (entry) {
            cLogger('callback for create comment - updating entry'); // update the entry with the new comment

            entry.Comments.push(_comment); // update the entry in the state manager

            _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.updateItemInState(this.config.stateNames.entries, entry, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__.isSame); // reselect the same entry

            _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.setStateByName(this.config.stateNames.selectedEntry, entry);
            cLogger(entry);
          }
        }
      }
      /*
  *
  *   API calls
  *
   */
      ;

      _proto.getAllUsers = function getAllUsers() {
        cLogger('Getting All Users');
        const jsonRequest = {
          url: this.getServerAPIURL() + this.config.apis.users,
          type: _network_Types__WEBPACK_IMPORTED_MODULE_6__.RequestType.GET,
          params: {},
          callback: this.callbackForUsers,
        };
        _network_DownloadManager__WEBPACK_IMPORTED_MODULE_1__.default.addApiRequest(jsonRequest, true);
      };

      _proto.getAllEntries = function getAllEntries() {
        cLogger('Getting All Entries');
        const jsonRequest = {
          url: this.getServerAPIURL() + this.config.apis.entries,
          type: _network_Types__WEBPACK_IMPORTED_MODULE_6__.RequestType.GET,
          params: {},
          callback: this.callbackForEntries,
        };
        _network_DownloadManager__WEBPACK_IMPORTED_MODULE_1__.default.addApiRequest(jsonRequest, true);
      };

      _proto.apiDeleteComment = function apiDeleteComment(id) {
        const deleteCommentCB = function deleteCommentCB(data, status) {
          cLogger('callback for delete comment');

          if (status >= 200 && status <= 299) {
            // do we have any data?
            cLogger(data);
          }
        };

        const jsonRequest = {
          url: this.getServerAPIURL() + this.config.apis.comment,
          type: _network_Types__WEBPACK_IMPORTED_MODULE_6__.RequestType.DELETE,
          params: {
            id,
          },
          callback: deleteCommentCB,
        };
        _network_DownloadManager__WEBPACK_IMPORTED_MODULE_1__.default.addApiRequest(jsonRequest);
      };

      _proto.apiDeleteEntry = function apiDeleteEntry(entry) {
        const deleteCB = function deleteCB(data, status) {
          cLogger('callback for delete entry');

          if (status >= 200 && status <= 299) {
            // do we have any data?
            cLogger(data);
          }
        };

        if (entry) {
          const jsonRequest = {
            url: this.getServerAPIURL() + this.config.apis.entries,
            type: _network_Types__WEBPACK_IMPORTED_MODULE_6__.RequestType.DELETE,
            params: {
              id: entry.id,
            },
            callback: deleteCB,
          };
          _network_DownloadManager__WEBPACK_IMPORTED_MODULE_1__.default.addApiRequest(jsonRequest);
        }
      };

      _proto.apiCreateEntry = function apiCreateEntry(entry) {
        if (entry) {
          const jsonRequest = {
            url: this.getServerAPIURL() + this.config.apis.entries,
            type: _network_Types__WEBPACK_IMPORTED_MODULE_6__.RequestType.POST,
            params: entry,
            callback: this.callbackForCreateEntry,
          };
          _network_DownloadManager__WEBPACK_IMPORTED_MODULE_1__.default.addApiRequest(jsonRequest, true);
        }
      };

      _proto.apiCreateComment = function apiCreateComment(comment) {
        if (comment) {
          const jsonRequest = {
            url: this.getServerAPIURL() + this.config.apis.comment,
            type: _network_Types__WEBPACK_IMPORTED_MODULE_6__.RequestType.POST,
            params: comment,
            callback: this.callbackForCreateComment,
          };
          _network_DownloadManager__WEBPACK_IMPORTED_MODULE_1__.default.addApiRequest(jsonRequest, true);
        }
      };

      _proto.apiUpdateEntry = function apiUpdateEntry(entry) {
        const updateCB = function updateCB(data, status) {
          cLogger('callback for update entry');

          if (status >= 200 && status <= 299) {
            // do we have any data?
            cLogger(data);
          }
        };

        if (entry) {
          const jsonRequest = {
            url: this.getServerAPIURL() + this.config.apis.entries,
            type: _network_Types__WEBPACK_IMPORTED_MODULE_6__.RequestType.PUT,
            params: entry,
            callback: updateCB,
          };
          _network_DownloadManager__WEBPACK_IMPORTED_MODULE_1__.default.addApiRequest(jsonRequest);
        }
      }
      /*
  *
  * Simple Application state (URL, logged in user)
  *
   */
      ;

      _proto.getServerAPIURL = function getServerAPIURL() {
        let result = '/api'; // @ts-ignore

        if (window.ENV && window.ENV.serverURL) {
          // @ts-ignore
          result = window.ENV.serverURL;
        }

        return result;
      };

      _proto.isLoggedIn = function isLoggedIn() {
        let isLoggedIn = false;

        try {
          // @ts-ignore
          if (loggedInUserId) {
            isLoggedIn = true;
          }
        } catch (error) {}

        cLogger(`Are logged in: ${isLoggedIn}`);
        return isLoggedIn;
      };

      _proto.getLoggedInUserId = function getLoggedInUserId() {
        let result = -1;

        try {
          // @ts-ignore
          if (loggedInUserId) {
            // @ts-ignore
            result = loggedInUserId;
          }
        } catch (error) {}

        cLogger(`Logged in user id: ${result}`);
        return result;
      }
      /*
    Get the base data for the application (users, entries)
   */
      ;

      _proto.initialise = function initialise() {
        cLogger('Initialising data state'); // listen for socket events

        _socket_SocketManager__WEBPACK_IMPORTED_MODULE_5__.default.setListener(this); // load the users

        this.getAllUsers(); // load the entries

        this.getAllEntries();
      } // Lets delete a comment
      ;

      _proto.deleteComment = function deleteComment(id) {
        const entry = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.getStateByName(this.config.stateNames.selectedEntry);

        if (entry) {
          cLogger(`Handling delete comment for ${entry.id} and comment ${id}`); // find the comment in the entry and remove it from the state

          const comments = entry.Comments;
          const foundIndex = comments.findIndex(element => element.id === id);

          if (foundIndex >= 0) {
            // remove comment from the array
            cLogger('Found comment in entry - removing');
            comments.splice(foundIndex, 1);
            cLogger(entry); // update the statement manager

            _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.setStateByName(this.config.stateNames.selectedEntry, entry);
            _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.updateItemInState(this.config.stateNames.entries, entry, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__.isSame);
          }
        }

        this.apiDeleteComment(id);
      };

      _proto.deleteEntry = function deleteEntry(entry) {
        if (entry) {
          cLogger(`Handling delete entry for ${entry.id}`); // update the state manager

          _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.removeItemFromState(this.config.stateNames.entries, entry, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__.isSame); // initiate a call to remove from the database

          this.apiDeleteEntry(entry);
        }
      };

      _proto.updateEntry = function updateEntry(entry) {
        if (entry) {
          cLogger(entry);

          if (entry.id) {
            cLogger(`Handling update for entry ${entry.id}`); // update the state manager

            _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.updateItemInState(this.config.stateNames.entries, entry, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__.isSame); // update the database

            this.apiUpdateEntry(entry);
          } else {
            cLogger('Handling create for entry'); // new entry

            this.apiCreateEntry(entry);
          }
        }
      };

      _proto.addComment = function addComment(comment) {
        if (comment) {
          cLogger(comment);
          cLogger('Handling create for comment');
          this.apiCreateComment(comment);
        }
      }
      /*
  *  sockets -
  *  Handling data changes by other users
  *
   */
      ;

      _proto.handleMessage = function handleMessage(message) {
        cLogger(message);
      };

      _proto.getCurrentUser = function getCurrentUser() {
        return this.getLoggedInUserId();
      };

      _proto.handleDataChangedByAnotherUser = function handleDataChangedByAnotherUser(message) {
        cLogger(`Handling data change ${message.type} on object type ${message.objectType} made by user ${message.user}`);
        const changeUser = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.findItemInState(this.config.stateNames.users, {
          id: message.user,
        }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__.isSame);
        const stateObj = message.data;
        cLogger(stateObj); // ok lets work out where this change belongs

        try {
          switch (message.type) {
            case 'create':
            {
              switch (message.objectType) {
                case 'Comment':
                {
                  // updating comments is more tricky as it is a sub object of the blog entry
                  // find the entry in question
                  const changedEntry = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.findItemInState(this.config.stateNames.entries, {
                    id: stateObj.commentOn,
                  }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__.isSame);

                  if (changedEntry) {
                    // add the new comment
                    changedEntry.Comments.push(stateObj); // update the state

                    _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.updateItemInState(this.config.stateNames.entries, changedEntry, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__.isSame); // was this entry current open by the user?

                    const currentSelectedEntry = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.getStateByName(this.config.stateNames.selectedEntry);

                    if (currentSelectedEntry) {
                      if (currentSelectedEntry.id === changedEntry.id) {
                        _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.setStateByName(this.config.stateNames.selectedEntry, changedEntry);
                      }
                    }

                    let username = 'unknown';

                    if (changeUser) {
                      username = changeUser.username;
                    }

                    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_4__.default.show(changedEntry.title, `${username} added comment ${stateObj.content}`);
                  }

                  break;
                }

                case 'BlogEntry':
                {
                  // add the new item to the state
                  _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.addNewItemToState(this.config.stateNames.entries, stateObj);
                  let _username = 'unknown';

                  if (changeUser) {
                    _username = changeUser.username;
                  }

                  _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_4__.default.show(stateObj.title, `${_username} added new entry`);
                  break;
                }

                case 'User':
                {
                  // add the new item to the state
                  _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.addNewItemToState(this.config.stateNames.users, stateObj);
                  _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_4__.default.show(stateObj.username, `${stateObj.username} has just registered.`, 'message');
                  break;
                }
              }

              break;
            }

            case 'update':
            {
              switch (message.objectType) {
                case 'BlogEntry':
                {
                  // update the item in the state
                  _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.updateItemInState(this.config.stateNames.entries, stateObj, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__.isSame); // the entry could be selected by this (different user) but that would only be for comments, which is not what changed, so we are done

                  break;
                }
              }

              break;
            }

            case 'delete':
            {
              switch (message.objectType) {
                case 'Comment':
                {
                  // removing comments is more tricky as it is a sub object of the blog entry
                  // find the entry in question
                  const _changedEntry = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.findItemInState(this.config.stateNames.entries, {
                    id: stateObj.commentOn,
                  }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__.isSame);

                  cLogger(_changedEntry);

                  if (_changedEntry) {
                    // remove the comment
                    const comments = _changedEntry.Comments;
                    const foundIndex = comments.findIndex(element => element.id === stateObj.id);

                    if (foundIndex >= 0) {
                      // remove comment from the array
                      cLogger('Found comment in entry - removing');
                      comments.splice(foundIndex, 1);
                      cLogger(_changedEntry); // update the state

                      _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.updateItemInState(this.config.stateNames.entries, _changedEntry, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__.isSame); // was this entry current open by the user?

                      const _currentSelectedEntry = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.getStateByName(this.config.stateNames.selectedEntry);

                      if (_currentSelectedEntry) {
                        if (_currentSelectedEntry.id === _changedEntry.id) {
                          _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.setStateByName(this.config.stateNames.selectedEntry, _changedEntry);
                        }
                      }
                    }
                  }

                  break;
                }

                case 'BlogEntry':
                {
                  cLogger(`Deleting Blog Entry with id ${stateObj.id}`);
                  const deletedEntry = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.findItemInState(this.config.stateNames.entries, stateObj, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__.isSame);
                  cLogger(deletedEntry);

                  if (deletedEntry) {
                    cLogger(`Deleting Blog Entry with id ${deletedEntry.id}`);
                    _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.removeItemFromState(this.config.stateNames.entries, deletedEntry, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__.isSame); // the current user could be accessing the comments in the entry that was just deleted

                    const _currentSelectedEntry2 = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_2__.default.getStateByName(this.config.stateNames.selectedEntry);

                    if (_currentSelectedEntry2) {
                      if (_currentSelectedEntry2.id === deletedEntry.id) {
                        cLogger('Deleted entry is selected by user, closing sidebars'); // ask the application to close any access to the comments

                        this.applicationView.hideAllSideBars();
                      }
                    }

                    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_4__.default.show(deletedEntry.title, `${deletedEntry.User.username} has deleted this entry.`, 'danger');
                  }

                  break;
                }
              }

              break;
            }
          }
        } catch (err) {
          cLogger(err);
        }
      };

      return Controller;
    }());

    const controller = new Controller();
    /* harmony default export */ __webpack_exports__.default = (controller);
    /** */ }),

  /** */ './src/component/AbstractView.ts':
  /*! ***************************************!*\
  !*** ./src/component/AbstractView.ts ***!
  \************************************** */
  /*! exports provided: default */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'default', () => AbstractView);
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ './node_modules/debug/src/browser.js');
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__ */__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ const _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/BrowserUtil */ './src/util/BrowserUtil.ts');


    const avLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('view-ts');

    var AbstractView = /* #__PURE__ */(function () {
      function AbstractView(applicationView, htmlDocument, uiConfig, uiPrefs) {
        this.applicationView = applicationView;
        this.document = document;
        this.uiConfig = uiConfig;
        this.uiPrefs = uiPrefs;
        this.config = applicationView.state; // state change listening

        this.stateChanged = this.stateChanged.bind(this); // event handlers

        this.eventStartDrag = this.eventStartDrag.bind(this);
        this.eventClickItem = this.eventClickItem.bind(this);
      }

      const _proto = AbstractView.prototype;

      _proto.eventStartDrag = function eventStartDrag(event) {
        avLogger('Abstract View : drag start', 10);
        const data = JSON.stringify(this.getDragData(event));
        avLogger(data, 10); // @ts-ignore

        event.dataTransfer.setData(this.applicationView.state.ui.draggable.draggableDataKeyId, data);
      };

      _proto.createResultsForState = function createResultsForState(name, newState) {
        const _this = this;

        avLogger('Abstract View : creating Results', 10);
        avLogger(newState);
        const domConfig = this.uiConfig.dom; // remove the previous items from list

        const viewEl = document.getElementById(domConfig.resultsId);
        if (viewEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__.default.removeAllChildren(viewEl); // add the new children

        newState.map((item, index) => {
          const childEl = _this.document.createElement(domConfig.resultsElementType);

          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__.default.addRemoveClasses(childEl, domConfig.resultsClasses); // add the key ids for selection

          childEl.setAttribute(domConfig.resultDataKeyId, _this.getIdForStateItem(name, item));
          childEl.setAttribute(domConfig.resultLegacyDataKeyId, _this.getLegacyIdForStateItem(name, item));
          childEl.setAttribute(domConfig.resultDataSourceId, domConfig.resultDataSourceValue);

          const displayText = _this.getDisplayValueForStateItem(name, item); // add modifiers for patient state


          const modifier = _this.getModifierForStateItem(name, item);

          const secondModifier = _this.getSecondaryModifierForStateItem(name, item);

          switch (modifier) {
            case 'normal':
            {
              avLogger('Abstract View: normal item', 10);
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__.default.addRemoveClasses(childEl, domConfig.modifierClassNormal);

              if (domConfig.iconNormal !== '') {
                childEl.innerHTML = displayText + domConfig.iconNormal;
              } else {
                childEl.innerText = displayText;
              }

              switch (secondModifier) {
                case 'warning':
                {
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__.default.addRemoveClasses(childEl, domConfig.modifierClassNormal, false);
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__.default.addRemoveClasses(childEl, domConfig.modifierClassWarning, true);

                  if (domConfig.iconWarning !== '') {
                    childEl.innerHTML += domConfig.iconWarning;
                  }

                  break;
                }

                case 'normal':
                {}
              }

              break;
            }

            case 'active':
            {
              avLogger('Abstract View: active item', 10);
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__.default.addRemoveClasses(childEl, domConfig.modifierClassActive);

              if (domConfig.iconActive !== '') {
                childEl.innerHTML = displayText + domConfig.iconActive;
              } else {
                childEl.innerText = displayText;
              }

              switch (secondModifier) {
                case 'warning':
                {
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__.default.addRemoveClasses(childEl, domConfig.modifierClassNormal, false);
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__.default.addRemoveClasses(childEl, domConfig.modifierClassWarning, true);

                  if (domConfig.iconWarning !== '') {
                    childEl.innerHTML += domConfig.iconWarning;
                  }

                  break;
                }

                case 'normal':
                {}
              }

              break;
            }

            case 'inactive':
            {
              avLogger('Abstract View: inactive item', 10);
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__.default.addRemoveClasses(childEl, domConfig.modifierClassInactive);

              if (domConfig.iconInactive !== '') {
                childEl.innerHTML = displayText + domConfig.iconInactive;
              } else {
                childEl.innerText = displayText;
              }

              switch (secondModifier) {
                case 'warning':
                {
                  if (domConfig.iconWarning !== '') {
                    childEl.innerHTML += domConfig.iconWarning;
                  }

                  break;
                }

                case 'normal':
                {}
              }

              break;
            }
          } // add draggable actions


          if (domConfig.isDraggable) {
            childEl.setAttribute('draggable', 'true');
            childEl.addEventListener('dragstart', _this.eventStartDrag);
          } // add selection actions


          if (domConfig.isClickable) {
            childEl.addEventListener('click', _this.eventClickItem);
          }

          avLogger(`Abstract View: Adding child ${item.id}`);
          if (viewEl) viewEl.appendChild(childEl);
        });
      };

      _proto.stateChanged = function stateChanged(name, newValue) {
        this.updateView(name, newValue);
      };

      return AbstractView;
    }());
    /** */ }),

  /** */ './src/component/BlogEntryView.tsx':
  /*! *****************************************!*\
  !*** ./src/component/BlogEntryView.tsx ***!
  \**************************************** */
  /*! exports provided: default */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'default', () => BlogEntryView);
    /* harmony import */ const react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ './node_modules/react/index.js');
    /* harmony import */ const react__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__ */__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ const prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ './node_modules/prop-types/index.js');
    /* harmony import */ const prop_types__WEBPACK_IMPORTED_MODULE_1___default = /* #__PURE__ */__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */ const moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ './node_modules/moment/moment.js');
    /* harmony import */ const moment__WEBPACK_IMPORTED_MODULE_2___default = /* #__PURE__ */__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ './node_modules/debug/src/browser.js');
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_3___default = /* #__PURE__ */__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony import */ const _Controller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Controller */ './src/Controller.ts');


    const beLogger = debug__WEBPACK_IMPORTED_MODULE_3___default()('view-ts:blogentry'); // @ts-ignore

    function BlogEntryView(_ref) {
      const { entry } = _ref;
      const { showCommentsHandler } = _ref;
      const { editEntryHandler } = _ref;
      const { deleteEntryHandler } = _ref;

      if (entry) {
        beLogger(`Entry ${entry.User.id} === ${_Controller__WEBPACK_IMPORTED_MODULE_4__.default.getLoggedInUserId()}`);
        let editButton;
        let deleteButton;

        if (entry.User.id === _Controller__WEBPACK_IMPORTED_MODULE_4__.default.getLoggedInUserId()) {
          editButton = /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('button', {
            type: 'button',
            className: 'btn-primary btn-sm rounded p-1 mr-2',
            'entry-id': entry.id,
            onClick: editEntryHandler,
          }, '\xA0\xA0Edit \xA0', /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('i', {
            className: 'fas fa-edit',
          }), '\xA0\xA0');
          deleteButton = /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('button', {
            type: 'button',
            className: 'btn-warning btn-sm rounded p-1 mr-2',
            'entry-id': entry.id,
            onClick: deleteEntryHandler,
          }, '\xA0\xA0Delete \xA0', /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('i', {
            className: 'fas fa-trash-alt',
          }), '\xA0\xA0');
        } else {
          editButton = /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('button', {
            type: 'button',
            className: 'btn-outline-secondary btn-sm rounded p-1 mr-2 ',
            disabled: true,
          }, '\xA0\xA0Edit \xA0', /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('i', {
            className: 'fas fa-edit',
          }), '\xA0\xA0');
          deleteButton = /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('button', {
            type: 'button',
            className: 'btn-outline-secondary btn-sm rounded p-1 mr-2',
            disabled: true,
          }, '\xA0\xA0Delete \xA0', /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('i', {
            className: 'fas fa-trash-alt',
          }), '\xA0\xA0');
        }

        return /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', {
          className: 'col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2',
        }, /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', {
          className: 'card',
          style: {
            width: '350px',
          },
        }, /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', {
          className: 'card-header',
        }, entry.title, '\xA0\xA0\xA0\xA0', /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('a', {
          className: 'text-decoration-none',
        }, /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('i', {
          className: 'fas fa-comments text-secondary',
          'entry-id': entry.id,
          onClick: showCommentsHandler,
        }), '\xA0\xA0', /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('span', {
          className: 'badge badge-pill badge-primary text-right',
          'entry-id': entry.id,
          onClick: showCommentsHandler,
        }, '\xA0', entry.Comments.length, '\xA0'))), /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', {
          className: 'card-body',
        }, /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('p', {
          className: 'card-text',
        }, entry.content), editButton, deleteButton), /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', {
          className: 'card-footer text-right text-muted',
        }, entry.User.username, ' on ', moment__WEBPACK_IMPORTED_MODULE_2___default()(entry.changedOn, 'YYYYMMDDHHmmss').format('DD/MM/YYYY'))));
      }
      return /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', null);
    }
    BlogEntryView.propTypes = {
      entry: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any.isRequired,
      showCommentsHandler: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
      editEntryHandler: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
      deleteEntryHandler: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    };
    /** */ }),

  /** */ './src/component/CommentSidebarView.ts':
  /*! *********************************************!*\
  !*** ./src/component/CommentSidebarView.ts ***!
  \******************************************** */
  /*! exports provided: default */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ './node_modules/debug/src/browser.js');
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__ */__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ const moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ './node_modules/moment/moment.js');
    /* harmony import */ const moment__WEBPACK_IMPORTED_MODULE_1___default = /* #__PURE__ */__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */ const _Controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Controller */ './src/Controller.ts');
    /* harmony import */ const _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/StateManagementUtil */ './src/state/StateManagementUtil.ts');
    /* harmony import */ const _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/EqualityFunctions */ './src/util/EqualityFunctions.ts');
    /* harmony import */ const _SidebarView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SidebarView */ './src/component/SidebarView.ts');
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;

      _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }


    const viewLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('view-ts:comments');

    const CommentSidebarView = /* #__PURE__ */(function (_SidebarView) {
      _inheritsLoose(CommentSidebarView, _SidebarView);

      function CommentSidebarView(applicationView, htmlDocument) {
        let _this;

        _this = _SidebarView.call(this, applicationView, htmlDocument, applicationView.state.ui.commentSideBar, applicationView.state.uiPrefs.commentSideBar) || this; // handler binding

        _this.updateView = _this.updateView.bind(_assertThisInitialized(_this)); // elements

        _this.commentHeaderEl = htmlDocument.getElementById(_this.uiConfig.dom.headerId);
        _this.newCommentFormEl = htmlDocument.getElementById(_this.uiConfig.dom.newFormId);
        if (_this.newCommentFormEl) _this.newCommentFormEl.addEventListener('submit', _this.applicationView.handleAddComment);
        _this.newCommentTextEl = htmlDocument.getElementById(_this.uiConfig.dom.commentId);
        _this.newCommentSubmitEl = htmlDocument.getElementById(_this.uiConfig.dom.submitCommentId); // register state change listening

        _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_3__.default.addChangeListenerForName(_this.config.stateNames.selectedEntry, _assertThisInitialized(_this));
        return _this;
      }

      const _proto = CommentSidebarView.prototype;

      _proto.getIdForStateItem = function getIdForStateItem(name, item) {
        return item.id;
      };

      _proto.getLegacyIdForStateItem = function getLegacyIdForStateItem(name, item) {
        return item.id;
      };

      _proto.getDisplayValueForStateItem = function getDisplayValueForStateItem(name, item) {
        viewLogger(`Getting display value for comment ${item.id} with content ${item.content}`); // find the user for the item from the createdBy attribute

        const createdBy = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_3__.default.findItemInState(this.config.stateNames.users, {
          id: item.createdBy,
        }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_4__.isSame);
        const createdOn = moment__WEBPACK_IMPORTED_MODULE_1___default()(item.changedOn, 'YYYYMMDDHHmmss').format('DD/MM/YYYY HH:mm');
        return `${item.content} - ${createdBy.username} on ${createdOn}  `;
      };

      _proto.getModifierForStateItem = function getModifierForStateItem(name, item) {
        let result = 'inactive';

        if (item.createdBy === _Controller__WEBPACK_IMPORTED_MODULE_2__.default.getLoggedInUserId()) {
          result = 'normal';
        }

        return result;
      };

      _proto.getSecondaryModifierForStateItem = function getSecondaryModifierForStateItem(name, item) {
        return 'normal';
      };

      _proto.eventClickItem = function eventClickItem(event) {
        event.preventDefault();
        const entry = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_3__.default.getStateByName(this.config.stateNames.selectedEntry);
        viewLogger(event.target); // @ts-ignore

        let id = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId);

        if (!id) {
          // get the id from the containing element
          // @ts-ignore
          const parentEl = event.target.parentNode;
          id = parentEl.getAttribute(this.uiConfig.dom.resultDataKeyId);
        } // @ts-ignore


        viewLogger(`Comment ${event.target.innerText} with id ${id} clicked`, 20);

        if (id) {
          id = parseInt(id); // find the comment in the selected entry

          const comment = entry.Comments.find(comment => comment.id === id);

          if (comment) {
            viewLogger(`Comment created by ${comment.createdBy} and current user is ${_Controller__WEBPACK_IMPORTED_MODULE_2__.default.getLoggedInUserId()}`); // only able to delete if the comment was created by the current user

            if (comment.createdBy === _Controller__WEBPACK_IMPORTED_MODULE_2__.default.getLoggedInUserId()) {
              this.applicationView.handleDeleteComment(parseInt(id));
            }
          }
        }
      };

      _proto.updateView = function updateView(name, newState) {
        viewLogger('Updating view');
        viewLogger(newState);

        if (_Controller__WEBPACK_IMPORTED_MODULE_2__.default.isLoggedIn()) {
          if (this.newCommentTextEl) this.newCommentTextEl.removeAttribute('readonly');
          if (this.newCommentSubmitEl) this.newCommentSubmitEl.removeAttribute('disabled');
        } else {
          if (this.newCommentTextEl) this.newCommentTextEl.setAttribute('readonly', 'true');
          if (this.newCommentSubmitEl) this.newCommentSubmitEl.setAttribute('disabled', 'true');
        }

        if (newState && newState.Comments) {
          if (this.commentHeaderEl) this.commentHeaderEl.innerHTML = newState.title;
          viewLogger(newState.Comments);
          this.createResultsForState(name, newState.Comments);
        }
      };

      _proto.getDragData = function getDragData(event) {};

      return CommentSidebarView;
    }(_SidebarView__WEBPACK_IMPORTED_MODULE_5__.default));

    /* harmony default export */ __webpack_exports__.default = (CommentSidebarView);
    /** */ }),

  /** */ './src/component/DetailsSidebarView.ts':
  /*! *********************************************!*\
  !*** ./src/component/DetailsSidebarView.ts ***!
  \******************************************** */
  /*! exports provided: default */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ './node_modules/moment/moment.js');
    /* harmony import */ const moment__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__ */__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ './node_modules/debug/src/browser.js');
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_1___default = /* #__PURE__ */__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */ const _SidebarView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SidebarView */ './src/component/SidebarView.ts');
    /* harmony import */ const _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/StateManagementUtil */ './src/state/StateManagementUtil.ts');
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;

      _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }


    const viewLogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('view-ts:details');

    const DetailsSidebarView = /* #__PURE__ */(function (_SidebarView) {
      _inheritsLoose(DetailsSidebarView, _SidebarView);

      function DetailsSidebarView(applicationView, htmlDocument) {
        let _this;

        _this = _SidebarView.call(this, applicationView, htmlDocument, applicationView.state.ui.entryDetailsSideBar, applicationView.state.uiPrefs.entryDetailsSideBar) || this; // handler binding

        _this.updateView = _this.updateView.bind(_assertThisInitialized(_this));
        _this.eventClickItem = _this.eventClickItem.bind(_assertThisInitialized(_this)); // field and form elements

        _this.formEl = document.getElementById(_this.uiConfig.dom.formId);
        _this.titleEl = document.getElementById(_this.uiConfig.dom.titleId);
        _this.contentEl = document.getElementById(_this.uiConfig.dom.contentId);
        _this.changeOnEl = document.getElementById(_this.uiConfig.dom.changedOnId); // register state change listening

        _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_3__.default.addChangeListenerForName(_this.config.stateNames.selectedEntry, _assertThisInitialized(_this)); // listen for form submissions

        if (_this.formEl) {
          // @ts-ignore
          _this.formEl.addEventListener('submit', _this.eventClickItem);
        }

        return _this;
      }

      const _proto = DetailsSidebarView.prototype;

      _proto.getIdForStateItem = function getIdForStateItem(name, item) {
        return item.id;
      };

      _proto.getLegacyIdForStateItem = function getLegacyIdForStateItem(name, item) {
        return item.id;
      };

      _proto.eventClickItem = function eventClickItem(event) {
        event.preventDefault();
        viewLogger('Handling submit Details Sidebar View');
        viewLogger(event.target);
        const entry = _state_StateManagementUtil__WEBPACK_IMPORTED_MODULE_3__.default.getStateByName(this.config.stateNames.selectedEntry);
        viewLogger(entry);
        entry.title = this.titleEl ? this.titleEl.value.trim() : '';
        entry.content = this.contentEl ? this.contentEl.value.trim() : '';
        entry.changedOn = parseInt(moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYYMMDDHHmmss'));
        viewLogger(entry);
        if (this.titleEl) this.titleEl.value = '';
        if (this.contentEl) this.contentEl.value = '';
        if (this.changeOnEl) this.changeOnEl.innerText = 'Last Changed On:';
        this.applicationView.handleUpdateEntry(entry);
      };

      _proto.updateView = function updateView(name, newState) {
        viewLogger('Handling update of Details Sidebar View');
        viewLogger(newState);
        const entry = newState;

        if (entry && entry.title) {
          if (this.titleEl) this.titleEl.value = entry.title;
          if (this.contentEl) this.contentEl.value = entry.content;
          if (this.changeOnEl) this.changeOnEl.innerText = `Last Changed On: ${moment__WEBPACK_IMPORTED_MODULE_0___default()(entry.changedOn, 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}`;
        } else {
          if (this.titleEl) this.titleEl.value = '';
          if (this.contentEl) this.contentEl.value = '';
          if (this.changeOnEl) this.changeOnEl.innerText = 'Last Changed On: ';
        }
      };

      _proto.getDisplayValueForStateItem = function getDisplayValueForStateItem(name, item) {
        return '';
      };

      _proto.getDragData = function getDragData(event) {};

      _proto.getModifierForStateItem = function getModifierForStateItem(name, item) {
        return '';
      };

      _proto.getSecondaryModifierForStateItem = function getSecondaryModifierForStateItem(name, item) {
        return '';
      };

      return DetailsSidebarView;
    }(_SidebarView__WEBPACK_IMPORTED_MODULE_2__.default));

    /* harmony default export */ __webpack_exports__.default = (DetailsSidebarView);
    /** */ }),

  /** */ './src/component/SidebarView.ts':
  /*! **************************************!*\
  !*** ./src/component/SidebarView.ts ***!
  \************************************* */
  /*! exports provided: default */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const _AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractView */ './src/component/AbstractView.ts');
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;

      _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }


    const SidebarView = /* #__PURE__ */(function (_AbstractView) {
      _inheritsLoose(SidebarView, _AbstractView);

      function SidebarView(applicationView, htmlDocument, uiConfig, uiPrefs) {
        let _this;

        _this = _AbstractView.call(this, applicationView, htmlDocument, uiConfig, uiPrefs) || this; // event handlers

        _this.eventHide = _this.eventHide.bind(_assertThisInitialized(_this));
        _this.eventShow = _this.eventShow.bind(_assertThisInitialized(_this));
        return _this;
      }

      const _proto = SidebarView.prototype;

      _proto.onDocumentLoaded = function onDocumentLoaded() {
        // this should be called once at startup
        // hide the side bar panel
        this.eventHide(null); // add the event listener for the close button

        const sidePanelEl = this.document.getElementById(this.uiConfig.dom.sideBarId);
        if (sidePanelEl === null) return;
        const closeButtonEl = sidePanelEl.querySelector('.close');

        if (closeButtonEl) {
          closeButtonEl.addEventListener('click', this.eventHide);
        }
      };

      _proto.showHide = function showHide(newStyleValue) {
        const sidePanelEl = this.document.getElementById(this.uiConfig.dom.sideBarId);
        if (sidePanelEl === null) return;

        switch (this.uiPrefs.view.location) {
          case 'left':
          {
            sidePanelEl.style.width = newStyleValue;
            break;
          }

          case 'right':
          {
            sidePanelEl.style.width = newStyleValue;
            break;
          }

          case 'bottom':
          {
            sidePanelEl.style.height = newStyleValue;
            break;
          }

          case 'top':
          {
            sidePanelEl.style.height = newStyleValue;
            break;
          }
        }
      };

      _proto.eventHide = function eventHide(event) {
        if (event) event.preventDefault();
        this.showHide('0%');
      };

      _proto.eventShow = function eventShow(event) {
        this.showHide(this.uiPrefs.view.expandedSize);
      };

      return SidebarView;
    }(_AbstractView__WEBPACK_IMPORTED_MODULE_0__.default));

    /* harmony default export */ __webpack_exports__.default = (SidebarView);
    /** */ }),

  /** */ './src/network/ApiUtil.ts':
  /*! ********************************!*\
  !*** ./src/network/ApiUtil.ts ***!
  \******************************* */
  /*! exports provided: default */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ './node_modules/debug/src/browser.js');
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__ */__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
    function _extends() {
      _extends = Object.assign || function (target) {
        for (let i = 1; i < arguments.length; i++) {
          const source = arguments[i];

          for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      return _extends.apply(this, arguments);
    }


    const apiLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('api-ts');

    const ApiUtil = /* #__PURE__ */(function () {
      function ApiUtil() {}

      const _proto = ApiUtil.prototype;

      _proto.fetchJSON = function fetchJSON(url, parameters, callback, queueType, requestId) {
        fetch(url, parameters).then((response) => {
          apiLogger(`Response code was ${response.status}`);

          if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } // else {
          //     callback(null, response.status,queueId, requestId);
          //     throw new Error("no results");
          // }
        }).then((data) => {
          apiLogger(data);
          callback(data, 200, queueType, requestId);
        }).catch((error) => {
          apiLogger(error);
          callback(null, 500, queueType, requestId);
        });
      }
      /*
      Utility function for calling JSON POST requests
      Parameters:
      1.  URL to send the POST request too;
      2.  parameters object whose attribute (name/values) are the request parameters; and
      3.  A function to receive the results when the fetch has completed
          The callback function should have the following form
          callback (jsonDataReturned, httpStatusCode)
          a)  A successful fetch will return the JSON data in the first parameter and a status code of the server
          b)  Parameters that cannot be converted to JSON format will give a null data and code 404
          c)  A server error will give that code and no data
    */
      ;

      _proto.apiFetchJSONWithPost = function apiFetchJSONWithPost(request) {
        apiLogger(`Executing fetch with URL ${request.originalRequest.url} with body ${request.originalRequest.params}`);

        try {
          JSON.stringify(request.originalRequest.params);
        } catch (error) {
          apiLogger('Unable to convert parameters to JSON');
          apiLogger(request.originalRequest.params, 100);
          request.callback(null, 404, request.queueType, request.requestId);
        }

        const postParameters = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(_extends({}, request.originalRequest.params)),
        };
        this.fetchJSON(request.originalRequest.url, postParameters, request.callback, request.queueType, request.requestId);
      };

      _proto.apiFetchJSONWithGet = function apiFetchJSONWithGet(request) {
        apiLogger(`Executing GET fetch with URL ${request.originalRequest.url} with id ${request.originalRequest.params.id}`);
        const getParameters = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        if (request.originalRequest.params.id) request.originalRequest.url += `/${request.originalRequest.params.id}`;
        this.fetchJSON(request.originalRequest.url, getParameters, request.callback, request.queueType, request.requestId);
      };

      _proto.apiFetchJSONWithDelete = function apiFetchJSONWithDelete(request) {
        apiLogger(`Executing DELETE fetch with URL ${request.originalRequest.url} with id ${request.originalRequest.params.id}`);
        const delParameters = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        if (request.originalRequest.params.id) request.originalRequest.url += `/${request.originalRequest.params.id}`;
        this.fetchJSON(request.originalRequest.url, delParameters, request.callback, request.queueType, request.requestId);
      };

      _proto.apiFetchJSONWithPut = function apiFetchJSONWithPut(request) {
        apiLogger(`Executing PUT fetch with URL ${request.originalRequest.url} with id ${request.originalRequest.params.id}`);
        const putParameters = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(_extends({}, request.originalRequest.params)),
        };
        if (request.originalRequest.params.id) request.originalRequest.url += `/${request.originalRequest.params.id}`;
        this.fetchJSON(request.originalRequest.url, putParameters, request.callback, request.queueType, request.requestId);
      };

      return ApiUtil;
    }());

    const apiUtil = new ApiUtil();
    /* harmony default export */ __webpack_exports__.default = (apiUtil);
    /** */ }),

  /** */ './src/network/DownloadManager.ts':
  /*! ****************************************!*\
  !*** ./src/network/DownloadManager.ts ***!
  \*************************************** */
  /*! exports provided: default */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const _ApiUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApiUtil */ './src/network/ApiUtil.ts');
    /* harmony import */ const _util_UUID__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/UUID */ './src/util/UUID.ts');
    /* harmony import */ const _Types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Types */ './src/network/Types.ts');
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ './node_modules/debug/src/browser.js');
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_3___default = /* #__PURE__ */__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var { value } = info;
      } catch (error) {
        reject(error);
        return;
      }

      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }

    function _asyncToGenerator(fn) {
      return function () {
        const self = this;
        const args = arguments;
        return new Promise(((resolve, reject) => {
          const gen = fn.apply(self, args);

          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
          }

          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
          }

          _next(undefined);
        }));
      };
    }


    const dlLogger = debug__WEBPACK_IMPORTED_MODULE_3___default()('api-ts');

    const DownloadManager = /* #__PURE__ */(function () {
      function DownloadManager() {
        this.backgroundQueue = [];
        this.priorityQueue = [];
        this.inProgress = [];
        this.backgroundChangeListener = null;
        this.priorityChangeListener = null;
        this.callbackForQueueRequest = this.callbackForQueueRequest.bind(this);
      }

      const _proto = DownloadManager.prototype;

      _proto.setBackgroundChangeListener = function setBackgroundChangeListener(uiChangeListener) {
        this.backgroundChangeListener = uiChangeListener;
      };

      _proto.setPriorityChangeListener = function setPriorityChangeListener(uiChangeListener) {
        this.priorityChangeListener = uiChangeListener;
      };

      _proto.getPriorityQueueCount = function getPriorityQueueCount() {
        return this.priorityQueue.length;
      };

      _proto.getBackgroundQueueCount = function getBackgroundQueueCount() {
        return this.backgroundQueue.length;
      };

      _proto.addApiRequest = function addApiRequest(jsonRequest, isPriority) {
        if (isPriority === void 0) {
          isPriority = false;
        } // add a new requestId to the request for future tracking


        const requestId = _util_UUID__WEBPACK_IMPORTED_MODULE_1__.default.getUniqueId();
        dlLogger(`Download Manger: Adding Queue Request ${requestId}`);
        dlLogger(jsonRequest, 200);

        if (isPriority) {
          const _managerRequest = {
            originalRequest: jsonRequest,
            requestId,
            queueType: _Types__WEBPACK_IMPORTED_MODULE_2__.queueType.PRIORITY,
            callback: this.callbackForQueueRequest,
          };
          this.priorityQueue.push(_managerRequest);
          if (this.priorityChangeListener) this.priorityChangeListener.handleEventAddToQueue();
        } else {
          const _managerRequest2 = {
            originalRequest: jsonRequest,
            requestId,
            queueType: _Types__WEBPACK_IMPORTED_MODULE_2__.queueType.BACKGROUND,
            callback: this.callbackForQueueRequest,
          };
          this.backgroundQueue.push(_managerRequest2);
          if (this.backgroundChangeListener) this.backgroundChangeListener.handleEventAddToQueue();
        }

        this.processQueues();
      };

      _proto.processPriorityQueue = /* #__PURE__ */(function () {
        const _processPriorityQueue = _asyncToGenerator(/* #__PURE__ */regeneratorRuntime.mark(function _callee() {
          let queueItem;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  queueItem = this.priorityQueue.shift();
                  if (queueItem !== undefined) this.inProgress.push(queueItem);
                  if (queueItem !== undefined) this.initiateFetchForQueueItem(queueItem);

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function processPriorityQueue() {
          return _processPriorityQueue.apply(this, arguments);
        }

        return processPriorityQueue;
      }());

      _proto.processBackgroundQueue = /* #__PURE__ */(function () {
        const _processBackgroundQueue = _asyncToGenerator(/* #__PURE__ */regeneratorRuntime.mark(function _callee2() {
          let queueItem;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  queueItem = this.backgroundQueue.shift();
                  if (queueItem !== undefined) this.inProgress.push(queueItem);
                  if (queueItem !== undefined) this.initiateFetchForQueueItem(queueItem);

                case 3:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function processBackgroundQueue() {
          return _processBackgroundQueue.apply(this, arguments);
        }

        return processBackgroundQueue;
      }());

      _proto.processQueues = /* #__PURE__ */(function () {
        const _processQueues = _asyncToGenerator(/* #__PURE__ */regeneratorRuntime.mark(function _callee3() {
          let totalQueuedItems;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  totalQueuedItems = this.priorityQueue.length + this.backgroundQueue.length;

                case 1:
                  if (!(totalQueuedItems > 0)) {
                    _context3.next = 14;
                    break;
                  }

                  dlLogger(`Download Manager: processing queue, items remaining ${totalQueuedItems}`); // priority queue takes priority

                  if (!(this.priorityQueue.length > 0)) {
                    _context3.next = 8;
                    break;
                  }

                  _context3.next = 6;
                  return this.processPriorityQueue();

                case 6:
                  _context3.next = 11;
                  break;

                case 8:
                  if (!(this.backgroundQueue.length > 0)) {
                    _context3.next = 11;
                    break;
                  }

                  _context3.next = 11;
                  return this.processBackgroundQueue();

                case 11:
                  totalQueuedItems = this.priorityQueue.length + this.backgroundQueue.length;
                  _context3.next = 1;
                  break;

                case 14:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function processQueues() {
          return _processQueues.apply(this, arguments);
        }

        return processQueues;
      }());

      _proto.callbackForQueueRequest = function callbackForQueueRequest(jsonData, httpStatus, queueId, requestId) {
        // let the listeners know about the completion
        if (queueId === _Types__WEBPACK_IMPORTED_MODULE_2__.queueType.PRIORITY) {
          // priority
          if (this.priorityChangeListener) this.priorityChangeListener.handleEventRemoveFromQueue();
        } else if (this.backgroundChangeListener) this.backgroundChangeListener.handleEventRemoveFromQueue();

        dlLogger(`Download Manager: received callback for queue ${queueId} request ${requestId} with status ${httpStatus}`); // find the item in the in progress

        const foundIndex = this.inProgress.findIndex(element => element.requestId === requestId);

        if (foundIndex >= 0) {
          // remove from in progress
          const queueItem = this.inProgress[foundIndex];
          this.inProgress.splice(foundIndex, 1);
          dlLogger(queueItem);
          dlLogger(`Download Manager: finished for queue item ${queueItem.requestId}`); // let the callback function know

          queueItem.originalRequest.callback(jsonData, httpStatus);
        }
      };

      _proto.initiateFetchForQueueItem = function initiateFetchForQueueItem(item) {
        dlLogger(`Download Manager: initiating fetch for queue item ${item.requestId}`);
        dlLogger(item);

        if (item.originalRequest.url !== null && item.originalRequest.params != null && item.originalRequest.callback != null) {
          switch (item.originalRequest.type) {
            case _Types__WEBPACK_IMPORTED_MODULE_2__.RequestType.POST:
            {
              _ApiUtil__WEBPACK_IMPORTED_MODULE_0__.default.apiFetchJSONWithPost(item);
              break;
            }

            case _Types__WEBPACK_IMPORTED_MODULE_2__.RequestType.GET:
            {
              _ApiUtil__WEBPACK_IMPORTED_MODULE_0__.default.apiFetchJSONWithGet(item);
              break;
            }

            case _Types__WEBPACK_IMPORTED_MODULE_2__.RequestType.DELETE:
            {
              _ApiUtil__WEBPACK_IMPORTED_MODULE_0__.default.apiFetchJSONWithDelete(item);
              break;
            }

            case _Types__WEBPACK_IMPORTED_MODULE_2__.RequestType.PUT:
            {
              _ApiUtil__WEBPACK_IMPORTED_MODULE_0__.default.apiFetchJSONWithPut(item);
              break;
            }
          }
        }
      };

      return DownloadManager;
    }());

    const downloader = new DownloadManager();
    /* harmony default export */ __webpack_exports__.default = (downloader);
    /** */ }),

  /** */ './src/network/Types.ts':
  /*! ******************************!*\
  !*** ./src/network/Types.ts ***!
  \***************************** */
  /*! exports provided: RequestType, queueType */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'RequestType', () => RequestType);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'queueType', () => queueType);
    let RequestType;

    (function (RequestType) {
      RequestType[RequestType.POST = 0] = 'POST';
      RequestType[RequestType.GET = 1] = 'GET';
      RequestType[RequestType.PUT = 2] = 'PUT';
      RequestType[RequestType.DELETE = 3] = 'DELETE';
    }(RequestType || (RequestType = {})));


    let queueType;

    (function (queueType) {
      queueType[queueType.PRIORITY = 0] = 'PRIORITY';
      queueType[queueType.BACKGROUND = 1] = 'BACKGROUND';
    }(queueType || (queueType = {})));
    /** */ }),

  /** */ './src/notification/BootstrapNotification.ts':
  /*! ***************************************************!*\
  !*** ./src/notification/BootstrapNotification.ts ***!
  \************************************************** */
  /*! exports provided: default */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'default', () => BootstrapNotification);
    /* harmony import */ const _Notification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Notification */ './src/notification/Notification.ts');
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;

      _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }


    var BootstrapNotification = /* #__PURE__ */(function (_Notification) {
      _inheritsLoose(BootstrapNotification, _Notification);

      function BootstrapNotification(notificationManager) {
        return _Notification.call(this, notificationManager) || this;
      } // Make the notification visible on the screen


      const _proto = BootstrapNotification.prototype;

      _proto.show = function show(title, message, topOffset, context, duration) {
        const _this = this;

        if (topOffset === void 0) {
          topOffset = 0;
        }

        if (context === void 0) {
          context = 'info';
        }

        if (duration === void 0) {
          duration = 3000;
        }

        const containerId = this.notificationManager.getContainerId(); // convert the context to a background colour

        let bgColorClass = '';

        switch (context) {
          case 'info':
          {
            bgColorClass = 'bg-info';
            break;
          }

          case 'warning':
          {
            bgColorClass = 'bg-warning';
            break;
          }

          case 'message':
          {
            bgColorClass = 'bg-primary';
            break;
          }

          case 'priority':
          {
            bgColorClass = 'bg-danger';
            break;
          }

          default:
          {
            bgColorClass = 'bg-info';
          }
        } // Creating the notification container div


        const containerNode = document.createElement('div');
        containerNode.className = 'notification toast';
        containerNode.style.top = `${topOffset}px`;
        containerNode.setAttribute('role', 'alert');
        containerNode.setAttribute('data-autohide', 'false'); // Adding the notification title node

        const titleNode = document.createElement('div');
        titleNode.className = `toast-header text-white ${bgColorClass}`;
        const titleTextNode = document.createElement('strong');
        titleTextNode.className = 'mr-auto';
        titleTextNode.textContent = title; // Adding a little button on the notification

        const closeButtonNode = document.createElement('button');
        closeButtonNode.className = 'ml-2 mb-1 close';
        closeButtonNode.textContent = 'x';
        closeButtonNode.addEventListener('click', () => {
          _this.notificationManager.remove(containerNode);
        }); // Adding the notification message content node

        const messageNode = document.createElement('div');
        messageNode.className = 'toast-body';
        messageNode.textContent = message; // Appending the container with all the elements newly created

        titleNode.appendChild(titleTextNode);
        titleNode.appendChild(closeButtonNode);
        containerNode.appendChild(titleNode);
        containerNode.appendChild(messageNode);
        containerNode.classList.add(`is-${context}`); // Inserting the notification to the page body

        const containerEl = document.getElementById(containerId);
        if (containerEl) containerEl.appendChild(containerNode); // activate it
        // @ts-ignore

        $('.notification').toast('show'); // Default duration delay

        if (duration <= 0) {
          duration = 2000;
        }

        setTimeout(() => {
          _this.notificationManager.remove(containerNode);
        }, duration);
        return containerNode;
      };

      return BootstrapNotification;
    }(_Notification__WEBPACK_IMPORTED_MODULE_0__.default));
    /** */ }),

  /** */ './src/notification/Notification.ts':
  /*! ******************************************!*\
  !*** ./src/notification/Notification.ts ***!
  \***************************************** */
  /*! exports provided: default */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'default', () => Notification);
    var Notification = function Notification(notificationManager) {
      this.show = this.show.bind(this);
      this.notificationManager = notificationManager; // Create DOM notification structure when instantiated

      this.containerId = this.notificationManager.getContainerId();
    } // Make the notification visible on the screen
;
/** */ }),

  /** */ './src/notification/NotificationFactory.ts':
  /*! *************************************************!*\
  !*** ./src/notification/NotificationFactory.ts ***!
  \************************************************ */
  /*! exports provided: default */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const _BootstrapNotification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BootstrapNotification */ './src/notification/BootstrapNotification.ts');


    const NotificationFactory = /* #__PURE__ */(function () {
      function NotificationFactory() {}

      const _proto = NotificationFactory.prototype;

      _proto.createNotification = function createNotification(manager) {
        return new _BootstrapNotification__WEBPACK_IMPORTED_MODULE_0__.default(manager);
      };

      return NotificationFactory;
    }());

    const notificationFactory = new NotificationFactory();
    /* harmony default export */ __webpack_exports__.default = (notificationFactory);
    /** */ }),

  /** */ './src/notification/NotificationManager.ts':
  /*! *************************************************!*\
  !*** ./src/notification/NotificationManager.ts ***!
  \************************************************ */
  /*! exports provided: NotificationManager, default */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'NotificationManager', () => NotificationManager);
    /* harmony import */ const _NotificationFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotificationFactory */ './src/notification/NotificationFactory.ts');

    var NotificationManager = /* #__PURE__ */(function () {
      function NotificationManager() {
        this.notifications = [];
        this.currentCount = 0;
        this.offsetPerNotification = 120;
        this.containerId = 'notifications';
        this.show = this.show.bind(this);
      }

      const _proto = NotificationManager.prototype;

      _proto.getContainerId = function getContainerId() {
        return this.containerId;
      };

      _proto.show = function show(title, message, context, duration) {
        if (context === void 0) {
          context = 'info';
        }

        if (duration === void 0) {
          duration = 5000;
        }

        const notification = _NotificationFactory__WEBPACK_IMPORTED_MODULE_0__.default.createNotification(this);
        const notificationNode = notification.show(title, message, this.currentCount * this.offsetPerNotification, context, duration);
        this.currentCount++;
        this.notifications.push(notificationNode);
      };

      _proto.remove = function remove(notificationNode) {
        const _this = this;

        const foundIndex = this.notifications.findIndex(element => element === notificationNode);

        if (foundIndex >= 0) {
          this.notifications.splice(foundIndex, 1); // re-arrange the remaining notifications

          this.notifications.map((notificationNode, index) => {
            // @ts-ignore
            notificationNode.style.top = `${_this.offsetPerNotification * index}px`;
          });
        }

        const parentEl = notificationNode.parentElement;
        if (parentEl !== null) parentEl.removeChild(notificationNode);
        this.currentCount--;
        if (this.currentCount < 0) this.currentCount = 0;
      };

      return NotificationManager;
    }());
    const notifier = new NotificationManager();
    /* harmony default export */ __webpack_exports__.default = (notifier);
    /** */ }),

  /** */ './src/socket/SocketManager.ts':
  /*! *************************************!*\
  !*** ./src/socket/SocketManager.ts ***!
  \************************************ */
  /*! exports provided: default */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ './node_modules/debug/src/browser.js');
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__ */__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);

    const sDebug = debug__WEBPACK_IMPORTED_MODULE_0___default()('socket-ts');

    const SocketManager = /* #__PURE__ */(function () {
      function SocketManager() {
        this.callbackForMessage = this.callbackForMessage.bind(this);
        this.callbackForData = this.callbackForData.bind(this);
        this.listener = null;
        this.socket = null;
      }

      const _proto = SocketManager.prototype;

      _proto.callbackForMessage = function callbackForMessage(message) {
        sDebug(`Received message : ${message}`);
        if (this.listener) this.listener.handleMessage(message);
      }
      /*
  *
  *  expecting a JSON data object with the following attributes
  *  1.  type: "create"|"update"|"delete"
  *  2.  objectType: string name of the object type changed
  *  3.  data: the new representation of the object
  *  4.  user: application specific id for the user who made the change
  *        - the application view is required to implement getCurrentUser() to compare the user who made the change
  *
   */
      ;

      _proto.callbackForData = function callbackForData(message) {
        sDebug('Received data');

        try {
          const dataObj = JSON.parse(message);
          sDebug(dataObj);
          if (this.listener === null) return;

          if (dataObj.user === this.listener.getCurrentUser()) {
            sDebug('change made by this user, ignoring');
          } else {
            sDebug('change made by another user, passing off to the application');
            this.listener.handleDataChangedByAnotherUser(dataObj);
          }
        } catch (err) {
          sDebug('Not JSON data');
        }
      };

      _proto.setListener = function setListener(listener) {
        sDebug('Setting listener');
        this.listener = listener;
        sDebug('Creating socket connection'); // @ts-ignore

        this.socket = io();
        sDebug('Waiting for messages');
        this.socket.on('message', this.callbackForMessage);
        this.socket.on('data', this.callbackForData);
      };

      _proto.sendMessage = function sendMessage(message) {
        this.socket.emit('message', message);
      };

      return SocketManager;
    }());

    const socketManager = new SocketManager();
    /* harmony default export */ __webpack_exports__.default = (socketManager);
    /** */ }),

  /** */ './src/state/StateManagementUtil.ts':
  /*! ******************************************!*\
  !*** ./src/state/StateManagementUtil.ts ***!
  \***************************************** */
  /*! exports provided: default */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ './node_modules/debug/src/browser.js');
    /* harmony import */ const debug__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__ */__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);

    const smLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('state-manager-ts');
    /** To Do - make state unchangeable outside of this class (i.e. deep copies) */

    const StateManagementUtil = /* #__PURE__ */(function () {
      /*
    Singleton
   */
      StateManagementUtil.create = function create() {
        if (StateManagementUtil._instance === null) {
          StateManagementUtil._instance = new StateManagementUtil();
        }

        return StateManagementUtil._instance;
      };

      function StateManagementUtil() {
        this.applicationState = [];
        this.stateChangeListeners = [];
      }

      const _proto = StateManagementUtil.prototype;

      _proto.isStatePresent = function isStatePresent(name) {
        const result = this.applicationState.findIndex(element => element.name === name) >= 0;
        smLogger(`State Manager: Checking state of ${name} is present = ${result}`);
        return result;
      };

      _proto.informChangeListenersForStateWithName = function informChangeListenersForStateWithName(name, stateObjValue) {
        smLogger(`State Manager: Informing state listeners of ${name}`);
        const foundIndex = this.stateChangeListeners.findIndex(element => element.name === name);

        if (foundIndex >= 0) {
          smLogger(`State Manager: Found state listeners of ${name}`);
          /* let each state change listener know */

          const changeListenersForName = this.stateChangeListeners[foundIndex];

          for (let index = 0; index < changeListenersForName.listeners.length; index++) {
            smLogger(`State Manager: Found state listener of ${name} - informing`);
            const listener = changeListenersForName.listeners[index];
            listener.stateChanged(name, stateObjValue);
          }
        }
      }
      /*
      Add a state listener for a given state name
      the listener should be a function with two parameters
      name - string - the name of the state variable that they want to be informed about
      stateObjValue - object - the new state value
     */
      ;

      _proto.addChangeListenerForName = function addChangeListenerForName(name, listener) {
        smLogger(`State Manager: Adding state listener for ${name}`);
        const foundIndex = this.stateChangeListeners.findIndex(element => element.name === name);

        if (foundIndex >= 0) {
          const changeListenersForName = this.stateChangeListeners[foundIndex];
          changeListenersForName.listeners.push(listener);
        } else {
          smLogger(`State Manager: Adding state listener for ${name} - first occurrence`);
          const listenersNameArrayPair = {
            name,
            listeners: [listener],
          };
          this.stateChangeListeners.push(listenersNameArrayPair);
        }
      };

      _proto.getStateByName = function getStateByName(name) {
        smLogger(`State Manager: Getting state for ${name}`);
        let stateValueObj = {};
        const foundIndex = this.applicationState.findIndex(element => element.name === name);

        if (foundIndex >= 0) {
          // get the current state
          const stateNameValuePair = this.applicationState[foundIndex];
          stateValueObj = stateNameValuePair.value;
          smLogger(`State Manager: Found previous state for ${name}`);
          smLogger(stateValueObj);
        } else {
          // create the state if not already present
          stateValueObj = this.addStateByName(name, []);
        }

        return stateValueObj;
      };

      _proto.setStateByName = function setStateByName(name, stateObjectForName) {
        smLogger(`State Manager: Setting state for ${name}`);
        smLogger(stateObjectForName);
        const foundIndex = this.applicationState.findIndex(element => element.name === name);

        if (foundIndex >= 0) {
          // set the current state
          const stateNameValuePair = this.applicationState[foundIndex];
          stateNameValuePair.value = stateObjectForName;
        } else {
          // create the state if not already present
          this.addStateByName(name, stateObjectForName);
        }

        this.informChangeListenersForStateWithName(name, stateObjectForName);
        return stateObjectForName;
      };

      _proto.addStateByName = function addStateByName(name, stateObjForName) {
        /* create a new state attribute for the application state */
        if (!this.isStatePresent(name)) {
          smLogger(`State Manager: Adding state for ${name} - first occurrence`);
          smLogger(stateObjForName, 201);
          const stateNameValuePair = {
            name,
            value: stateObjForName,
          };
          this.applicationState.push(stateNameValuePair);
        } else {
          /* get the current state value and replace it */
          this.setStateByName(name, stateObjForName);
        }

        return stateObjForName;
      };

      _proto.addNewItemToState = function addNewItemToState(name, item) {
        // assumes state is an array
        smLogger(`State Manager: Adding item to state ${name}`);
        const state = this.getStateByName(name);
        state.push(item);
        smLogger(state);
        this.informChangeListenersForStateWithName(name, state);
      };

      _proto.findItemInState = function findItemInState(name, item, testForEqualityFunction) {
        // assumes state is an array
        let result = {};
        const state = this.getStateByName(name);
        const foundIndex = state.findIndex(element => testForEqualityFunction(element, item));
        smLogger(`Finding item in state ${name} - found index ${foundIndex}`);
        smLogger(item);

        if (foundIndex >= 0) {
          result = state[foundIndex];
        }

        return result;
      };

      _proto.isItemInState = function isItemInState(name, item, testForEqualityFunction) {
        // assumes state is an array
        let result = false;
        const state = this.getStateByName(name);
        const foundIndex = state.findIndex(element => testForEqualityFunction(element, item));

        if (foundIndex >= 0) {
          result = true;
        }

        return result;
      };

      _proto.removeItemFromState = function removeItemFromState(name, item, testForEqualityFunction) {
        let result = false;
        const state = this.getStateByName(name);
        const foundIndex = state.findIndex(element => testForEqualityFunction(element, item));

        if (foundIndex >= 0) {
          result = true; // remove the item from the state

          smLogger('State Manager: Found item - removing ');
          state.splice(foundIndex, 1);
          smLogger(state);
          this.setStateByName(name, state);
        }

        return result;
      };

      _proto.updateItemInState = function updateItemInState(name, item, testForEqualityFunction) {
        let result = false;
        const state = this.getStateByName(name);
        const foundIndex = state.findIndex(element => testForEqualityFunction(element, item));

        if (foundIndex >= 0) {
          result = true; // remove the item from the state

          smLogger('State Manager: Found item - replacing ');
          state.splice(foundIndex, 1, item); // state.push(item);

          smLogger(state);
          this.setStateByName(name, state);
        } else {
          // add the item to the state
          this.addNewItemToState(name, item);
        }

        return result;
      };

      return StateManagementUtil;
    }());

    StateManagementUtil._instance = null;
    const stateManager = StateManagementUtil.create();
    /* harmony default export */ __webpack_exports__.default = (stateManager);
    /** */ }),

  /** */ './src/util/BrowserUtil.ts':
  /*! *********************************!*\
  !*** ./src/util/BrowserUtil.ts ***!
  \******************************** */
  /*! exports provided: default */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    const BrowserUtil = /* #__PURE__ */(function () {
      function BrowserUtil() {}

      const _proto = BrowserUtil.prototype;

      _proto.scrollSmoothToId = function scrollSmoothToId(elementId) {
        const element = document.getElementById(elementId);

        if (element !== null) {
          element.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
          });
        }
      };

      _proto.scrollSmoothTo = function scrollSmoothTo(element) {
        element.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      };

      _proto.removeAllChildren = function removeAllChildren(element) {
        if (element && element.firstChild) {
          while (element.firstChild) {
            const { lastChild } = element;
            if (lastChild) element.removeChild(lastChild);
          }
        }
      };

      _proto.addRemoveClasses = function addRemoveClasses(element, classesText, isAdding) {
        if (isAdding === void 0) {
          isAdding = true;
        }

        const classes = classesText.split(' ');
        classes.forEach((classValue) => {
          if (classValue.trim().length > 0) {
            if (isAdding) {
              element.classList.add(classValue);
            } else {
              element.classList.remove(classValue);
            }
          }
        });
      };

      return BrowserUtil;
    }());

    const browserUtil = new BrowserUtil();
    /* harmony default export */ __webpack_exports__.default = (browserUtil);
    /** */ }),

  /** */ './src/util/EqualityFunctions.ts':
  /*! ***************************************!*\
  !*** ./src/util/EqualityFunctions.ts ***!
  \************************************** */
  /*! exports provided: isSame */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'isSame', () => isSame);
    function isSame(item1, item2) {
      return item1.id === item2.id;
    }
    /** */ }),

  /** */ './src/util/UUID.ts':
  /*! **************************!*\
  !*** ./src/util/UUID.ts ***!
  \************************* */
  /*! exports provided: default */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    const UUID = /* #__PURE__ */(function () {
      function UUID() {}

      const _proto = UUID.prototype;

      _proto.getUniqueId = function getUniqueId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = Math.random() * 16 | 0;
          const v = c == 'x' ? r : r & 0x3 | 0x8;
          return v.toString(16);
        });
      };

      return UUID;
    }());

    const uuid = new UUID();
    /* harmony default export */ __webpack_exports__.default = (uuid);
    /** */ }),

  /** */ 0:
  /*! ***************************!*\
  !*** multi ./src/App.tsx ***!
  \************************** */
  /*! no static exports found */
  /** */ (function (module, exports, __webpack_require__) {
    module.exports = __webpack_require__(/*! ./src/App.tsx */'./src/App.tsx');
    /** */ }),

/** *** */ }));
// # sourceMappingURL=app.bundle.js.map
