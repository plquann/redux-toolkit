# Build reactjs app with production mode
npm run build

#Move to build folder
cd build

#Clone index.html into 200.html
cp index.html 200.html

#start deploying via Surge
#The command means deploy current folder to doamin quankhs-photoapp
surge . quankhs-photoapp.surge.sh
