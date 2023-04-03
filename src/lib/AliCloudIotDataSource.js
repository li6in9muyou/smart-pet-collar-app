import { default as iot } from 'alibabacloud-iot-device-sdk';
import { derived, readable } from 'svelte/store';
import { toast } from 'svelte-french-toast';
import { sleep } from './Utility.js';

export default class TopicDataStream {
	store;
	end_connection;
	constructor() {
		const productKey = import.meta.env.VITE_ALIYUN_DEVICE_PRODUCT_KEY;
		const deviceName = import.meta.env.VITE_ALIYUN_DEVICE_NAME;
		const deviceSecret = import.meta.env.VITE_ALIYUN_DEVICE_SECRET;
		const device = iot.device({
			productKey,
			deviceName,
			deviceSecret,
			protocol: 'wss://'
		});
		device.subscribe(`/${productKey}/${deviceName}/user/doggy/property`);
		let resolveStore;
		this.store = new Promise((resolve) => (resolveStore = resolve));
		toast.promise(Promise.all([this.store, sleep(600)]), {
			loading: '正在连接云平台',
			success: '连接成功',
			error: '出错了'
		});

		const self = this;
		device.on('connect', () => {
			console.log('reader device connects to cloud!');
			const store = new readable(NaN, (set) => {
				self.setLatestValue = set;
			});
			resolveStore(store);
			this.end_connection = device.end.bind(device);
		});
		device.on('message', (topic, _payload) => {
			if (!topic.startsWith('/sys')) {
				const payloadJSON = _payload.toString();
				const payload = JSON.parse(payloadJSON);
				const properties = {
					bt: payload.AnimalBodyTemperature.value,
					hr: payload.AnimalHeartRate.value,
					os: payload.AnimalOxygenSaturation.value
				};
				self.setLatestValue(properties);
			}
		});
		device.on('error', (err) => {
			console.error('iot device emits error event: ', err);
			resolveStore(null);
		});
	}

	async getStream() {
		const s = await this.store;
		const bt = derived(s, (p) => p.bt);
		const hr = derived(s, (p) => p.hr);
		const os = derived(s, (p) => p.os);
		return [[bt, hr, os], s !== null];
	}

	end() {
		if (this.end_connection) {
			this.end_connection();
		}
	}
}
