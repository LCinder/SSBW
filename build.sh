
cd spa/react-app/
npm run build
cd ../..
cp -r spa/react-app/build/* deploy_build/
docker-compose up --build
