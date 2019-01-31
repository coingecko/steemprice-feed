init:
	@echo "Have you install nodejs (v8+)? (y/n)"
	@read nodeInstall
	@if [[ $nodeInstall == "y" ]] ; then echo "Ok, have you setup .env.sample to .env?"; else echo "Please add nodejs first." && exit 1; fi
	@read envSetup
	@if [[ $nodeInstall == "y" ]] ; then echo "Alright install current dir"; else echo "Please setup .env first."; && exit 1; fi
	@npm i
	@echo "Installing pm2"
	@npm i -g pm2
	@echo "Alright good to go, run 'make start' to start pm2."

start:
	@npm run build
	@pm2 start node dist/index.js --name="spf" -- --color

stop:
	@pm2 stop "spf"

delete:
	@pm2 delete "spf"

log:
	@pm2 log --name "spf"

log-1000:
	@pm2 log --name "spf" --lines 1000 | less

test:
	@npm run test

test-watch:
	@npm run test -- --watchAll
