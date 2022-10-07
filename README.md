# OTP-verifier-chrome-extension
It will work for vfs global visa processing appointment booking. When you click on send OTP, this extension will read the OTP from your email and put the OTP on the input box. It has a node server to handle the request from browser extension.

Package:
1. Imapflow is used here to read OTP.

To run server:
1. go to server-side folder on command prompt
2. run "npm install"
3. run "npm start"
Server will be running on PORT 5000

To setup extension:
1. Go to chrome extension developer mode.
2. Click on Load unpack - Choose "extension" folder
3. https://www.vfsglobal.com/ on this website when you hit Send OTP you will receive the OTP auto filled
4. User outlook or hotmail for better performance. If you use gmail, use app password instead of actual password
