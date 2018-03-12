.PHONY: dev
dev:
	docker run -it --rm -v $$PWD:/app -p 5000:5000 ruphin/webdev npm run dev

.PHONY: shell
shell:
	docker run -it --rm -v $$PWD:/app ruphin/webdev bash

.PHONY: test
test:
	docker run -it --rm -v $$PWD:/app ruphin/webdev npm run test

.PHONY: build
build:
	docker run -it --rm -v $$PWD:/app ruphin/webdev npm run build

.PHONY: build-cordova
build-cordova: build
	cp cordova-index.html dist/index.html
	docker run -it --rm --privileged \
		-v /dev/bus/usb:/dev/bus/usb \
		-v $$PWD/DaiWalletCordova:/src \
		-v $$PWD/dist:/src/www \
		tinco/cordova cordova build
	cp $$PWD/DaiWalletCordova/platforms/android/app/build/outputs/apk/debug/app-debug.apk apk/

.PHONY: run-cordova
run-cordova: build
		cp cordova-index.html dist/index.html
		docker run -it --rm --privileged \
			-v /dev/bus/usb:/dev/bus/usb \
			-v $$PWD/DaiWalletCordova:/src \
			-v $$PWD/dist:/src/www \
			tinco/cordova cordova run

.PHONY: publish
publish:
	docker run -v $$PWD:/app \
						 -v $$HOME/.gitconfig:/home/app/.gitconfig \
						 -v $$HOME/.npmrc:/home/app/.npmrc \
						 -v $$HOME/.ssh:/home/app/.ssh \
						 -it --rm ruphin/webdev npm run release
