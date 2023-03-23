import { default as iot } from 'alibabacloud-iot-device-sdk';
import { readable } from 'svelte/store';

export default class TopicDataStream {
	store;
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

		const self = this;
		device.on('connect', () => {
			console.log('reader device connects to cloud!');
			const store = new readable(NaN, (set) => {
				self.setLatestValue = set;
			});
			resolveStore(store);
		});
		device.on('message', (topic, payload) => {
			if (!topic.startsWith('/sys')) {
				const payloadJSON = payload.toString();
				console.log(topic, payloadJSON);
				self.setLatestValue(JSON.parse(payloadJSON).AnimalBodyTemperature.value);
			}
		});
	}

	async getStream() {
		return await this.store;
	}
}
