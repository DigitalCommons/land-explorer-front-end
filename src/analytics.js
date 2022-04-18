import ReactGA from 'react-ga';
import constants from "./constants";

const analytics = {
	_event: {
		MAIN_MENU: 'Main Menu',
		SEARCH: 'Search',
		SIDE_NAV: 'Side Nav',
		USER_MENU: 'User Menu',
	},

	_dimension: {
		ORG_TYPE: {
			key: 'dimension1',
			value: '',
		},
		ORG_ACTIVITY: {
			key: 'dimension2',
			value: ''
		}
	},

	init: function () {
		console.log('analytics.init()');
		ReactGA.initialize(constants.GA_ID);
	},

	setDimension: function (d, v) {
		d.value = v;
	},

	pageview: function (path) {
		let stat_packet = path;
		let message = "analytics.pageview() " + stat_packet;
		if (this._send()) {
			console.log(message);
			this._customDimensions();
			ReactGA.pageview(stat_packet);
		} else {
			console.log('DISABLED IN DEV - ' + message);
		}
	},

	event: function (category, action) {
		let message = "analytics.event() " + category + " " + action;
		if (this._send()) {
			console.log(message);
			this._customDimensions();
			ReactGA.event({
				category: category,
				action: action
			});
		} else {
			console.log('DISABLED IN DEV - ' + message);
		}
	},

	_customDimensions: function () {
		if (this._dimension.ORG_TYPE.value !== '') {
			ReactGA.ga('set', this._dimension.ORG_TYPE.key, this._dimension.ORG_TYPE.value);
			console.log("analytics._customDimensions() ORG_TYPE : " + this._dimension.ORG_TYPE.value);
		}
		if (this._dimension.ORG_ACTIVITY.value !== '') {
			ReactGA.ga('set', this._dimension.ORG_ACTIVITY.key, this._dimension.ORG_ACTIVITY.value);
			console.log("analytics._customDimensions() ORG_ACTIVITY : " + this._dimension.ORG_ACTIVITY.value);
		}
	},

	_send: function () {
		return false || window.location.host.indexOf('app.landexplorer.cc') >= 0
	}
}

export default analytics;
